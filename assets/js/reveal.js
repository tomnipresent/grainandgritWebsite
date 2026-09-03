/* ── GGM Scroll Reveal Observer ── */
(function () {
  const ob = new IntersectionObserver(function (entries) {
    entries.forEach(function (n) {
      if (n.isIntersecting) n.target.classList.add('v');
    });
  }, { threshold: 0.06 });

  document.querySelectorAll('.rv').forEach(function (el) {
    ob.observe(el);
  });
})();
