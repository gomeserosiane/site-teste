
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const alvo = document.querySelector(this.getAttribute("href"));
    const offset = -60; // ajuste: header fixo / posição desejada

    const top = alvo.getBoundingClientRect().top + window.pageYOffset + offset;

    window.scrollTo({
      top: top,
      behavior: "smooth"
    });

    // Fecha o menu mobile, se estiver aberto
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.style.right = "-300px";
    document.body.classList.remove("no-scroll");
  });
});