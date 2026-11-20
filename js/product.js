/* =====================================================================
   product.js — product pages only (load after main.js)
   1. Product types: click a chip → show its panel
   2. Applications: click a tab → show its panel
   3. FAQ: only one answer open at a time
   4. Width bars animate when they come into view
   5. In-page tabs: highlight the section on screen + sit under the sticky header
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- 1 + 2. Switchers (chips and tabs work the same way) ----------
     Buttons:  data-target="id-of-panel"
     Panels:   the matching id, all inside one wrapper            */
  function setupSwitcher(buttonSelector) {
    var buttons = document.querySelectorAll(buttonSelector);
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
          var panel = document.getElementById(b.getAttribute('data-target'));
          if (panel) panel.hidden = !on;
        });
      });
    });
  }
  setupSwitcher('.chip');
  setupSwitcher('.atab');

  /* ---------- 3. FAQ: close the others when one opens ---------- */
  var faqs = document.querySelectorAll('.faq-item');
  faqs.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqs.forEach(function (other) { if (other !== item) other.open = false; });
    });
  });

  /* ---------- 4. Width bars ---------- */
  var widths = document.querySelector('.widths');
  if (widths && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries, obs) {
      if (entries[0].isIntersecting) { widths.classList.add('is-visible'); obs.disconnect(); }
    }, { threshold: 0.3 }).observe(widths);
  } else if (widths) {
    widths.classList.add('is-visible');
  }

  /* ---------- 5. In-page tabs ---------- */
  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    document.body.classList.toggle('header-stuck', !!header && header.classList.contains('is-sticky'));
  }, { passive: true });

  var tabLinks = document.querySelectorAll('.p-tabs a');
  if (tabLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tabLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    tabLinks.forEach(function (a) {
      var section = document.querySelector(a.getAttribute('href'));
      if (section) spy.observe(section);
    });
  }
})();


/* =====================================================================
   Product hero slideshow: if .p-hero__photo has more than one <img>,
   fade through them every 5 seconds and add small dots to jump.
   ===================================================================== */
(function () {
  'use strict';
  document.querySelectorAll('.p-hero__photo').forEach(function (box) {
    var imgs = box.querySelectorAll('img');
    if (imgs.length < 2) return;

    var current = 0, timer;
    var dots = document.createElement('div');
    dots.className = 'p-hero__dots';
    box.parentNode.appendChild(dots);

    function show(i) {
      imgs[current].classList.remove('is-active');
      dots.children[current].classList.remove('is-active');
      current = (i + imgs.length) % imgs.length;
      imgs[current].classList.add('is-active');
      dots.children[current].classList.add('is-active');
    }
    function start() { clearInterval(timer); timer = setInterval(function () { show(current + 1); }, 5000); }

    imgs.forEach(function (img, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', (document.documentElement.lang === 'en' ? 'Photo ' : 'عکس ') + (i + 1));
      b.addEventListener('click', function () { show(i); start(); });
      dots.appendChild(b);
    });
    imgs[0].classList.add('is-active');
    dots.children[0].classList.add('is-active');
    start();
  });
})();