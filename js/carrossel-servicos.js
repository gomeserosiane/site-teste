

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".cards-container");
  const cards = Array.from(container.children);
  const prevBtn = document.querySelector(".left-btn");
  const nextBtn = document.querySelector(".right-btn");

  const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(container).gap);

  // DUPLICA OS CARDS PARA LOOP INFINITO
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add("clone");
    container.appendChild(clone);
  });

  // POSIÇÃO INICIAL (meio)
  let index = cards.length;
  container.style.transform = `translateX(-${cardWidth * index}px)`;

  let isAnimating = false;

  function moveToIndex(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    container.style.transition = "transform 0.5s ease";
    container.style.transform = `translateX(-${cardWidth * newIndex}px)`;
    index = newIndex;

    setTimeout(() => {
      container.style.transition = "none";

      // RESET INVISÍVEL PARA LOOP
      if (index >= cards.length * 2) {
        index = cards.length;
        container.style.transform = `translateX(-${cardWidth * index}px)`;
      }

      if (index < cards.length) {
        index = cards.length;
        container.style.transform = `translateX(-${cardWidth * index}px)`;
      }

      isAnimating = false;
    }, 500);
  }

  nextBtn.addEventListener("click", () => {
    moveToIndex(index + 1);
  });

  prevBtn.addEventListener("click", () => {
    moveToIndex(index - 1);
  });

  // SUPORTE A TOQUE (MOBILE)
  let startX = 0;

  container.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) moveToIndex(index + 1);
    if (endX - startX > 50) moveToIndex(index - 1);
  });
});
