# Site Nexo Projetos

Site institucional estático (HTML, CSS e JavaScript puros), sem dependências.

## Estrutura

- `index.html`: página inicial (gerada)
- `projetos/index.html`: todos os projetos (gerada)
- `projetos/<slug>.html`: página de detalhe de cada projeto (gerada)
- `assets/`: estilos, script, logo e favicon
- `src/projetos.mjs`: conteúdo de cada projeto (é aqui que se edita)
- `src/legal.mjs`: texto dos Termos de uso e da Política de privacidade
- `termos-de-uso/` e `privacy-policy/`: páginas legais (geradas), nos mesmos endereços do site anterior
- `src/build.mjs`: gera as páginas a partir do conteúdo

## Editar ou incluir um projeto

1. Abra `src/projetos.mjs` e edite o bloco do projeto, ou copie um bloco para criar um novo.
2. Rode `node src/build.mjs` (Node 18 ou mais recente).
3. Confira abrindo `index.html` no navegador e faça o commit das páginas geradas.

## Publicar

Qualquer hospedagem estática serve (Vercel, Netlify, GitHub Pages). Não há etapa de build obrigatória no servidor, porque as páginas geradas já ficam no repositório.

## Pendências

- O formulário de contato abre o e-mail do visitante. Para receber as mensagens direto, ligar a um serviço de formulários ou webhook.
