// Draggable magnifier lens over the split overlay-vs-GGM comparison.
// The lens shows a zoomed clone of the whole stage, so dragging it across
// the seam lets you inspect the difference between the two halves close up.
(function () {
  var stage = document.getElementById('magStage');
  if (!stage) return;

  var lens = document.getElementById('magLens');
  var inner = document.getElementById('magLensInner');
  var label = document.getElementById('magLensLabel');
  var zoom = parseFloat(stage.getAttribute('data-zoom')) || 2.5;
  var dragging = false;
  var lastX = null, lastY = null;

  function lensR() { return lens.offsetWidth / 2; }

  function sizeInner() {
    inner.style.width = stage.offsetWidth * zoom + 'px';
    inner.style.height = stage.offsetHeight * zoom + 'px';
    if (lastX !== null) place(lastX, lastY);
  }

  function place(x, y) {
    var w = stage.offsetWidth, h = stage.offsetHeight, r = lensR();
    x = Math.max(0, Math.min(w, x));
    y = Math.max(0, Math.min(h, y));
    lastX = x; lastY = y;
    lens.style.left = (x - r) + 'px';
    lens.style.top = (y - r) + 'px';
    inner.style.transform = 'translate(' + (-(x * zoom - r)) + 'px,' + (-(y * zoom - r)) + 'px)';
    if (label) label.textContent = x < w / 2 ? 'OVERLAY' : 'GGM';
  }

  function xy(e) {
    var rect = stage.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top];
  }

  stage.addEventListener('pointerdown', function (e) {
    dragging = true;
    stage.setPointerCapture(e.pointerId);
    stage.classList.add('active');
    var p = xy(e); place(p[0], p[1]);
    e.preventDefault();
  });

  stage.addEventListener('pointermove', function (e) {
    // follow on hover for mouse; require drag for touch
    if (!dragging && e.pointerType !== 'mouse') return;
    if (!dragging && e.pointerType === 'mouse') stage.classList.add('active');
    var p = xy(e); place(p[0], p[1]);
  });

  function stop() { dragging = false; }
  stage.addEventListener('pointerup', stop);
  stage.addEventListener('pointercancel', stop);
  stage.addEventListener('pointerleave', function () {
    if (!dragging) stage.classList.remove('active');
  });

  window.addEventListener('resize', sizeInner);
  // Size once images have loaded (and once now, in case they're cached)
  sizeInner();
  Array.prototype.forEach.call(stage.querySelectorAll('img'), function (img) {
    if (!img.complete) img.addEventListener('load', sizeInner);
  });
})();
