// Array com imagens de cada card
const cardImages = [
  ["images-slider/slider-consultasmedicas1.png", "images-slider/slider-consultasmedicas2.png",
    "images-slider/slider-consultasmedicas3.png", "images-slider/slider-consultasmedicas4.png"], // Card 0 (Consultas médicas)

  ["images-slider/slider-planofunerario1.png", "images-slider/slider-planofunerario2.png",
    "images-slider/slider-planofunerario3.png", "images-slider/slider-planofunerario4.png"], // Card 1 (Funerária)

  ["images-slider/slider-seguros1.png", "images-slider/slider-seguros2.png",
    "images-slider/slider-seguros3.png", "images-slider/slider-seguros4.png"], // Card 2 (Seguros)

  ["images-slider/slider-certificados.png"], // Card 3 (Certificados)

  ["images-slider/slider-servicosdemobildade.png"], // Card 4 (Serviços de mobilidade)

  ["images-slider/slider-imoveis.png"], // Card 5 (Imóveis)

  ["images-slider/slider-planodesaude.png", "images-slider/slider-planoodonto.png"], // Card 6 (Planos de saude e odonto)

  ["images-slider/slider-otica.png"], // Card 7 (Ótica)

  ["images-slider/slider-contabilidade.png"], // Card 8 (Contabilidade)

  ["images-slider/slider-documentos.png"] // Card 9 (Documentação)
];

/***********************
 * ELEMENTOS DO DOM
 ***********************/
const modal = document.getElementById("sliderModal");
const sliderImagesContainer = modal.querySelector(".slider-images");
const leftArrow = modal.querySelector(".left-arrow");
const rightArrow = modal.querySelector(".right-arrow");
const closeBtn = modal.querySelector(".close-btn");

/***********************
 * ESTADO DO SLIDER
 ***********************/
let currentCardIndex = 0;
let currentImageIndex = 0;

/***********************
 * ABRIR MODAL
 ***********************/
document.querySelectorAll(".btn-info").forEach(btn => {
  btn.addEventListener("click", () => {
    currentCardIndex = parseInt(btn.dataset.card, 10);
    currentImageIndex = 0;

    renderImage();
    modal.style.display = "flex";

    // Trava scroll SEM quebrar sticky
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  });
});

/***********************
 * FECHAR MODAL
 ***********************/
function closeModal() {
  modal.style.display = "none";
  sliderImagesContainer.innerHTML = "";

  // Restaura scroll corretamente (ESSENCIAL)
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

closeBtn.addEventListener("click", closeModal);

// Fecha ao clicar no fundo escuro
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

/***********************
 * RENDERIZA IMAGEM
 ***********************/
function renderImage() {
  sliderImagesContainer.innerHTML = "";

  const images = cardImages[currentCardIndex];
  const img = document.createElement("img");
  img.src = images[currentImageIndex];
  sliderImagesContainer.appendChild(img);

  // Controle das setas
  if (images.length <= 1) {
    leftArrow.style.display = "none";
    rightArrow.style.display = "none";
  } else {
    leftArrow.style.display = "block";
    rightArrow.style.display = "block";
  }
}

/***********************
 * NAVEGAÇÃO POR SETAS
 ***********************/
leftArrow.addEventListener("click", () => {
  const images = cardImages[currentCardIndex];
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  renderImage();
});

rightArrow.addEventListener("click", () => {
  const images = cardImages[currentCardIndex];
  currentImageIndex = (currentImageIndex + 1) % images.length;
  renderImage();
});

/***********************
 * SWIPE MOBILE (UMA VEZ)
 ***********************/
let touchStartX = 0;
let touchEndX = 0;

sliderImagesContainer.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
});

sliderImagesContainer.addEventListener("touchmove", e => {
  touchEndX = e.changedTouches[0].screenX;
});

sliderImagesContainer.addEventListener("touchend", () => {
  const images = cardImages[currentCardIndex];
  if (images.length <= 1) return;

  const swipeThreshold = 50;

  if (touchEndX + swipeThreshold < touchStartX) {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    renderImage();
  }

  if (touchEndX > touchStartX + swipeThreshold) {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    renderImage();
  }
});