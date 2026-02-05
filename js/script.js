// Rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const alvo = document.querySelector(this.getAttribute('href'));
    if (alvo) {
      window.scrollTo({
        top: alvo.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

  function abrirSliderLuckCard() {
    const sliderImagesLuck = [
        "images/banner - help.png",
        "images/banner - help2.png",
        "images/banner - help3.png"
    ];

    let currentSlideLuck = 0;
    const sliderOverlayLuck = document.getElementById("slider-overlay-luck");
    const sliderImgLuck = document.getElementById("slider-image-luck");

    sliderOverlayLuck.style.display = "flex";
    sliderImgLuck.src = sliderImagesLuck[currentSlideLuck];

    // Fechar slider
    document.querySelector(".slider-close-luck").onclick = () => {
        sliderOverlayLuck.style.display = "none";
    };

    // Setas
    document.querySelector(".slider-arrow-luck.left").onclick = () => {
        currentSlideLuck = (currentSlideLuck - 1 + sliderImagesLuck.length) % sliderImagesLuck.length;
        sliderImgLuck.src = sliderImagesLuck[currentSlideLuck];
    };

    document.querySelector(".slider-arrow-luck.right").onclick = () => {
        currentSlideLuck = (currentSlideLuck + 1) % sliderImagesLuck.length;
        sliderImgLuck.src = sliderImagesLuck[currentSlideLuck];
    };
}
