
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.cards-container');
    const btnLeft = document.querySelector('.left-btn');
    const btnRight = document.querySelector('.right-btn');

    if (!slider || !btnLeft || !btnRight) return;

    const updateArrows = () => {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        const hideLeft = slider.scrollLeft <= 8; const hideRight = slider.scrollLeft >= maxScroll - 8;

        btnLeft.style.opacity = hideLeft ? '0' : '1';
        btnLeft.style.pointerEvents = hideLeft ? 'none' : 'auto';
        btnRight.style.opacity = hideRight ? '0' : '1';
        btnRight.style.pointerEvents = hideRight ? 'none' : 'auto';
    };

    const moveRight = () => {
        slider.scrollBy({ left: slider.clientWidth * 0.92, behavior: 'smooth' });
    };

    const moveLeft = () => {
        slider.scrollBy({ left: -slider.clientWidth * 0.92, behavior: 'smooth' });
    };

    btnRight.addEventListener('click', moveRight);
    btnLeft.addEventListener('click', moveLeft);

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    slider.addEventListener('mousedown', (event) => {
        isDown = true;
        startX = event.pageX - slider.offsetLeft;
        scrollStart = slider.scrollLeft;
        slider.classList.add('is-dragging');
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('is-dragging');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('is-dragging');
        updateArrows();
    });

    slider.addEventListener('mousemove', (event) => {
        if (!isDown) return;
        event.preventDefault();
        const x = event.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.2;
        slider.scrollLeft = scrollStart - walk;
    });

    let touchStartX = 0;

    slider.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].pageX;
        scrollStart = slider.scrollLeft;
    }, { passive: true });

    slider.addEventListener('touchmove', (event) => {
        const currentX = event.touches[0].pageX;
        const walk = (currentX - touchStartX) * 1.1;
        slider.scrollLeft = scrollStart - walk;
    }, { passive: true });

    document.addEventListener('keydown', (event) => {
        if (window.innerWidth < 992) return; if (event.key === 'ArrowRight') moveRight(); if (event.key === 'ArrowLeft')
            moveLeft();
    }); slider.addEventListener('scroll', updateArrows); window.addEventListener('resize',
        updateArrows); updateArrows();
});