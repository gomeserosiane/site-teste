// Renderiza a seção Imobiliária, com filtros, carrossel de fotos e expansão de imagem.
const RealEstatePage = (() => {
  const listElement = document.getElementById("property-list");
  const filterButtons = [...document.querySelectorAll("[data-property-filter]")];
  const lightbox = document.getElementById("property-lightbox");
  const lightboxMedia = document.getElementById("property-lightbox-media");
  const lightboxClose = document.getElementById("property-lightbox-close");
  const lightboxPrev = document.getElementById("property-lightbox-prev");
  const lightboxNext = document.getElementById("property-lightbox-next");
  const lightboxDots = document.getElementById("property-lightbox-dots");
  let properties = [];
  let activeFilter = "todos";
  let lightboxProperty = null;
  let lightboxIndex = 0;
  const activeImages = {};

  function statusClass(status) {
    return status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
  }

  function filteredProperties() {
    if (activeFilter === "todos") return properties;
    return properties.filter((property) => property.status === activeFilter);
  }

  // Identifica se a mídia cadastrada é vídeo pelo tipo base64 ou extensão.
  function isVideoMedia(media) {
    return String(media || "").startsWith("data:video") || /\.(mp4|webm|ogg)$/i.test(String(media || ""));
  }

  // Cria o HTML de imagem ou vídeo para os cards e para a visualização ampliada.
  function createMediaMarkup(media, altText, attributes = "", withControls = false) {
    if (isVideoMedia(media)) {
      const controls = withControls ? "controls" : "";
      return `<video src="${media}" ${attributes} ${controls} muted playsinline preload="metadata" aria-label="${altText}"></video>`;
    }

    return `<img src="${media}" alt="${altText}" ${attributes}>`;
  }

  function renderLightboxImage() {
    if (!lightboxProperty) return;

    const media = lightboxProperty.images[lightboxIndex];
    lightboxMedia.innerHTML = createMediaMarkup(media, `${lightboxProperty.title} - mídia ${lightboxIndex + 1}`, "", true);
    lightboxDots.innerHTML = lightboxProperty.images.map((_, index) => (
      `<button class="${index === lightboxIndex ? "active" : ""}" type="button" data-lightbox-dot="${index}" aria-label="Ver mídia ${index + 1}"></button>`
    )).join("");
    lucide.createIcons();
  }

  function openLightbox(property, index) {
    lightboxProperty = property;
    lightboxIndex = index;
    renderLightboxImage();
    lightbox.classList.remove("hidden");
    document.body.classList.add("property-lightbox-open");
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    document.body.classList.remove("property-lightbox-open");
    lightboxMedia.innerHTML = "";
    lightboxDots.innerHTML = "";
    lightboxProperty = null;
    lightboxIndex = 0;
  }

  function showLightboxImage(direction) {
    if (!lightboxProperty) return;

    if (direction === "next") {
      lightboxIndex = lightboxIndex === lightboxProperty.images.length - 1 ? 0 : lightboxIndex + 1;
    } else {
      lightboxIndex = lightboxIndex === 0 ? lightboxProperty.images.length - 1 : lightboxIndex - 1;
    }

    renderLightboxImage();
  }

  function createPropertyCard(property) {
    const activeIndex = activeImages[property.id] || 0;
    const media = property.images[activeIndex] || property.images[0];
    const article = document.createElement("article");
    article.className = "property-card";
    article.innerHTML = `
      <div class="property-gallery">
        <button class="property-arrow property-arrow-left" type="button" aria-label="Foto anterior" data-property-prev="${property.id}">
          <i data-lucide="chevron-left"></i>
        </button>
        ${createMediaMarkup(media, property.title, `data-property-expand="${property.id}"`)}
        <button class="property-arrow property-arrow-right" type="button" aria-label="Próxima foto" data-property-next="${property.id}">
          <i data-lucide="chevron-right"></i>
        </button>
        <div class="property-thumbs">
          ${property.images.map((item, index) => `<button class="${index === activeIndex ? "active" : ""}" type="button" data-property-thumb="${property.id}" data-thumb-index="${index}">${createMediaMarkup(item, `Mídia ${index + 1} de ${property.title}`)}</button>`).join("")}
        </div>
      </div>
      <div class="property-content">
        <span class="property-status ${statusClass(property.status)}">${property.status}</span>
        <h3>${property.title}</h3>
        <p><i data-lucide="map-pin"></i> ${property.address}</p>
        <p><i data-lucide="navigation"></i> ${property.neighborhood}</p>
        <p><i data-lucide="building-2"></i> ${property.city}</p>
        <div class="property-actions">
          <a class="button button-primary" href="${property.learn_more_url || window.APP_CONFIG.DEFAULT_PROPERTY_LINK}" target="_blank" rel="noopener"><i data-lucide="info"></i> Saiba mais</a>
          <a class="button button-whatsapp" href="https://wa.me/5591981643641?text=${encodeURIComponent(`Olá, gostaria de saber mais sobre o imóvel: ${property.title}`)}" target="_blank" rel="noopener"><i data-lucide="message-circle"></i> Entre em contato</a>
        </div>
      </div>
    `;
    return article;
  }

  function renderProperties() {
    if (!listElement) return;
    const visibleProperties = filteredProperties();
    listElement.innerHTML = "";

    if (!visibleProperties.length) {
      listElement.innerHTML = '<div class="empty-properties">Nenhum imóvel encontrado para este filtro.</div>';
      return;
    }

    visibleProperties.forEach((property) => listElement.appendChild(createPropertyCard(property)));
    lucide.createIcons();
  }

  function setupFilters() {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.propertyFilter;
        filterButtons.forEach((item) => item.classList.toggle("active", item === button));
        renderProperties();
      });
    });
  }

  function setupCardActions() {
    if (!listElement) return;

    listElement.addEventListener("click", (event) => {
      const prevButton = event.target.closest("[data-property-prev]");
      const nextButton = event.target.closest("[data-property-next]");
      const thumbButton = event.target.closest("[data-property-thumb]");
      const expandImage = event.target.closest("[data-property-expand]");
      const propertyId = prevButton?.dataset.propertyPrev || nextButton?.dataset.propertyNext || thumbButton?.dataset.propertyThumb || expandImage?.dataset.propertyExpand;
      const property = properties.find((item) => item.id === propertyId);

      if (!property) return;

      if (prevButton) {
        activeImages[property.id] = activeImages[property.id] === 0 ? property.images.length - 1 : (activeImages[property.id] || 0) - 1;
        renderProperties();
      }

      if (nextButton) {
        activeImages[property.id] = (activeImages[property.id] || 0) === property.images.length - 1 ? 0 : (activeImages[property.id] || 0) + 1;
        renderProperties();
      }

      if (thumbButton) {
        activeImages[property.id] = Number(thumbButton.dataset.thumbIndex);
        renderProperties();
      }

      if (expandImage) {
        openLightbox(property, activeImages[property.id] || 0);
      }
    });
  }

  async function init() {
    if (!listElement) return;
    properties = await PropertyStorage.listProperties();
    setupFilters();
    setupCardActions();
    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", () => showLightboxImage("prev"));
    lightboxNext.addEventListener("click", () => showLightboxImage("next"));
    lightboxDots.addEventListener("click", (event) => {
      const dot = event.target.closest("[data-lightbox-dot]");
      if (!dot) return;

      lightboxIndex = Number(dot.dataset.lightboxDot);
      renderLightboxImage();
    });
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    renderProperties();
  }

  return { init };
})();

RealEstatePage.init();

