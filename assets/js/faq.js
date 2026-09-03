/* ── GGM FAQ Accordion ── */
(function () {
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.addEventListener('click', function () {
      this.classList.toggle('open');
    });
  });
})();
