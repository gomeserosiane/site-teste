// Controla interações gerais da página institucional.
const App = (() => {
  const menuButton = document.querySelector("[data-menu-button]");
  const mainNav = document.querySelector("[data-main-nav]");
  const contactForm = document.getElementById("contact-form");
  const serviceCards = [...document.querySelectorAll("[data-service-card]")];
  const servicePrev = document.querySelector("[data-service-prev]");
  const serviceNext = document.querySelector("[data-service-next]");
  const detailSection = document.getElementById("service-detail");
  const detailCategory = document.getElementById("service-detail-category");
  const detailTitle = document.getElementById("service-detail-title");
  const detailIntro = document.getElementById("service-detail-intro");
  const detailText = document.getElementById("service-detail-text");
  const detailBenefits = document.getElementById("service-detail-benefits");
  const detailList = document.getElementById("service-detail-list");
  const detailImage = document.getElementById("service-detail-image");
  const detailDots = document.getElementById("service-detail-dots");
  const detailWhatsapp = document.getElementById("service-detail-whatsapp");
  const detailPrev = document.querySelector("[data-detail-prev]");
  const detailNext = document.querySelector("[data-detail-next]");
  const backButton = document.querySelector("[data-back-services]");

  let activeService = 0;
  let activeDetailImage = 0;
  let currentDetail = null;
  let isDetailTransitioning = false;

  const serviceDetails = [
    {
      category: "Saúde",
      title: "Consultas e planos",
      intro: "Uma frente voltada para orientar famílias, profissionais e empresas na contratação de soluções de saúde com mais clareza e segurança.",
      text: "O atendimento começa com a identificação da necessidade do cliente, perfil de uso, faixa de investimento e urgência. A partir disso, o Grupo Gomes & Rosiane apresenta alternativas de consultas, planos de saúde, odontológicos e cartões de benefícios, explicando coberturas, diferenciais e próximos passos de contratação.",
      benefits: "Mais praticidade para comparar opções, atendimento direto pelo WhatsApp, orientação antes da contratação e suporte para escolher uma solução alinhada à rotina da família ou da empresa.",
      items: ["Famílias que buscam atendimento médico recorrente", "Empresas que desejam benefícios para colaboradores", "Clientes que precisam de orientação antes de contratar um plano"],
      images: [
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1100&q=80",
        "https://images.unsplash.com/photo-1580281658629-9b93f18ae9ae?auto=format&fit=crop&w=1100&q=80",
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1100&q=80"
      ]
    },
    {
      category: "Proteção",
      title: "Seguros e planos funerários",
      intro: "Soluções para proteger patrimônio, família e rotina empresarial com uma análise simples, objetiva e responsável.",
      text: "A consultoria avalia o tipo de proteção desejada, os riscos mais importantes e o perfil de cobertura ideal. O cliente recebe orientação sobre seguros de vida, automóvel, residência, empresa e planos funerários, com explicação clara sobre benefícios, limites e documentos necessários.",
      benefits: "Redução de incertezas, melhor entendimento das coberturas, indicação de opções adequadas ao perfil do cliente e atendimento consultivo antes da contratação.",
      items: ["Famílias que desejam proteção financeira", "Proprietários de veículos e imóveis", "Empresas que precisam reduzir riscos operacionais"],
      images: [
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1100&q=80",
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1100&q=80",
        "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=1100&q=80"
      ]
    },
    {
      category: "Imobiliário",
      title: "Imóveis e regularização",
      intro: "Atendimento imobiliário para compra, venda, aluguel, avaliação e regularização com mais segurança documental.",
      text: "A equipe acompanha o cliente na análise do imóvel, organização de documentos, avaliação de oportunidades e encaminhamento de processos de legalização. O objetivo é tornar cada etapa mais clara, reduzindo burocracias e facilitando decisões patrimoniais.",
      benefits: "Mais segurança na negociação, acompanhamento consultivo, organização documental e suporte para evitar atrasos em processos de compra, venda, aluguel ou regularização.",
      items: ["Quem deseja vender ou comprar imóvel", "Proprietários que precisam regularizar documentação", "Clientes que buscam avaliação e administração imobiliária"],
      images: [
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1100&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=80"
      ]
    },
    {
      category: "Empresarial",
      title: "Contabilidade e documentação",
      intro: "Suporte para empresas e profissionais que precisam de organização contábil, certificados digitais e documentação em dia.",
      text: "A frente empresarial atua em abertura de empresas, certificados digitais, folha de pagamento, regularizações e documentação. O processo foi pensado para simplificar demandas administrativas e ajudar o cliente a manter sua operação mais organizada.",
      benefits: "Atendimento centralizado, orientação sobre documentos, mais agilidade em processos empresariais e suporte para manter obrigações administrativas sob controle.",
      items: ["Empreendedores em fase de abertura de empresa", "Empresas que precisam de certificado digital", "Negócios que buscam suporte contábil e documental"],
      images: [
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1100&q=80",
        "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1100&q=80",
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1100&q=80"
      ]
    }
  ];

  // Abre e fecha o menu em telas menores.
  function setupMenu() {
    if (!menuButton || !mainNav) return;

    menuButton.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mainNav.classList.remove("open"));
    });
  }

  // Faz a rolagem para uma seção depois que a tela de detalhe termina de fechar.
  function scrollToSection(targetSelector) {
    const target = document.querySelector(targetSelector);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Envia o formulário para o WhatsApp com a mensagem já preenchida.
  function setupWhatsappForm() {
    if (!contactForm) return;

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const phone = document.getElementById("contact-phone").value.trim();
      const subject = document.getElementById("contact-subject").value.trim();
      const message = `Olá, meu nome é ${name}.%0AEmail: ${email}%0AWhatsApp: ${phone}%0AAssunto: ${subject}`;

      window.open(`https://wa.me/5591999635260?text=${message}`, "_blank", "noopener");
      contactForm.reset();
    });
  }

  function updateServiceArrows() {
    if (!servicePrev || !serviceNext) return;

    servicePrev.classList.toggle("hidden", activeService === 0);
    serviceNext.classList.toggle("hidden", activeService === serviceCards.length - 1);
  }

  function showService(index) {
    activeService = Math.min(Math.max(index, 0), serviceCards.length - 1);

    serviceCards.forEach((card, cardIndex) => {
      card.classList.toggle("active", cardIndex === activeService);
    });

    updateServiceArrows();
    lucide.createIcons();
  }

  // Atualiza a imagem ativa do carrossel da tela de detalhe.
  function renderDetailImage() {
    if (!currentDetail) return;

    detailImage.src = currentDetail.images[activeDetailImage];
    detailImage.alt = currentDetail.title;
    detailDots.innerHTML = "";

    currentDetail.images.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = index === activeDetailImage ? "active" : "";
      dot.setAttribute("aria-label", `Ver foto ${index + 1}`);
      dot.addEventListener("click", () => {
        activeDetailImage = index;
        renderDetailImage();
      });
      detailDots.appendChild(dot);
    });
  }

  // Abre a tela completa do serviço sem remover header, contato e footer.
  function openServiceDetail(service) {
    if (isDetailTransitioning) return;

    currentDetail = service;
    activeDetailImage = 0;
    detailCategory.textContent = service.category;
    detailTitle.textContent = service.title;
    detailIntro.textContent = service.intro;
    detailText.textContent = service.text;
    detailBenefits.textContent = service.benefits;
    detailWhatsapp.href = `https://wa.me/5591999635260?text=${encodeURIComponent(`olá, gostaria de saber mais a respeito de ${service.title}`)}`;
    detailList.innerHTML = service.items.map((item) => `<li>${item}</li>`).join("");
    renderDetailImage();

    isDetailTransitioning = true;
    document.body.classList.add("service-detail-open");
    detailSection.classList.remove("hidden");

    requestAnimationFrame(() => {
      document.body.classList.add("service-detail-visible");
      detailSection.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.setTimeout(() => {
      isDetailTransitioning = false;
    }, 420);

    lucide.createIcons();
  }

  function closeServiceDetail(targetSelector = "#servicos") {
    if (!document.body.classList.contains("service-detail-open") || isDetailTransitioning) {
      scrollToSection(targetSelector);
      return;
    }

    isDetailTransitioning = true;
    document.body.classList.remove("service-detail-visible");
    document.body.classList.add("service-detail-closing");

    window.setTimeout(() => {
      detailSection.classList.add("hidden");
      document.body.classList.remove("service-detail-open", "service-detail-closing");
      isDetailTransitioning = false;
      scrollToSection(targetSelector);
    }, 360);
  }

  // Quando a tela de detalhe estiver aberta, links do header/footer fecham a tela e levam à seção correta.
  function setupDetailNavigation() {
    document.querySelectorAll(".main-nav a[href^='#'], .footer-nav a[href^='#'], .brand[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (!document.body.classList.contains("service-detail-open")) return;

        event.preventDefault();
        mainNav?.classList.remove("open");
        closeServiceDetail(link.getAttribute("href"));
      });
    });

    document.querySelectorAll("#service-detail a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        closeServiceDetail(link.getAttribute("href"));
      });
    });
  }

  // Controla o carrossel de serviços e a tela de detalhe.
  function setupServiceSlider() {
    if (!serviceCards.length) return;

    servicePrev.addEventListener("click", () => showService(activeService - 1));
    serviceNext.addEventListener("click", () => showService(activeService + 1));

    document.querySelectorAll("[data-service-detail]").forEach((button) => {
      button.addEventListener("click", () => {
        openServiceDetail(serviceDetails[Number(button.dataset.serviceDetail)]);
      });
    });

    backButton.addEventListener("click", () => closeServiceDetail("#servicos"));
    detailPrev.addEventListener("click", () => {
      activeDetailImage = activeDetailImage === 0 ? currentDetail.images.length - 1 : activeDetailImage - 1;
      renderDetailImage();
    });
    detailNext.addEventListener("click", () => {
      activeDetailImage = activeDetailImage === currentDetail.images.length - 1 ? 0 : activeDetailImage + 1;
      renderDetailImage();
    });

    showService(0);
  }

  function init() {
    setupMenu();
    setupWhatsappForm();
    setupServiceSlider();
    setupDetailNavigation();
    lucide.createIcons();
  }

  return { init };
})();

App.init();

