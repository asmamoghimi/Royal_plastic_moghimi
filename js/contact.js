/* =====================================================================
   contact.js — تماس با ما only (load after main.js)
   Topic buttons: clicking one marks it and writes its text into the
   hidden «موضوع» field, so it is included in the WhatsApp message.
   (Sending the form is handled by main.js.)
   ===================================================================== */
(function () {
  'use strict';
  var topics = document.querySelectorAll('.topic');
  var input = document.getElementById('topic-input');
  if (!topics.length || !input) return;

  topics.forEach(function (btn) {
    btn.addEventListener('click', function () {
      topics.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      input.value = btn.textContent.trim();
    });
  });
})();
