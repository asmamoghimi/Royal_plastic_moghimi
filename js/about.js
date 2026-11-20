/* =====================================================================
   about.js — درباره ما only (load after main.js)
   Timeline: click a year → show its panel and move the red line.
   Buttons use data-target="id-of-panel".
   ===================================================================== */
(function () {
  'use strict';
  var miles = document.querySelectorAll('.mile');
  var progress = document.querySelector('.timeline__progress');
  if (!miles.length) return;

  function show(index) {
    miles.forEach(function (m, i) {
      m.classList.toggle('is-active', i === index);
      m.classList.toggle('is-done', i < index);
      m.setAttribute('aria-selected', i === index ? 'true' : 'false');
      var panel = document.getElementById(m.getAttribute('data-target'));
      if (panel) panel.hidden = i !== index;
    });
    if (progress) progress.style.width = (index / (miles.length - 1) * 87.5) + '%';
  }

  miles.forEach(function (m, i) {
    m.addEventListener('click', function () { show(i); });
  });
  show(0);
})();
