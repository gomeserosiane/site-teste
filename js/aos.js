
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS === 'undefined') return;

    const isDesktop = window.innerWidth >= 992;

    if (isDesktop) {
        AOS.init({
            duration: 750,
            easing: 'ease-out-cubic',
            once: true,
            offset: 40,
        });
        return;
    }

    document.querySelectorAll('[data-aos]').forEach((element) => {
        element.removeAttribute('data-aos');
        element.removeAttribute('data-aos-delay');
        element.removeAttribute('data-aos-duration');
    });
});