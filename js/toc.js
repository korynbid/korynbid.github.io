/* Table of contents: a 3-line (hamburger) button in the header that shows/hides a drawer
   listing every article, grouped by series tag. Add one line to every page, after search.js:
     <script src="js/toc.js"></script>      (use ../js/toc.js in posts/ and categories/)
   It loads menu-data.js by itself if the page has not loaded it already. */
(function () {
  var themeSrc = (document.querySelector('script[src$="theme.js"]') || {}).getAttribute &&
                 document.querySelector('script[src$="theme.js"]').getAttribute('src');
  var dataSrc = themeSrc ? themeSrc.replace(/theme\.js$/, 'menu-data.js') : 'js/menu-data.js';

  var path = decodeURIComponent(location.pathname);
  var base = /\/posts\//.test(path) ? '' : /\/categories\//.test(path) ? '../posts/' : 'posts/';
  var root = /\/(posts|categories)\//.test(path) ? '../' : '';
  var file = path.replace(/\/+$/, '').split('/').pop().replace(/\.html$/, '');
  var LINKS = [['Home', 'index.html', 'index'], ['Submit', 'submit.html', 'submit'],
               ['About', 'about.html', 'about'], ['License', 'license-page.html', 'license-page']];
  var here = path.replace(/\/+$/, '').split('/').pop().replace(/\.html$/, '');

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function init() {
    var data = window.korynMenu;
    var nav = document.querySelector('.site-nav');
    if (!data || !data.length || !nav) return;

    var groups = data.map(function (g) {
      var open = false;
      var lis = g.items.map(function (it) {
        var cur = it[1].replace(/\.html$/, '') === here;
        if (cur) open = true;
        return '<li><a href="' + esc(base + it[1]) + '"' + (cur ? ' aria-current="page"' : '') + '>' + esc(it[0]) + '</a></li>';
      }).join('');
      return '<details class="toc-group"' + (open ? ' open' : '') + '><summary>' + esc(g.tag) +
             ' (' + g.items.length + ')</summary><ul class="menu-list">' + lis + '</ul></details>';
    }).join('');

    var site = LINKS.map(function (l) {
      var cur = (l[2] === 'index' ? (file === 'index' || file === '' || file === 'korynbid.github.io') : file === l[2]) && !/\/(posts|categories)\//.test(path);
      return '<li><a href="' + root + l[1] + '"' + (cur ? ' aria-current="page"' : '') + '>' + l[0] + '</a></li>';
    }).join('');

    var btn = document.createElement('button');
    btn.id = 'toc-toggle'; btn.className = 'toc-toggle'; btn.type = 'button';
    btn.title = 'Table of contents'; btn.setAttribute('aria-label', 'Table of contents');
    btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'toc-panel');
    btn.innerHTML = '<svg viewBox="0 0 18 14" aria-hidden="true" fill="currentColor">' +
      '<rect y="0" width="18" height="2" rx="1"/><rect y="6" width="18" height="2" rx="1"/>' +
      '<rect y="12" width="18" height="2" rx="1"/></svg>';
    nav.insertBefore(btn, nav.firstChild);

    var panel = document.createElement('aside');
    panel.id = 'toc-panel'; panel.className = 'toc-panel';
    panel.setAttribute('aria-label', 'Table of contents');
    panel.innerHTML = '<div class="toc-head"><h2>Menu</h2>' +
      '<button type="button" class="toc-close" aria-label="Close">&times;</button></div>' +
      '<div class="toc-scroll">' +
      '<nav class="toc-nav" aria-label="Site"><ul class="menu-list">' + site + '</ul></nav>' +
      '<h3 class="toc-heading">Table of contents</h3>' +
      '<nav class="toc-body" aria-label="Table of contents">' + groups + '</nav></div>';
    var back = document.createElement('div');
    back.className = 'toc-backdrop'; back.hidden = true;
    document.body.appendChild(back);
    document.body.appendChild(panel);

    function set(open) {
      panel.classList.toggle('open', open);
      back.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        var cur = panel.querySelector('[aria-current]');
        if (cur) cur.scrollIntoView({ block: 'center' });
        panel.querySelector('.toc-close').focus();
      } else if (document.activeElement && panel.contains(document.activeElement)) {
        btn.focus();
      }
    }
    btn.addEventListener('click', function () { set(!panel.classList.contains('open')); });
    panel.querySelector('.toc-close').addEventListener('click', function () { set(false); });
    back.addEventListener('click', function () { set(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) set(false);
    });
  }

  function start() {
    if (window.korynMenu) return init();
    var s = document.createElement('script');
    s.src = dataSrc; s.onload = init;
    document.head.appendChild(s);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
