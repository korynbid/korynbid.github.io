(function () {
  var data = window.korynMenu;
  if (!data || !data.length) return;

  // which series contains this article? (works for /posts/name.html and /posts/name)
  var here = decodeURIComponent(location.pathname).replace(/\/+$/, '').split('/').pop().replace(/\.html$/, '');
  var group = null, idx = -1;
  for (var g = 0; g < data.length && !group; g++) {
    for (var i = 0; i < data[g].items.length; i++) {
      if (data[g].items[i][1].replace(/\.html$/, '') === here) { group = data[g]; idx = i; break; }
    }
  }
  if (!group) return;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  var list = '<ul class="menu-list">' + group.items.map(function (it, n) {
    return '<li><a href="' + esc(it[1]) + '"' + (n === idx ? ' aria-current="page"' : '') + '>' + esc(it[0]) + '</a></li>';
  }).join('') + '</ul>';

  // PC (wide screens): an island to the left of the main container
  var rail = '<aside class="menu-rail" aria-label="Articles in this series"><nav class="menu-island">' +
             '<p class="menu-title">' + esc(group.tag) + '</p>' + list + '</nav></aside>';
  // phones and narrow screens: a collapsible menu above the article
  var mobile = '<details class="menu-mobile"><summary>' + esc(group.tag) + ' &middot; ' + (idx + 1) + ' of ' +
               group.items.length + '</summary>' + list + '</details>';

  var main = document.querySelector('.page-content');
  var wrap = document.querySelector('.page-content .wrapper');
  if (!main || !wrap) return;
  main.insertAdjacentHTML('afterbegin', rail);
  wrap.insertAdjacentHTML('afterbegin', mobile);

  // keep the current article in view inside long menus
  function center(box) {
    var cur = box && box.querySelector('[aria-current]');
    if (cur) box.scrollTop = cur.offsetTop - box.clientHeight / 2 + cur.offsetHeight / 2;
  }
  center(document.querySelector('.menu-island .menu-list'));
  var d = document.querySelector('.menu-mobile');
  if (d) d.addEventListener('toggle', function () { if (d.open) center(d.querySelector('.menu-list')); });
})();
