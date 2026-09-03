/* ── GGM Navigation — dropdown toggle ── */
(function () {
  var dd = document.querySelector('.nav-dropdown');
  if (!dd) return;
  var toggle = dd.querySelector('.nav-dropdown-toggle');

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    dd.classList.toggle('open');
  });

  document.addEventListener('click', function () {
    dd.classList.remove('open');
  });
})();
