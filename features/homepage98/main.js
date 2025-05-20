document.querySelectorAll(".bubble").forEach(bubble => {
  bubble.addEventListener("click", () => {
    new Audio("assets/click.wav").play();
  });
});