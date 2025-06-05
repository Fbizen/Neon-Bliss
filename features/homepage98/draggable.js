function makeDraggableWithClick(dragHandle, onClick) {
  let startX, startY, dragging = false;
  const container = dragHandle.parentElement.parentElement; // move the whole window

  dragHandle.addEventListener('mousedown', function (e) {
    e.preventDefault(); // prevent text selection
    startX = e.clientX;
    startY = e.clientY;

    const offsetX = e.clientX - container.offsetLeft;
    const offsetY = e.clientY - container.offsetTop;

    function onMouseMove(e) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!dragging && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) dragging = true;
      if (dragging) {
        container.style.left = `${e.clientX - offsetX}px`;
        container.style.top = `${e.clientY - offsetY}px`;
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
