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
      title: "Consultas médicas",
      intro: "Atendimento pensado para facilitar o acesso a consultas e orientações de saúde com agilidade, clareza e acolhimento.",
      text: "O atendimento começa pelo entendimento da necessidade do cliente, especialidade desejada e urgência do caso. A partir dessas informações, a equipe orienta sobre as possibilidades de consulta, disponibilidade de atendimento e próximos passos para que o cliente tenha uma experiência mais organizada.",
      benefits: "Mais praticidade para buscar atendimento, orientação antes do agendamento, comunicação direta pelo WhatsApp e apoio para encontrar uma alternativa compatível com a rotina da família.",
      items: ["Famílias que precisam de consultas recorrentes", "Clientes que buscam orientação inicial de saúde", "Pessoas que desejam atendimento prático e bem direcionado"],
      images: [
        "images-slider/slider-consultas.png",
        "images-slider/slider-consultas1.png",
        "images-slider/slider-consultas2.png",
        "images-slider/slider-consultas3.png"
      ]
    },
    {
      category: "Saúde familiar e corporativa",
      title: "Planos de Saúde e Odontológicos",
      intro: "Soluções para quem deseja cuidar da saúde com previsibilidade, acesso facilitado e orientação na escolha do plano mais adequado.",
      text: "A consultoria avalia perfil familiar ou corporativo, quantidade de usuários, necessidade de cobertura médica ou odontológica e faixa de investimento. Com base nisso, o Grupo Gomes & Rosiane apresenta opções disponíveis, explica benefícios, limitações, carências e documentos necessários para contratação.",
      benefits: "O cliente recebe apoio para comparar alternativas, entender as condições de cada plano e escolher uma solução compatível com sua realidade, evitando contratações apressadas ou mal compreendidas.",
      items: ["Famílias que desejam assistência médica e odontológica", "Empresas que buscam benefícios para colaboradores", "Profissionais autônomos que precisam de cobertura organizada"],
      images: [
        "images-slider/slider-planos.png",
        "images-slider/slider-planos1.png"
      ]
    },
    {
      category: "Seguros",
      title: "Seguros",
      intro: "Consultoria para proteger patrimônio, renda, família e rotina empresarial com coberturas alinhadas ao perfil de cada cliente.",
      text: "A equipe identifica o tipo de risco que precisa ser protegido, analisa informações básicas do cliente e orienta sobre modalidades como seguro de vida, automotivo, residencial e empresarial. O objetivo é tornar a contratação mais clara, explicando coberturas, assistências, limites e documentação.",
      benefits: "Mais segurança para decidir, melhor compreensão das coberturas contratadas, atendimento próximo e indicação de alternativas que respeitam necessidade, orçamento e objetivo de proteção.",
      items: ["Famílias que buscam proteção financeira", "Proprietários de veículos e imóveis", "Empresas que desejam reduzir riscos operacionais"],
      images: [
        "images-slider/slider-seguros.png",
        "images-slider/slider-seguros1.png",
        "images-slider/slider-seguros2.png"
      ]
    },
    {
      category: "Mobilidade",
      title: "Seguros para Motoristas",
      intro: "Proteção voltada para profissionais que dependem do veículo para trabalhar e precisam manter sua operação com mais tranquilidade.",
      text: "O atendimento considera o perfil do motorista, tipo de veículo, forma de uso e rotina de trabalho. A partir disso, são apresentadas alternativas para taxistas, mototaxistas, motoristas de aplicativo e profissionais de transporte que precisam de suporte em situações de imprevisto.",
      benefits: "Mais segurança para a rotina de trabalho, orientação sobre coberturas úteis para mobilidade urbana e apoio para contratar uma solução compatível com o uso profissional do veículo.",
      items: ["Taxistas e mototaxistas", "Motoristas de aplicativo", "Profissionais que utilizam veículo como ferramenta de trabalho"],
      images: [
        "images-slider/slider-seguro-motorista.png",
        "images-slider/slider-seguro-motorista2.png",
        "images-slider/slider-seguro-motorista3.png",
        "images-slider/slider-seguro-motorista4.png",
        "images-slider/slider-seguro-motorista5.png",
        "images-slider/slider-seguro-motorista6.png"
      ]
    },
    {
      category: "Proteção",
      title: "Planos funerários",
      intro: "Assistência funerária para famílias que desejam planejamento, acolhimento e suporte em momentos sensíveis.",
      text: "A equipe orienta sobre opções de plano, cobertura familiar ou individual, condições de atendimento e benefícios incluídos. O objetivo é ajudar o cliente a se planejar com responsabilidade, evitando decisões urgentes em momentos delicados.",
      benefits: "Mais previsibilidade para a família, atendimento humanizado, orientação clara sobre cobertura e suporte para contratar uma assistência adequada às necessidades do cliente.",
      items: ["Famílias que desejam planejamento preventivo", "Clientes que buscam assistência individual", "Empresas que desejam oferecer benefício de proteção familiar"],
      images: [
        "images-slider/slider-funeraria.png",
        "images-slider/slider-funeraria2.png",
        "images-slider/slider-funeraria3.png",
        "images-slider/slider-funeraria4.png"
      ]
    },
    {
      category: "Ótica",
      title: "Ótica",
      intro: "Soluções ópticas para quem busca conforto visual, boa escolha de armações e orientação na compra de lentes.",
      text: "O atendimento auxilia o cliente na escolha de armações, óculos de grau, óculos de sol e lentes de contato, considerando estilo, rotina, necessidade visual e conforto no uso diário. A proposta é unir estética, funcionalidade e acompanhamento próximo.",
      benefits: "Mais segurança na escolha dos produtos, orientação personalizada, variedade de soluções e atendimento voltado para o uso real do cliente no trabalho, estudo e lazer.",
      items: ["Clientes que precisam de óculos de grau", "Pessoas que buscam óculos de sol ou lentes de contato", "Quem deseja orientação para escolher armações adequadas"],
      images: [
        "images-slider/slider-otica.png"
      ]
    },
    {
      category: "Imobiliário",
      title: "Serviços Imobiliários",
      intro: "Atendimento imobiliário para venda, aluguel, administração, avaliação e regularização de imóveis com mais segurança documental.",
      text: "A equipe acompanha o cliente na análise do imóvel, organização de documentos, avaliação de oportunidades e encaminhamento de processos de legalização. O objetivo é tornar cada etapa mais clara, reduzindo burocracias e facilitando decisões patrimoniais.",
      benefits: "Mais segurança na negociação, acompanhamento consultivo, organização documental e suporte para evitar atrasos em processos de compra, venda, aluguel ou regularização.",
      items: ["Quem deseja vender, comprar ou alugar imóvel", "Proprietários que precisam administrar ou regularizar imóveis", "Clientes que buscam avaliação e orientação imobiliária"],
      images: [
        "images-slider/slider-imoveis.png"
      ]
    },
    {
      category: "Certificados Digitais",
      title: "Certificados Digitais",
      intro: "Emissão e orientação para uso de certificados digitais em rotinas fiscais, empresariais, documentais e de identificação eletrônica.",
      text: "O atendimento orienta o cliente sobre o certificado mais adequado, como e-CPF ou e-CNPJ, documentos necessários, validade e formas de utilização. Também oferece suporte para consultas cadastrais e demandas que exigem identificação digital segura.",
      benefits: "Mais agilidade em processos digitais, redução de dúvidas na emissão, orientação sobre o uso correto do certificado e suporte para pessoas físicas e jurídicas.",
      items: ["Empresas que precisam emitir notas e cumprir obrigações digitais", "Profissionais que assinam documentos eletrônicos", "Clientes que precisam de e-CPF, e-CNPJ ou consultas cadastrais"],
      images: [
        "images-slider/slider-certificados.png"
      ]
    },
    {
      category: "Empresarial",
      title: "Contabilidade e documentação",
      intro: "Suporte para empresas e profissionais que precisam de organização contábil, certificados digitais e documentação em dia.",
      text: "A frente empresarial atua em abertura de empresas, regularizações, folha de pagamento, organização documental e suporte contábil. O processo foi pensado para simplificar demandas administrativas e ajudar o cliente a manter sua operação mais organizada.",
      benefits: "Atendimento centralizado, orientação sobre documentos, mais agilidade em processos empresariais e suporte para manter obrigações administrativas sob controle.",
      items: ["Empreendedores em fase de abertura de empresa", "Empresas que precisam regularizar documentação", "Negócios que buscam suporte contábil e administrativo"],
      images: [
        "images-slider/slider-contabilidade.png",
        "images-slider/slider-contabilidade2.png",
        "images-slider/slider-contabilidade3.png",
        "images-slider/slider-contabilidade4.png",
        "images-slider/slider-documentos.png",
        "images-slider/slider-documentos2.jpeg",
        "images-slider/slider-documentos3.png",
        "images-slider/slider-documentos4.png"
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
