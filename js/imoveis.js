
  const btnImoveis = document.getElementById("btnImoveis");
  const btnVoltar = document.getElementById("btnVoltar");
  const imoveisContent = document.getElementById("imoveisContent");

  const bodyChildren = Array.from(document.body.children);

  function esconderSite(excetoHash = null) {
    bodyChildren.forEach(el => {
      if (
        el.tagName !== "HEADER" &&
        el.tagName !== "FOOTER" &&
        !el.classList.contains("imoveis")
      ) {
        el.style.display = "none";
      }
    });

    btnImoveis.style.display = "none";
    imoveisContent.style.display = "flex";

    requestAnimationFrame(() => {
      imoveisContent.classList.add("active");
    });

    if (excetoHash) {
      setTimeout(() => {
        location.hash = excetoHash;
      }, 300);
    }
  }

  function restaurarSite(hash = null) {
    imoveisContent.classList.remove("active");
    imoveisContent.classList.add("fade-out");

    setTimeout(() => {
      imoveisContent.style.display = "none";
      imoveisContent.classList.remove("fade-out");

      bodyChildren.forEach(el => el.style.display = "");
      btnImoveis.style.display = "inline-block";

      if (hash) location.hash = hash;
    }, 400);
  }

  btnImoveis.addEventListener("click", () => {
    esconderSite();
  });

  btnVoltar.addEventListener("click", () => {
    restaurarSite();
  });

  /* INTERCEPTA NAVLINKS */
  document.querySelectorAll("header a, footer a").forEach(link => {
    link.addEventListener("click", e => {
      if (imoveisContent.classList.contains("active")) {
        e.preventDefault();
        const destino = link.getAttribute("href");
        restaurarSite(destino.replace("#", ""));
      }
    });
  });

  document.querySelectorAll('.mini-row-wrapper').forEach(wrapper => {
  const track = wrapper.querySelector('.mini-track');
  if (!track) return;

  const cards = track.children;
  const btnLeft = wrapper.querySelector('.mini-arrow.left');
  const btnRight = wrapper.querySelector('.mini-arrow.right');

  const visibleCards = 3;
  const gap = 360;
  const cardWidth = cards[0].offsetWidth + gap;

  let index = 0;

  function updateArrows() {
    btnLeft.style.display = index > 0 ? 'flex' : 'none';
    btnRight.style.display =
      index < cards.length - visibleCards ? 'flex' : 'none';
  }

  btnRight.addEventListener('click', () => {
    if (index < cards.length - visibleCards) {
      index++;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
      updateArrows();
    }
  });

  btnLeft.addEventListener('click', () => {
    if (index > 0) {
      index--;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
      updateArrows();
    }
  });

  updateArrows();
});