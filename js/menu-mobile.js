const toggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");

// Abrir menu
toggle.addEventListener("click", () => {
  mobileMenu.style.right = "0";
  document.body.classList.add("no-scroll"); // bloqueia rolagem
});

// Fechar pelo X
closeMenu.addEventListener("click", (event) => {
  event.stopPropagation(); // impede conflito com clique fora
  mobileMenu.style.right = "-300px";
  document.body.classList.remove("no-scroll"); // libera rolagem
});

// Fechar ao clicar fora (exceto no X e nos links)
document.addEventListener("click", (e) => {
  if (
    !mobileMenu.contains(e.target) && // clique não foi dentro do menu
    !toggle.contains(e.target)        // e não foi no botão abrir
  ) {
    mobileMenu.style.right = "-300px";
    document.body.classList.remove("no-scroll"); // libera rolagem
  }
});

// Fechar ao clicar nos links
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.style.right = "-300px";
    document.body.classList.remove("no-scroll"); // libera rolagem
  });
});