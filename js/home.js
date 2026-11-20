/* =====================================================================
   home.js — only for the homepage
   1. Hero photo slider
   2. Product list → big preview
   3. Industries circle → details card
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- 1. Hero slider ---------- */
  var slides = document.querySelectorAll('.hero__slide');
  var bars = document.querySelectorAll('.hero__bar');
  var counter = document.querySelector('.hero__counter-now');
  var current = 0;
  var timer = null;
  var DELAY = 6000; // must match the 6s bar animation in home.css

  function showSlide(index) {
    if (!slides.length) return;
    slides[current].classList.remove('is-active');
    bars[current] && bars[current].classList.remove('is-active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    if (bars[current]) {
      // restart the bar animation
      bars[current].classList.remove('is-active');
      void bars[current].offsetWidth;
      bars[current].classList.add('is-active');
    }
    if (counter) counter.textContent = String(current + 1).padStart(2, '0');
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(function () { showSlide(current + 1); }, DELAY);
  }

  bars.forEach(function (bar, i) {
    bar.addEventListener('click', function () { showSlide(i); startTimer(); });
  });
  if (slides.length > 1) startTimer();

  /* ---------- 2. Products ---------- */
  var tabs = document.querySelectorAll('.product-tab');
  var preview = document.querySelector('.product-preview');

  function fillTags(container, text, tagName, className) {
    container.innerHTML = '';
    text.split('|').forEach(function (t) {
      var el = document.createElement(tagName);
      if (className) el.className = className;
      el.textContent = t;
      container.appendChild(el);
    });
  }

  if (preview) {
    var pImg = preview.querySelector('.product-preview__img');
    var pNum = preview.querySelector('.product-preview__num');
    var pTitle = preview.querySelector('.product-preview__title');
    var pDesc = preview.querySelector('.product-preview__desc');
    var pTags = preview.querySelector('.product-preview__tags');
    var pLink = preview.querySelector('.product-preview__link');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');

        var d = tab.dataset;
        pImg.style.opacity = 0;
        setTimeout(function () {
          pImg.src = d.img;
          pImg.alt = d.name;
          pImg.style.opacity = 1;
        }, 200);
        pNum.textContent = d.num;
        pTitle.textContent = d.name;
        pDesc.textContent = d.desc;
        pLink.href = d.link;
        fillTags(pTags, d.tags, 'span', 'tag');
      });
    });
  }

  /* ---------- 3. Industries hub ---------- */
  var nodes = document.querySelectorAll('.hub__node');
  var card = document.querySelector('.industry-card');
  var activeLine = document.querySelector('.hub__active-line');

  if (card) {
    var cImg = card.querySelector('.industry-card__img');
    var cNum = card.querySelector('.industry-card__num');
    var cTitle = card.querySelector('.industry-card__title');
    var cDesc = card.querySelector('.industry-card__desc');
    var cProducts = card.querySelector('.industry-card__products');

    function selectNode(node) {
      if (node.classList.contains('is-active')) return;
      nodes.forEach(function (n) { n.classList.remove('is-active'); });
      node.classList.add('is-active');

      var d = node.dataset;
      cImg.src = d.img;
      cImg.alt = d.name;
      cNum.textContent = d.num;
      cTitle.textContent = d.name;
      cDesc.textContent = d.desc;
      fillTags(cProducts, d.products, 'span');
      if (activeLine) {
        activeLine.setAttribute('x2', d.x);
        activeLine.setAttribute('y2', d.y);
      }
    }

    nodes.forEach(function (node) {
      node.addEventListener('mouseenter', function () { selectNode(node); });
      node.addEventListener('click', function () { selectNode(node); });
      node.addEventListener('focus', function () { selectNode(node); });
    });
  }
})();
