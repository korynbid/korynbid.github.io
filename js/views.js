(function () {
  var el = document.getElementById('views');
  if (!el) return;

  function load() {
    fetch('https://korynbid.goatcounter.com/counter/' + encodeURIComponent(location.pathname) + '.json')
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        var n = String(d.count);
        el.textContent = n + (n === '1' ? ' view' : ' views');
        el.hidden = false;
      })
      .catch(function () { /* counter disabled or blocked: show nothing */ });
  }

  // give GoatCounter a moment to record this visit first
  window.addEventListener('load', function () { setTimeout(load, 1000); });
})();
