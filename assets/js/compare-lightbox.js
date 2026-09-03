// Difference comparison — click to open both crops in a full-screen lightbox
(function () {
  var trigger = document.querySelector('.zoom-compare');
  if (!trigger) return;

  var lightbox = null;

  function open() {
    var imgs = trigger.querySelectorAll('img');
    if (imgs.length < 2) return;

    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML =
      '<button class="lightbox-close" aria-label="Close">ESC</button>' +
      '<div class="lb-compare">' +
        '<figure><figcaption>Overlay · every other tool</figcaption>' +
          '<img src="' + imgs[0].src + '" alt="' + (imgs[0].alt || '') + '"></figure>' +
        '<figure class="ggm"><figcaption>Rendered · Grain &amp; Grit Machine</figcaption>' +
          '<img src="' + imgs[1].src + '" alt="' + (imgs[1].alt || '') + '"></figure>' +
      '</div>';

    document.body.appendChild(lightbox);
    requestAnimationFrame(function () { lightbox.classList.add('active'); });
    lightbox.addEventListener('click', close);
    document.addEventListener('keydown', onEscape);
  }

  function close() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    setTimeout(function () {
      if (lightbox && lightbox.parentNode) lightbox.parentNode.removeChild(lightbox);
      lightbox = null;
    }, 200);
    document.removeEventListener('keydown', onEscape);
  }

  function onEscape(e) { if (e.key === 'Escape') close(); }

  trigger.addEventListener('click', open);
})();
