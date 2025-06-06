function makeDraggableWithClick(el, onClick) {
  let startX, startY, dragging = false;

  el.addEventListener('mousedown', function (e) {
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    const offsetX = e.clientX - el.offsetLeft;
    const offsetY = e.clientY - el.offsetTop;

    function onMouseMove(e) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!dragging && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) dragging = true;
      if (dragging) {
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
      }
    }

    function onMouseUp(e) {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (!dragging) onClick();
      dragging = false;
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}
