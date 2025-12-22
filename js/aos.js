
document.addEventListener("DOMContentLoaded", () => {

  if (window.innerWidth >= 1024) {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      disableMutationObserver: true // impede reanimações dinâmicas
    });
  } else {
    disableAOS();
  }

});

/* FUNÇÃO GLOBAL PARA DESATIVAR AOS */
function disableAOS() {
  document.querySelectorAll('[data-aos]').forEach(el => {
    el.removeAttribute('data-aos');
    el.removeAttribute('data-aos-delay');
    el.removeAttribute('data-aos-duration');
    el.removeAttribute('data-aos-easing');
  });
}

function abrirImoveis() {
  // sua lógica atual de exibir .imoveis-content
  document.querySelector('.imoveis-content').classList.add('active');

  // DESATIVA AOS DEFINITIVAMENTE
  disableAOS();
  AOS.refreshHard();
}