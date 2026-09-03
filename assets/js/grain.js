/* ── GGM Grain Canvas — procedural noise background ── */
(function () {
  const c = document.getElementById('grainCanvas');
  if (!c) return;
  const x = c.getContext('2d');
  let w, h;

  function rs() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
  }

  rs();
  window.addEventListener('resize', rs);

  function rg() {
    const i = x.createImageData(w, h);
    const d = i.data;
    for (let j = 0; j < d.length; j += 4) {
      const v = (Math.random() - .5) * 80;
      const b = 128 + v;
      d[j] = b;
      d[j + 1] = b;
      d[j + 2] = b;
      d[j + 3] = 255;
    }
    x.putImageData(i, 0, 0);
    requestAnimationFrame(rg);
  }

  rg();
})();
