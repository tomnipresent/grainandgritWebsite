// Results blocks — compare (same frame, every stock) + shared lightbox
(function () {
  // ── Shared lightbox ──
  var lb = null;
  function openLightbox(src, alt, capHTML) {
    lb = document.createElement('div');
    lb.className = 'rg-lb';
    lb.innerHTML =
      '<div class="rg-lb-inner">' +
      '<button class="rg-lb-close" type="button">CLOSE ✕</button>' +
      '<div class="ph" style="position:absolute;inset:0"></div>' +
      '<img src="' + src + '" alt="' + (alt || '') + '" onerror="this.style.display=\'none\'">' +
      '<div class="rg-lb-cap">' + capHTML + '</div>' +
      '</div>';
    document.body.appendChild(lb);
    requestAnimationFrame(function () { lb.classList.add('active'); });
    lb.addEventListener('click', closeLightbox);
    lb.querySelector('.rg-lb-inner').addEventListener('click', function (e) { e.stopPropagation(); });
    lb.querySelector('.rg-lb-close').addEventListener('click', closeLightbox);
  }
  function closeLightbox() {
    if (!lb) return;
    var node = lb;
    lb = null;
    node.classList.remove('active');
    setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); }, 200);
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });

  // ── Compare: thumbnail switching + click-to-enlarge ──
  var frames = window.RC_FRAMES;
  if (frames && document.getElementById('rcImg')) {
    var img = document.getElementById('rcImg'),
        viewer = document.getElementById('rcViewer'),
        tag = document.getElementById('rcTag'),
        name = document.getElementById('rcName'),
        meta = document.getElementById('rcMeta'),
        phName = document.getElementById('rcPhName'),
        thumbs = document.querySelectorAll('#results-compare .rc-thumb'),
        current = 0;

    function show(i) {
      var f = frames[i];
      current = i;
      img.style.opacity = 0;
      img.alt = f.name + ' — example result';
      img.src = window.RC_BASE + f.id + '.jpg';
      tag.textContent = f.name;
      name.textContent = f.name;
      meta.textContent = f.meta;
      if (phName) phName.textContent = f.name;
      thumbs.forEach(function (t, j) { t.classList.toggle('active', j === i); });
    }

    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        show(parseInt(t.getAttribute('data-i'), 10));
      });
    });

    if (viewer) {
      viewer.addEventListener('click', function () {
        var f = frames[current];
        openLightbox(
          window.RC_BASE + f.id + '.jpg',
          f.name,
          '<span class="amb">' + f.name + '</span> · ' + f.meta
        );
      });
    }
  }

  // ── Gallery: click-to-enlarge ──
  var g = window.RG_FRAMES;
  var grid = document.querySelector('#results-gallery .rg-grid');
  if (g && grid) {
    grid.querySelectorAll('.rg-cell').forEach(function (c) {
      c.addEventListener('click', function () {
        var f = g[parseInt(c.getAttribute('data-i'), 10)];
        openLightbox(
          window.RG_BASE + f.file + '.jpg',
          f.stock + ' — ' + f.credit,
          '<span class="amb">' + f.stock + '</span> · ' + f.recipe + ' &nbsp;&nbsp; ▸ ' + f.credit
        );
      });
    });
  }
})();
