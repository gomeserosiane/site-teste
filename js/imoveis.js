document.addEventListener('DOMContentLoaded', () => {

  const modal = document.querySelector('.imovel-modal');
  const sliderImg = document.getElementById('sliderImage');
  const leftArrow = document.querySelector('.slider-arrow.left');
  const rightArrow = document.querySelector('.slider-arrow.right');
  const items = document.querySelectorAll('.imovel-item');

  const closeBtn = document.querySelector('.close-btn-imovel');

  const subtituloEl = document.getElementById('imovelSubtitulo');
  const desc1 = document.getElementById('imovelDescricao1');
  const desc2 = document.getElementById('imovelDescricao2');
  const desc3 = document.getElementById('imovelDescricao3');

  if (
    !modal || !sliderImg || !leftArrow || !rightArrow ||
    !subtituloEl || !desc1 || !desc2 || !desc3 || !closeBtn ||
    items.length === 0
  ) {
    console.error('Erro: elementos do modal não encontrados');
    return;
  }

  /* ===== TRAVAR / LIBERAR SCROLL ===== */
  function lockScroll() {
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    document.body.style.overflow = '';
  }

  /* ===== DADOS DOS IMÓVEIS ===== */
  const imoveis = {
    0: {
      subtitulo: 'Ap. para Alugar – Marambaia',
      descricoes: [
        'Com 01 quarto, 01 sala, 01 banheiro e 38,00 m2 de área, este apartamento é ideal para quem busca praticidade e conforto. Além disso, está situado em uma região com uma ótima infraestrutura, próxima a feiras, supermercados e farmácias, facilitando o seu dia a dia.',
        'O imóvel conta com acabamentos de qualidade, proporcionando um ambiente moderno e agradável. A sala é espaçosa e bem iluminada, perfeita para receber amigos e familiares. O quarto é aconchegante e tranquilo, garantindo boas noites de sono.'
      ],
      imagens: [
        'images-imoveis/casa-marambaia-img1.png',
        'images-imoveis/casa-marambaia-img2.png',
        'images-imoveis/casa-marambaia-img3.png',
        'images-imoveis/casa-marambaia-img4.png',
        'images-imoveis/casa-marambaia-img5.png',
        'images-imoveis/casa-marambaia-img6.png'
      ]
    },
    1: {
      subtitulo: 'Casa para Vender – Souza',
      descricoes: [
        'Localizada em uma região privilegiada, essa casa encantadora possui 56,02 m2 de área, perfeita para quem busca conforto e praticidade. Com uma boa localização, próxima a escolas, supermercados, farmácias e com fácil acesso a transporte público, essa casa é ideal para quem deseja viver em um lugar tranquilo e com toda a infraestrutura necessária para o dia a dia.',
        'O imóvel conta com 2 quartos espaçosos, uma sala aconchegante, cozinha ampla em conceito aberto , banheiro moderno arejada. Além disso, sala de estar ,garagem e doi banheiros na area do térreo e Não perca a oportunidade de adquirir essa casa incrível e transformar seus sonhos em realidade. Agende uma visita e venha conhecer pessoalmente cada detalhe desse imóvel encantador.'
      ],
      imagens: [
        'images-imoveis/casa-souza-img1.png'
      ]
    },
    2: {
      subtitulo: 'Ponto Comercial para Alugar – Pedreira',
      descricoes: [
        'Localizado em uma das regiões mais movimentadas da cidade, este imóvel possui área de 24,5 m com espaço amplo e 1 banheiro, perfeito para atender às necessidades de seu negócio. Com uma fachada , o espaço que oferece grande visibilidade para atrair clientes e alavancar suas vendas.'
      ],
      imagens: [
        'images-imoveis/ponto-comercial-pedreira-img1.png',
        'images-imoveis/ponto-comercial-pedreira-img2.png',
        'images-imoveis/ponto-comercial-pedreira-img3.png'
      ]
    },
    3: {
      subtitulo: 'Ap. para Alugar – Marambaia',
      descricoes: [
        'Com 01 quarto, 01 sala, 01 banheiro e 38,00 m2 de área, este apartamento é ideal para quem busca praticidade e conforto. Além disso, está situado em uma região com uma ótima infraestrutura, próxima a feiras, supermercados e farmácias, facilitando o seu dia a dia.',
        'O imóvel conta com acabamentos de qualidade, proporcionando um ambiente moderno e agradável. A sala é espaçosa e bem iluminada, perfeita para receber amigos e familiares. O quarto é aconchegante e tranquilo, garantindo boas noites de sono.'
      ],
      imagens: [
        'images-imoveis/casa-marambaia-img1.png',
        'images-imoveis/casa-marambaia-img2.png',
        'images-imoveis/casa-marambaia-img3.png',
        'images-imoveis/casa-marambaia-img4.png',
        'images-imoveis/casa-marambaia-img5.png',
        'images-imoveis/casa-marambaia-img6.png'
      ]
    },
    4: {
      subtitulo: 'Casa para Vender – Souza',
      descricoes: [
        'Localizada em uma região privilegiada, essa casa encantadora possui 56,02 m2 de área, perfeita para quem busca conforto e praticidade. Com uma boa localização, próxima a escolas, supermercados, farmácias e com fácil acesso a transporte público, essa casa é ideal para quem deseja viver em um lugar tranquilo e com toda a infraestrutura necessária para o dia a dia.',
        'O imóvel conta com 2 quartos espaçosos, uma sala aconchegante, cozinha ampla em conceito aberto , banheiro moderno arejada. Além disso, sala de estar ,garagem e doi banheiros na area do térreo e Não perca a oportunidade de adquirir essa casa incrível e transformar seus sonhos em realidade. Agende uma visita e venha conhecer pessoalmente cada detalhe desse imóvel encantador.'
      ],
      imagens: [
        'images-imoveis/casa-souza-img1.png'
      ]
    },
    5: {
      subtitulo: 'Ponto Comercial para Alugar – Pedreira',
      descricoes: [
        'Localizado em uma das regiões mais movimentadas da cidade, este imóvel possui área de 24,5 m com espaço amplo e 1 banheiro, perfeito para atender às necessidades de seu negócio. Com uma fachada , o espaço que oferece grande visibilidade para atrair clientes e alavancar suas vendas.'
      ],
      imagens: [
        'images-imoveis/ponto-comercial-pedreira-img1.png',
        'images-imoveis/ponto-comercial-pedreira-img2.png',
        'images-imoveis/ponto-comercial-pedreira-img3.png'
      ]
    },
  };

  let imagensAtuais = [];
  let index = 0;

  /* ===== ABRIR MODAL ===== */
  items.forEach(item => {
    item.addEventListener('click', () => {

      const id = item.dataset.imovel;
      const imovel = imoveis[id];
      if (!imovel) return;

      imagensAtuais = imovel.imagens;
      index = 0;

      sliderImg.src = imagensAtuais[index];
      subtituloEl.textContent = imovel.subtitulo;

      desc1.textContent = imovel.descricoes[0] || '';
      desc2.textContent = imovel.descricoes[1] || '';
      desc3.textContent = imovel.descricoes[2] || '';

      modal.style.display = 'flex';
      lockScroll();
      updateArrows();
    });
  });

  /* ===== SETAS ===== */
  leftArrow.addEventListener('click', e => {
    e.stopPropagation();
    if (index > 0) {
      index--;
      sliderImg.src = imagensAtuais[index];
      updateArrows();
    }
  });

  rightArrow.addEventListener('click', e => {
    e.stopPropagation();
    if (index < imagensAtuais.length - 1) {
      index++;
      sliderImg.src = imagensAtuais[index];
      updateArrows();
    }
  });

  function updateArrows() {
    leftArrow.style.display = index === 0 ? 'none' : 'block';
    rightArrow.style.display =
      index === imagensAtuais.length - 1 ? 'none' : 'block';
  }

  /* ===== FECHAR MODAL ===== */
  function closeModal() {
    modal.style.display = 'none';
    sliderImg.src = '';
    imagensAtuais = [];
    unlockScroll();
  }

  closeBtn.addEventListener('click', e => {
    e.stopPropagation();
    closeModal();
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });

});
