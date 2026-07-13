# Site público - Grupo Gomes & Rosiane

Este pacote contém apenas o site público.

## Arquivos principais

- `index.html`: página principal do site.
- `css/`: estilos separados por seção.
- `js/`: scripts do site, blog e imobiliária.
- `assets/`: logotipos e imagens SVG.
- `database/supabase.sql`: estrutura do banco Supabase.
- `vercel.json`: configuração simples para Vercel.

## Configurar Supabase

1. Crie um projeto em https://supabase.com.
2. Abra `SQL Editor`.
3. Execute o arquivo `database/supabase.sql`.
4. Vá em `Project Settings` > `API`.
5. Copie `Project URL` e `anon public key`.
6. Abra `js/config.js`.
7. Preencha:

```js
SUPABASE_URL: "https://seu-projeto.supabase.co",
SUPABASE_ANON_KEY: "sua-chave-anon"
```

## Hospedar na Vercel

1. Suba este pacote para um repositório GitHub.
2. Acesse https://vercel.com.
3. Clique em `Add New Project`.
4. Importe o repositório.
5. Não precisa configurar build command.
6. Publique.

Domínio atual de referência:

```txt
https://site-teste-mauve.vercel.app
```

## Hospedar na Hostinger

1. Acesse o painel da Hostinger.
2. Abra o gerenciador de arquivos.
3. Entre na pasta `public_html`.
4. Envie o conteúdo deste pacote para `public_html`.
5. Garanta que `index.html` fique diretamente dentro de `public_html`.
6. O arquivo `vercel.json` pode ficar no pacote, mas não é usado pela Hostinger.

## Integração com o CRM

O site lê publicações do blog e imóveis no mesmo Supabase usado pelo CRM.

No banco:

- Visitantes podem ler posts e imóveis.
- Apenas usuários autenticados no Supabase Auth podem criar, editar ou excluir dados pelo CRM.
