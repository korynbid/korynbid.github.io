(function () {
  // ---- Calendar data: update every academic year (bachelor calendar 2026-2027) ----
  var YEAR = '2026-2027';
  function U(y, m, d) { return Date.UTC(y, m - 1, d); }
  var TERMS = [   // lecture terms: Monday of week 1, number of weeks, midterm weeks
    { first: U(2026, 8, 31), weeks: 15, midterm: [7, 8] },   // fall: lectures 1 Sep - 12 Dec 2026
    { first: U(2027, 1, 18), weeks: 15, midterm: [7, 8] }    // spring: lectures 18 Jan - 1 May 2027
  ];
  var OTHER = [   // periods without a week counter: [from, to, name]
    [U(2026, 12, 14), U(2026, 12, 30), 'EXAM_SESSION'],
    [U(2026, 12, 31), U(2027, 1, 17), 'WINTER_BREAK'],
    [U(2027, 5, 11), U(2027, 5, 28), 'EXAM_SESSION'],
    [U(2027, 5, 31), U(2027, 8, 30), 'SUMMER_BREAK']
  ];
  // ---------------------------------------------------------------------------------

  var DAY = 864e5;
  // ASCII logo shown above the calendar snippet
    var ART = [
    " _                          _     _     _",
    "| | _____  _ __ _   _ _ __ | |__ (_) __| |",
    "| |/ / _ \\| '__| | | | '_ \\| '_ \\| |/ _` |",
    "|   < (_) | |  | |_| | | | | |_) | | (_| |",
    "|_|\\_\\___/|_|   \\__, |_| |_|_.__/|_|\\__,_|",
    "                |___/"
  ];
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function fmt(t) { var d = new Date(t); return pad2(d.getUTCDate()) + '.' + pad2(d.getUTCMonth() + 1) + '.' + d.getUTCFullYear(); }
  function ordinal(n) {
    var s = ['th', 'st', 'nd', 'rd'], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  function info(now) {
    var today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    var i, r = { today: today, name: 'BREAK', week: 0 };
    for (i = 0; i < TERMS.length; i++) {
      var w = Math.floor(Math.round((today - TERMS[i].first) / DAY) / 7) + 1;
      if (today >= TERMS[i].first && w <= TERMS[i].weeks) {
        r.name = 'LECTURES'; r.week = w; r.weeks = TERMS[i].weeks; r.midterm = TERMS[i].midterm;
        break;
      }
    }
    if (!r.week) {
      for (i = 0; i < OTHER.length; i++) {
        if (today >= OTHER[i][0] && today <= OTHER[i][1]) { r.name = OTHER[i][2]; break; }
      }
    }
    var starts = [];
    TERMS.forEach(function (t) { starts.push([t.first, 'LECTURES']); });
    OTHER.forEach(function (o) { starts.push([o[0], o[2]]); });
    starts.sort(function (a, b) { return a[0] - b[0]; });
    for (i = 0; i < starts.length; i++) {
      if (starts[i][0] > today) { r.next = starts[i]; break; }
    }
    return r;
  }

  function html(r) {
    function sp(c, s) { return '<span class="' + c + '">' + s + '</span>'; }
    function line(parts, comment) {
      var plain = parts.map(function (p) { return p[1]; }).join('');
      var out = parts.map(function (p) { return p[0] ? sp(p[0], p[1]) : p[1]; }).join('');
      if (comment) out += new Array(Math.max(2, 30 - plain.length)).join(' ') + sp('cm', '// ' + comment);
      return out;
    }
    function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    var logo = '<span class="art" aria-hidden="true">' + esc(ART.join('\n')) + '</span>';
    var L = [];
    L.push(sp('cm', '// academic calendar ' + YEAR + ' (bachelor)'));
    L.push(line([['kw', 'const char'], ['', '* today = '], ['str', '"' + fmt(r.today) + '"'], ['', ';']]));
    L.push(line([['kw', 'int'], ['', ' week = '], ['num', String(r.week)], ['', ';']],
      r.week ? ordinal(r.week) + ' week of ' + r.weeks : 'no lecture week'));
    L.push(line([['ty', 'Period'], ['', ' phase = '], ['ty', r.name], ['', ';']]));
    if (r.week) {
      var a = r.midterm[0], b = r.midterm[1], state;
      if (r.week < a) state = a - r.week === 1 ? 'next week' : 'in ' + (a - r.week) + ' weeks';
      else if (r.week <= b) state = 'now';
      else state = 'done';
      L.push(sp('cm', '// weeks ' + a + '-' + b + ': midterm (' + state + ')'));
    }
    if (r.next) L.push(sp('cm', '// next: ' + r.next[1] + ' on ' + fmt(r.next[0])));
    return logo + '\n' + L.join('\n');
  }

  window.korynWeek = { info: info, html: html };

  var box = document.getElementById('week-widget');
  if (!box) return;
  box.querySelector('code').innerHTML = html(info(new Date()));
  box.hidden = false;
})();
