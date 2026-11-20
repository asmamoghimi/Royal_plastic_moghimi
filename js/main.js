/* =====================================================================
   main.js — runs on every page
   1. Sticky header after scrolling
   2. Mobile menu
   3. WhatsApp tip bubble that opens after scrolling
   4. Scroll-reveal animations
   5. Quote / contact forms → send as a WhatsApp message
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- 1. Sticky header ---------- */
  var header = document.querySelector('.site-header');

  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle('is-sticky', window.scrollY > 140);
  }

  /* ---------- 2. Mobile menu ---------- */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      var en = document.documentElement.lang === 'en';
      toggle.setAttribute('aria-label', en ? (open ? 'Close menu' : 'Open menu') : (open ? 'بستن منو' : 'باز کردن منو'));
    });

    // close the menu after choosing a link
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 3. WhatsApp tip ---------- */
  var tip = document.getElementById('wa-tip');
  var tipClosed = false;
  try { tipClosed = sessionStorage.getItem('waTipClosed') === '1'; } catch (e) {}

  function onScrollTip() {
    if (!tip || tipClosed) return;
    if (window.scrollY > 250) tip.classList.add('is-open');
  }

  if (tip) {
    var closeBtn = tip.querySelector('.wa-float__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        tip.classList.remove('is-open');
        tipClosed = true;
        try { sessionStorage.setItem('waTipClosed', '1'); } catch (e) {}
      });
    }
  }

  /* one scroll listener for header + tip */
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      onScrollHeader();
      onScrollTip();
      ticking = false;
    });
  }, { passive: true });
  onScrollHeader();

  /* ---------- 4. Scroll reveal ---------- */
  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealItems.forEach(function (el) { io.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 5. Forms → WhatsApp ----------
     Any <form data-whatsapp="98912..."> is sent as a WhatsApp message.
     Field labels are taken from the <label> text. */
  document.querySelectorAll('form[data-whatsapp]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      var lines = [document.documentElement.lang === 'en' ? 'Enquiry from the Royal Plastic Moghimi website' : 'درخواست از سایت رویال پلاستیک مقیمی'];
      form.querySelectorAll('input, select, textarea').forEach(function (field) {
        if (!field.name || !field.value.trim()) return;
        var label = field.closest('label');
        var title = label ? label.childNodes[0].textContent.replace('*', '').trim() : field.name;
        lines.push(title + ': ' + field.value.trim());
      });

      var url = 'https://wa.me/' + form.dataset.whatsapp + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  });
})();



/* =====================================================================
   Products dropdown in the header (every page)
   Desktop opens on hover with CSS only. This part handles:
   - the arrow button in the mobile side menu
   - closing with the Escape key
   ===================================================================== */
(function () {
  'use strict';
  var item = document.querySelector('.has-mega');
  if (!item) return;
  var btn = item.querySelector('.mega-toggle');

  if (btn) {
    btn.addEventListener('click', function () {
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    item.classList.remove('is-open');
    if (document.activeElement && item.contains(document.activeElement)) document.activeElement.blur();
  });
})();