(function () {
  var THEMES = [['dark', 'Dark'], ['light', 'Light'], ['sepia', 'Sepia'],
                ['contrast', 'High contrast'], ['black', 'Black']];
  var GISCUS = { dark: 'transparent_dark', black: 'transparent_dark', light: 'light',
                 sepia: 'light', contrast: 'dark_high_contrast' };
  var current = 'dark';

  function valid(t) { return THEMES.some(function (x) { return x[0] === t; }); }
  function read() {
    try { var t = localStorage.getItem('theme'); if (valid(t)) return t; } catch (e) {}
    return 'dark';
  }
  function name(t) { return THEMES.filter(function (x) { return x[0] === t; })[0][1]; }

  function apply(t) {
    current = t;
    document.documentElement.setAttribute('data-theme', t);
    var b = document.getElementById('theme-toggle');
    if (b) {
      b.textContent = 'Theme: ' + name(t);
      b.title = 'Change theme (now: ' + name(t) + ')';
    }
  }

  // apply immediately (this script runs in <head>), so there is no flash of the wrong colors
  apply(read());

  // lets the comment box start in the right theme
  window.korynTheme = { giscus: function () { return GISCUS[current]; } };

  document.addEventListener('DOMContentLoaded', function () {
    var b = document.getElementById('theme-toggle');
    if (!b) return;
    b.hidden = false;
    apply(current);
    b.addEventListener('click', function () {
      var i = THEMES.map(function (x) { return x[0]; }).indexOf(current);
      var next = THEMES[(i + 1) % THEMES.length][0];
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      var f = document.querySelector('iframe.giscus-frame');
      if (f && f.contentWindow) {
        f.contentWindow.postMessage({ giscus: { setConfig: { theme: GISCUS[next] } } }, 'https://giscus.app');
      }
    });
  });

  // keep other open tabs in sync
  window.addEventListener('storage', function (e) { if (e.key === 'theme') apply(read()); });
})();
