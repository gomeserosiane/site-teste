
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const backdrop = document.getElementById('menu-backdrop');
    const mobileLinks = document.querySelectorAll('#mobile-menu a');

    if (!toggle || !mobileMenu || !closeMenu || !backdrop) return;

    const openMenu = () => {
        mobileMenu.classList.add('is-open');
        backdrop.classList.add('is-visible');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('no-scroll');
    };

    const closeMobileMenu = () => {
        mobileMenu.classList.remove('is-open');
        backdrop.classList.remove('is-visible');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
    };

    toggle.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMobileMenu);
    backdrop.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
            closeMobileMenu();
        }
    });
});