
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('whatsappForm');
    if (!form) return;

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const whatsapp = document.getElementById('whatsapp');
    const assunto = document.getElementById('assunto');
    const botao = form.querySelector('.btn-enviar');
    const numeroEmpresa = '5591999635260';
    const botaoOriginal = botao.textContent;

    const onlyDigits = (value) => value.replace(/\D/g, '');

    const formatPhone = (value) => {
        const digits = onlyDigits(value).slice(0, 11);

        if (digits.length <= 2) return digits; if (digits.length <= 7) return `(${digits.slice(0, 2)})
            ${digits.slice(2)}`; if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2,
            7)}-${digits.slice(7)}`; return value;
    }; whatsapp.addEventListener('input', () => {
        whatsapp.value = formatPhone(whatsapp.value);
    });

    const validators = {
        nome: (value) => value.trim().length >= 3,
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
        whatsapp: (value) => onlyDigits(value).length >= 10,
        assunto: (value) => value.trim().length >= 8,
    };

    const fields = [nome, email, whatsapp, assunto];

    const validateField = (field) => {
        const isValid = validators[field.id](field.value);
        field.classList.toggle('error', !isValid);
        return isValid;
    };

    fields.forEach((field) => {
        field.addEventListener('input', () => validateField(field));
        field.addEventListener('blur', () => validateField(field));
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const isFormValid = fields.every((field) => validateField(field));
        if (!isFormValid) return;

        botao.classList.add('loading');
        botao.setAttribute('aria-busy', 'true');

        const mensagem = [
            '*Formulário de Contato - Grupo Gomes & Rosiane*',
            '',
            `*Nome completo:* ${nome.value.trim()}`,
            `*E-mail:* ${email.value.trim()}`,
            `*WhatsApp:* ${whatsapp.value.trim()}`,
            `*Assunto:* ${assunto.value.trim()}`,
        ].join('\n');

        const link = `https://wa.me/${numeroEmpresa}?text=${encodeURIComponent(mensagem)}`;

        setTimeout(() => {
            window.open(link, '_blank', 'noopener,noreferrer');
            botao.classList.remove('loading');
            botao.setAttribute('aria-busy', 'false');
            botao.textContent = botaoOriginal;
            form.reset();
            fields.forEach((field) => field.classList.remove('error'));
        }, 550);
    });
});