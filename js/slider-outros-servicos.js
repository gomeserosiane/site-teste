// Lista de imagens por card (adicione mais arrays se tiver mais cards futuramente)
const cardImagesOutros = [
  ["images-slider-outros/1.png", "images-slider-outros/2.png", 
    "images-slider-outros/3.png", "images-slider-outros/4.png",
    "images-slider-outros/5.png", "images-slider-outros/6.png",
    "images-slider-outros/7.png", "images-slider-outros/8.png",
    "images-slider-outros/9.png"
  ]
  // Se quiser mais cards, adicione outros arrays aqui.
];

// Seletores do modal OUTROS SERVIÇOS
const modalOutros = document.getElementById('sliderModalOutros');
const sliderImagesOutros = modalOutros.querySelector('.slider-images-outros');
const leftArrowOutros = modalOutros.querySelector('.left-arrow-outros');
const rightArrowOutros = modalOutros.querySelector('.right-arrow-outros');
const closeBtnOutros = modalOutros.querySelector('.close-btn-outros');

let currentCardIndexOutros = 0;
let currentImageIndexOutros = 0;

// Abrir modal
document.querySelectorAll('.btn-info-outros').forEach(btn => {
  btn.addEventListener('click', () => {
    currentCardIndexOutros = parseInt(btn.dataset.card);
    currentImageIndexOutros = 0;

    showImagesOutros(currentCardIndexOutros);

    modalOutros.style.display = 'flex';
  });
});

// Fechar modal
closeBtnOutros.addEventListener('click', () => {
  modalOutros.style.display = 'none';
  sliderImagesOutros.innerHTML = '';
});

// Mostrar imagens
function showImagesOutros(cardIndex) {
  sliderImagesOutros.innerHTML = '';
  const images = cardImagesOutros[cardIndex];

  const img = document.createElement('img');
  img.src = images[currentImageIndexOutros];
  sliderImagesOutros.appendChild(img);

  // Controlar visibilidade das setas
  if (images.length <= 1) {
    leftArrowOutros.style.display = 'none';
    rightArrowOutros.style.display = 'none';
  } else {
    leftArrowOutros.style.display = 'block';
    rightArrowOutros.style.display = 'block';
  }
}

// Navegação seta esquerda
leftArrowOutros.addEventListener('click', () => {
  const images = cardImagesOutros[currentCardIndexOutros];
  currentImageIndexOutros =
    (currentImageIndexOutros - 1 + images.length) % images.length;

  showImagesOutros(currentCardIndexOutros);
});

// Navegação seta direita
rightArrowOutros.addEventListener('click', () => {
  const images = cardImagesOutros[currentCardIndexOutros];
  currentImageIndexOutros =
    (currentImageIndexOutros + 1) % images.length;

  showImagesOutros(currentCardIndexOutros);
});
