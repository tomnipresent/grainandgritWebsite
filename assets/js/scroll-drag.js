// Drag-to-scroll for horizontal scroll strips
(function () {
  var scrollers = document.querySelectorAll('.stock-scroll');
  scrollers.forEach(function (el) {
    var isDown = false;
    var hasDragged = false;
    var startX, scrollLeft;

    el.addEventListener('mousedown', function (e) {
      // Only left click
      if (e.button !== 0) return;
      isDown = true;
      hasDragged = false;
      startX = e.pageX;
      scrollLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
    });

    window.addEventListener('mouseup', function () {
      if (!isDown) return;
      isDown = false;
      el.style.cursor = '';
      el.style.userSelect = '';
    });

    window.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      var dx = e.pageX - startX;
      // Only start dragging after 8px threshold
      if (Math.abs(dx) > 8) {
        hasDragged = true;
        e.preventDefault();
        el.scrollLeft = scrollLeft - dx;
      }
    });

    // Prevent click on links after a real drag
    el.addEventListener('click', function (e) {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
        hasDragged = false;
      }
    }, true);
  });
})();
