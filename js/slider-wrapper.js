const slider = document.querySelector(".cards-container");
const btnLeft = document.querySelector(".left-btn");
const btnRight = document.querySelector(".right-btn");

function updateArrows() {
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (slider.scrollLeft <= 10) {
        btnLeft.style.opacity = "0";
        btnLeft.style.pointerEvents = "none";
    } else {
        btnLeft.style.opacity = "1";
        btnLeft.style.pointerEvents = "auto";
    }

    if (slider.scrollLeft >= maxScroll - 10) {
        btnRight.style.opacity = "0";
        btnRight.style.pointerEvents = "none";
    } else {
        btnRight.style.opacity = "1";
        btnRight.style.pointerEvents = "auto";
    }
}

/* --- CONTROLES DAS SETAS DE NAVEGAÇÃO --- */
function moveRight() {
    slider.scrollLeft += slider.clientWidth * 0.9;
    setTimeout(updateArrows, 200);
}

function moveLeft() {
    slider.scrollLeft -= slider.clientWidth * 0.9;
    setTimeout(updateArrows, 200);
}

btnRight.addEventListener("click", moveRight);
btnLeft.addEventListener("click", moveLeft);

/* --- ARRASTAR (DESKTOP) --- */
let isDown = false;
let startX;
let scrollStart;

slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollStart = slider.scrollLeft;
});

slider.addEventListener("mouseup", () => {
    isDown = false;
    updateArrows();
});

slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollStart - walk;
});

/* --- DESLIZAR (MOBILE) --- */
slider.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollStart = slider.scrollLeft;
});

slider.addEventListener("touchend", () => {
    isDown = false;
    updateArrows();
});

slider.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollStart - walk;
});

/* --- CONTROLE PELO TECLADO (DESKTOP) --- */
document.addEventListener("keydown", (e) => {
    // Ignora se estiver no mobile
    if (window.innerWidth < 768) return;

    if (e.key === "ArrowRight") {
        moveRight();
    }

    if (e.key === "ArrowLeft") {
        moveLeft();
    }
});

/* Atualiza as setas ao iniciar */
updateArrows();

/* Atualiza também durante o scroll */
slider.addEventListener("scroll", updateArrows);