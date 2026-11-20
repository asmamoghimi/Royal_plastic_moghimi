/* =====================================================================
   blog.js — blog pages only (load after main.js)
   1. List page: category buttons filter the posts
      Buttons: data-filter="all" or a category name
      Posts:   data-cat="category name" (must match the button exactly)
   2. Article page: highlight the current heading in the table of contents
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- 1. Category filter ---------- */
  var filters = document.querySelectorAll('.filter');
  var posts = document.querySelectorAll('.posts .post');
  var empty = document.querySelector('.no-posts');

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');
      var shown = 0;
      filters.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      posts.forEach(function (post) {
        var match = cat === 'all' || post.getAttribute('data-cat') === cat;
        post.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    });
  });

  /* ---------- 2. Table of contents ---------- */
  var tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    tocLinks.forEach(function (a) {
      var h = document.querySelector(a.getAttribute('href'));
      if (h) spy.observe(h);
    });
  }
})();
