
document.addEventListener('DOMContentLoaded', () => {
    const cardImagesOutros = [
        [
            'images-slider-outros/1.png',
            'images-slider-outros/2.png',
            'images-slider-outros/3.png',
            'images-slider-outros/4.png',
            'images-slider-outros/5.png',
            'images-slider-outros/6.png',
            'images-slider-outros/7.png',
            'images-slider-outros/8.png',
            'images-slider-outros/9.png',
        ],
    ];

    const modalOutros = document.getElementById('sliderModalOutros');
    if (!modalOutros) return;

    const sliderImagesOutros = modalOutros.querySelector('.slider-images-outros');
    const leftArrowOutros = modalOutros.querySelector('.left-arrow-outros');
    const rightArrowOutros = modalOutros.querySelector('.right-arrow-outros');
    const closeBtnOutros = modalOutros.querySelector('.close-btn-outros');

    let currentCardIndexOutros = 0;
    let currentImageIndexOutros = 0;

    const render = () => {
        sliderImagesOutros.innerHTML = '';
        const images = cardImagesOutros[currentCardIndexOutros] || [];
        if (!images.length) return;

        const img = document.createElement('img');
        img.src = images[currentImageIndexOutros];
        img.alt = `Galeria complementar ${currentImageIndexOutros + 1}`;
        sliderImagesOutros.appendChild(img);

        const shouldShowArrows = images.length > 1 && window.innerWidth > 768;
        leftArrowOutros.style.display = shouldShowArrows ? 'flex' : 'none';
        rightArrowOutros.style.display = shouldShowArrows ? 'flex' : 'none';
    };

    const openModal = (cardIndex) => {
        currentCardIndexOutros = cardIndex;
        currentImageIndexOutros = 0;
        render();
        modalOutros.classList.add('is-open');
        modalOutros.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
    };

    const closeModal = () => {
        modalOutros.classList.remove('is-open');
        modalOutros.setAttribute('aria-hidden', 'true');
        sliderImagesOutros.innerHTML = '';
        document.body.classList.remove('no-scroll');
    };

    document.querySelectorAll('.btn-info-outros').forEach((button) => {
        button.addEventListener('click', () => {
            openModal(Number(button.dataset.card));
        });
    });

    leftArrowOutros.addEventListener('click', () => {
        const images = cardImagesOutros[currentCardIndexOutros] || [];
        if (images.length <= 1) return; currentImageIndexOutros = (currentImageIndexOutros - 1 + images.length) % images.length;
        render();
    }); rightArrowOutros.addEventListener('click', () => {
        const images = cardImagesOutros[currentCardIndexOutros] || [];
        if (images.length <= 1) return; currentImageIndexOutros = (currentImageIndexOutros + 1) % images.length; render();
    });
    closeBtnOutros.addEventListener('click', closeModal); modalOutros.addEventListener('click', (event) => {
        if (event.target === modalOutros) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (!modalOutros.classList.contains('is-open')) return;
        if (event.key === 'Escape') closeModal();
        if (event.key === 'ArrowLeft') leftArrowOutros.click();
        if (event.key === 'ArrowRight') rightArrowOutros.click();
    });

    window.addEventListener('resize', () => {
        if (modalOutros.classList.contains('is-open')) render();
    });
});
