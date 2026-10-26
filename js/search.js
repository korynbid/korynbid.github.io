(function () {
  var input = document.getElementById('search');
  if (!input) return;
  var items = [].slice.call(document.querySelectorAll('.post-item'));
  var cats = [].slice.call(document.querySelectorAll('.category'));
  var mores = [].slice.call(document.querySelectorAll('.more'));
  var empty = document.getElementById('no-results');

  function run() {
    var terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    var searching = terms.length > 0;
    var shown = 0;
    items.forEach(function (el) {
      var ok = terms.every(function (t) { return el.dataset.search.indexOf(t) > -1; });
      // not searching: show only the first few per category; searching: match everything
      el.hidden = searching ? !ok : el.classList.contains('extra');
      if (!el.hidden) shown++;
    });
    cats.forEach(function (c) { c.hidden = !c.querySelector('.post-item:not([hidden])'); });
    mores.forEach(function (m) { m.hidden = searching; });
    empty.hidden = shown > 0 || items.length === 0;
  }
  input.addEventListener('input', run);
})();
