
document.addEventListener("DOMContentLoaded", () => {

    // Se a tela for desktop, inicializa o AOS
    if (window.innerWidth >= 1024) {
        AOS.init({
            duration: 800,
            easing: "ease-out",
            once: true
        });
    } else {
        // Remove todos os atributos AOS no mobile
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.removeAttribute('data-aos');
            el.removeAttribute('data-aos-delay');
            el.removeAttribute('data-aos-duration');
        });
    }
});