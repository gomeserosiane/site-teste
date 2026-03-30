
document.addEventListener('DOMContentLoaded', () => {
    const cardImages = [
        ['images-slider/slider-consultas.png', 'images-slider/slider-consultas1.png',
            'images-slider/slider-consultas2.png', 'images-slider/slider-consultas3.png'],
        ['images-slider/slider-funeraria.png'],
        ['images-slider/slider-seguros.png', 'images-slider/slider-seguros1.png', 'images-slider/slider-seguros2.png'],
        ['images-slider/slider-mobilidade-urbana.png'],
        ['images-slider/slider-certificados.png'],
        ['images-slider/slider-imoveis.png'],
        ['images-slider/slider-planos.png', 'images-slider/slider-planos1.png'],
        ['images-slider/slider-otica.png'],
        ['images-slider/slider-contabilidade.png'],
        ['images-slider/slider-documentos.png'],
    ];

    const modal = document.getElementById('sliderModal');
    if (!modal) return;

    const sliderImagesContainer = modal.querySelector('.slider-images');
    const leftArrow = modal.querySelector('.left-arrow');
    const rightArrow = modal.querySelector('.right-arrow');
    const closeBtn = modal.querySelector('.close-btn');
    const triggers = document.querySelectorAll('.btn-info[data-card]');

    let currentCardIndex = 0;
    let currentImageIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    const lockScroll = () => {
        document.body.classList.add('no-scroll');
    };

    const unlockScroll = () => {
        document.body.classList.remove('no-scroll');
    };

    const renderImage = () => {
        sliderImagesContainer.innerHTML = '';
        const images = cardImages[currentCardIndex] || [];
        if (!images.length) return;

        const img = document.createElement('img');
        img.src = images[currentImageIndex];
        img.alt = `Galeria do serviço ${currentCardIndex + 1} - imagem ${currentImageIndex + 1}`;
        sliderImagesContainer.appendChild(img);

        const shouldShowArrows = images.length > 1 && window.innerWidth > 768;
        leftArrow.style.display = shouldShowArrows ? 'flex' : 'none';
        rightArrow.style.display = shouldShowArrows ? 'flex' : 'none';
    };

    const openModal = (cardIndex) => {
        currentCardIndex = cardIndex;
        currentImageIndex = 0;
        renderImage();
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        lockScroll();
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        sliderImagesContainer.innerHTML = '';
        unlockScroll();
    };

    const showPrevious = () => {
        const images = cardImages[currentCardIndex] || [];
        if (images.length <= 1) return; currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        renderImage();
    }; const showNext = () => {
        const images = cardImages[currentCardIndex] || [];
        if (images.length <= 1) return; currentImageIndex = (currentImageIndex + 1) % images.length; renderImage();
    };
    triggers.forEach((button) => {
        button.addEventListener('click', () => {
            const cardIndex = Number(button.dataset.card);
            openModal(cardIndex);
        });
    });

    leftArrow.addEventListener('click', showPrevious);
    rightArrow.addEventListener('click', showNext);
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    sliderImagesContainer.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    sliderImagesContainer.addEventListener('touchmove', (event) => {
        touchEndX = event.changedTouches[0].screenX;
    }, { passive: true });

    sliderImagesContainer.addEventListener('touchend', () => {
        const threshold = 50;
        if (touchEndX + threshold < touchStartX) showNext(); if (touchEndX > touchStartX + threshold)
            showPrevious();
    });

    document.addEventListener('keydown', (event) => {
        if (!modal.classList.contains('is-open')) return;
        if (event.key === 'Escape') closeModal();
        if (event.key === 'ArrowLeft') showPrevious();
        if (event.key === 'ArrowRight') showNext();
    });

    window.addEventListener('resize', () => {
        if (modal.classList.contains('is-open')) renderImage();
    });
});
