(function () {
  var input = document.getElementById('search');
  if (!input) return;
  var items = [].slice.call(document.querySelectorAll('.post-item'));
  var cats = [].slice.call(document.querySelectorAll('.category'));
  var empty = document.getElementById('no-results');

  function run() {
    var terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    var shown = 0;
    items.forEach(function (el) {
      var ok = terms.every(function (t) { return el.dataset.search.indexOf(t) > -1; });
      el.hidden = !ok;
      if (ok) shown++;
    });
    cats.forEach(function (c) { c.hidden = !c.querySelector('.post-item:not([hidden])'); });
    empty.hidden = shown > 0 || items.length === 0;
  }
  input.addEventListener('input', run);
})();
