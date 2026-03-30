
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.imovel-modal');
    if (!modal) return;

    const sliderImg = document.getElementById('sliderImage');
    const leftArrow = modal.querySelector('.slider-arrow.left');
    const rightArrow = modal.querySelector('.slider-arrow.right');
    const subtituloEl = document.getElementById('imovelSubtitulo');
    const desc1 = document.getElementById('imovelDescricao1');
    const desc2 = document.getElementById('imovelDescricao2');
    const desc3 = document.getElementById('imovelDescricao3');
    const closeBtn = modal.querySelector('.close-btn-imovel');
    const items = document.querySelectorAll('.imovel-item');
    const imovelButtons = modal.querySelector('.imovel-buttons');
    const indisponivelBtn = modal.querySelector('.btn-indisponivel-modal');

    const imoveis = {
        0: {
            subtitulo: 'Apartamento para alugar - Marambaia',
            descricoes: [
                'Com 1 quarto, sala, banheiro e 38 m² de área, este apartamento é ideal para quem busca praticidade e conforto.',
                'A região conta com infraestrutura estratégica, próxima a feiras, supermercados e farmácias, facilitando a rotina.',
                'Os acabamentos valorizam um ambiente moderno, funcional e bem iluminado.',
            ],
            imagens: [
                'images-imoveis/casa-marambaia-img1.png',
                'images-imoveis/casa-marambaia-img2.png',
                'images-imoveis/casa-marambaia-img3.png',
                'images-imoveis/casa-marambaia-img4.png',
                'images-imoveis/casa-marambaia-img5.png',
                'images-imoveis/casa-marambaia-img6.png',
            ],
            indisponivel: false,
        },
        1: {
            subtitulo: 'Casa para vender - Souza',
            descricoes: [
                'Boa localização, próxima a escolas, supermercados, farmácias e com fácil acesso ao transporte público.',
                'Conta com 2 quartos espaçosos, sala aconchegante, cozinha ampla em conceito aberto e banheiro arejado.',
                'Uma excelente oportunidade para quem quer morar bem ou investir em uma nova etapa com mais conforto.',
            ],
            imagens: ['images-imoveis/casa-souza-img1.png'],
            indisponivel: false,
        },
        2: {
            subtitulo: 'Ponto comercial - Pedreira',
            descricoes: [
                'Localizado em uma região movimentada, com área de 24,5 m² e 1 banheiro, pronto para atender diferentes perfis de negócio.',
                'A fachada favorece visibilidade comercial e ajuda a potencializar fluxo e presença local.',
                'No momento, este imóvel está indisponível para locação.',
            ],
            imagens: [
                'images-imoveis/ponto-comercial-pedreira-img1.png',
                'images-imoveis/ponto-comercial-pedreira-img2.png',
                'images-imoveis/ponto-comercial-pedreira-img3.png',
            ],
            indisponivel: true,
        },
        3: {
            subtitulo: 'Casa para alugar - Marambaia',
            descricoes: [
                'Localizada na Passagem Santa Marta, nº 7, Casa A, no bairro da Marambaia, em Belém.',
                'Endereço em frente ao supermercado Cidade da Marambaia, agregando conveniência ao dia a dia.',
                'Imóvel com 2 andares, 3 quartos sendo 1 suíte, 2 banheiros, sala de estar, cozinha e lavabo.',
            ],
            imagens: [
                'images-imoveis/casa marambaia pass sta marta.jpeg',
                'images-imoveis/casa marambaia pass sta marta2.jpeg',
                'images-imoveis/casa marambaia pass sta marta3.jpeg',
                'images-imoveis/casa marambaia pass sta marta4.jpeg',
                'images-imoveis/casa marambaia pass sta marta5.jpeg',
                'images-imoveis/casa marambaia pass sta marta6.jpeg',
                'images-imoveis/casa marambaia pass sta marta7.jpeg',
                'images-imoveis/casa marambaia pass sta marta8.jpeg',
                'images-imoveis/casa marambaia pass sta marta9.jpeg',
                'images-imoveis/casa marambaia pass sta marta10.jpeg',
                'images-imoveis/casa marambaia pass sta marta11.jpeg',
                'images-imoveis/casa marambaia pass sta marta12.jpeg',
                'images-imoveis/casa marambaia pass sta marta13.jpeg',
                'images-imoveis/casa marambaia pass sta marta14.jpeg',
                'images-imoveis/casa marambaia pass sta marta15.jpeg',
                'images-imoveis/casa marambaia pass sta marta16.jpeg',
            ],
            indisponivel: false,
        },
    };

    let imagensAtuais = [];
    let index = 0;

    const updateArrows = () => {
        leftArrow.style.display = index === 0 ? 'none' : 'flex';
        rightArrow.style.display = index === imagensAtuais.length - 1 ? 'none' : 'flex';
    };

    const renderCurrentImage = () => {
        sliderImg.src = imagensAtuais[index];
        sliderImg.alt = `Imagem do imóvel ${index + 1}`;
        updateArrows();
    };

    const openModal = (id) => {
        const imovel = imoveis[id];
        if (!imovel) return;

        imagensAtuais = imovel.imagens;
        index = 0;

        subtituloEl.textContent = imovel.subtitulo;
        desc1.textContent = imovel.descricoes[0] || '';
        desc2.textContent = imovel.descricoes[1] || '';
        desc3.textContent = imovel.descricoes[2] || '';

        if (imovel.indisponivel) {
            imovelButtons.style.display = 'none';
            indisponivelBtn.style.display = 'inline-flex';
        } else {
            imovelButtons.style.display = 'flex';
            indisponivelBtn.style.display = 'none';
        }

        renderCurrentImage();
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
    };

    items.forEach((item) => {
        item.addEventListener('click', () => {
            openModal(item.dataset.imovel);
        });
    });

    leftArrow.addEventListener('click', (event) => {
        event.stopPropagation();
        if (index <= 0) return; index -= 1; renderCurrentImage();
    }); rightArrow.addEventListener('click', (event) => {
        event.stopPropagation();
        if (index >= imagensAtuais.length - 1) return;
        index += 1;
        renderCurrentImage();
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (!modal.classList.contains('active')) return;
        if (event.key === 'Escape') closeModal();
        if (event.key === 'ArrowLeft' && index > 0) {
            index -= 1;
            renderCurrentImage();
        }
        if (event.key === 'ArrowRight' && index < imagensAtuais.length - 1) { index += 1; renderCurrentImage(); }
    });
});