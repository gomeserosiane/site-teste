// Renderiza o blog público como carrossel de uma publicação por vez.
const BlogPage = (() => {
  const postsContainer = document.getElementById("blog-posts");
  const prevButton = document.querySelector("[data-blog-prev]");
  const nextButton = document.querySelector("[data-blog-next]");
  let posts = [];
  let activeIndex = 0;

  // Formata a data e hora no padrão brasileiro.
  function formatDate(dateValue) {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short"
    }).format(new Date(dateValue));
  }

  // Identifica se a mídia cadastrada é um vídeo para renderizar o elemento correto.
  function isVideoMedia(media) {
    return String(media || "").startsWith("data:video") || /\.(mp4|webm|ogg)$/i.test(String(media || ""));
  }

  // Monta a mídia principal do post, aceitando imagem ou vídeo importado pelo CRM.
  function createMediaMarkup(media, altText) {
    if (isVideoMedia(media)) {
      return `<video src="${media}" controls muted playsinline preload="metadata" aria-label="${altText}"></video>`;
    }

    return `<img src="${media}" alt="${altText}">`;
  }

  function createPostCard(post, index) {
    const article = document.createElement("article");
    article.className = `blog-card ${index === activeIndex ? "active" : ""}`;
    article.innerHTML = `
      ${createMediaMarkup(post.image, post.title)}
      <div class="blog-card-content">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <div class="blog-meta">
          <time datetime="${post.created_at}">
            <i data-lucide="calendar-clock"></i>
            ${formatDate(post.created_at)}
          </time>
          <a class="button button-light" href="${post.link_url || "#blog"}" target="_blank" rel="noopener">
            Saiba mais
          </a>
        </div>
      </div>
    `;
    return article;
  }

  function updateArrows() {
    if (!prevButton || !nextButton) return;

    prevButton.classList.toggle("hidden", activeIndex === 0 || posts.length <= 1);
    nextButton.classList.toggle("hidden", activeIndex === posts.length - 1 || posts.length <= 1);
  }

  function renderActivePost() {
    if (!postsContainer) return;
    postsContainer.innerHTML = "";

    if (!posts.length) {
      postsContainer.innerHTML = '<div class="empty-posts">Nenhuma publicação cadastrada no momento.</div>';
      updateArrows();
      return;
    }

    postsContainer.appendChild(createPostCard(posts[activeIndex], activeIndex));
    updateArrows();
    lucide.createIcons();
  }

  async function renderPosts() {
    if (!postsContainer) return;

    try {
      posts = await BlogStorage.listPosts();
      activeIndex = 0;
      renderActivePost();
    } catch (error) {
      postsContainer.innerHTML = '<div class="empty-posts">Não foi possível carregar as publicações agora.</div>';
    }
  }

  function setupControls() {
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        activeIndex = Math.max(activeIndex - 1, 0);
        renderActivePost();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        activeIndex = Math.min(activeIndex + 1, posts.length - 1);
        renderActivePost();
      });
    }
  }

  setupControls();
  return { renderPosts };
})();

BlogPage.renderPosts();

