// Gera o site estático: index.html, projetos/index.html e projetos/<slug>.html
// Uso: node src/build.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projetos } from './projetos.mjs';
import { paginasLegais } from './legal.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = {
  nome: 'Nexo Projetos',
  email: 'projetos@nexoprojetosdesign.com.br',
  descricao: 'Projetos, sistemas e operações para empresas e órgãos públicos: BPO financeiro, cestas de preços, plataformas digitais e gestão de projetos.'
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = n => String(n).padStart(2, '0');
const statusLabel = p => p.statusTexto || (p.status === 'andamento' ? 'Em andamento' : 'Em operação');

// Logo: assets/logo-nexo.png (fundo claro) e assets/logo-nexo-branca.png (fundo escuro).


const icon = {
  arrow: '<svg class="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  left: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
  right: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>',
  chart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>',
  gov: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M2 10l10-6 10 6"/></svg>',
  code: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 10l-2 2 2 2M15 10l2 2-2 2"/></svg>',
  flag: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21V4M4 4h12l-2 4 2 4H4"/></svg>',
  mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  pin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  clock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/></svg>',
  book: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5"/></svg>',
  doc: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
  play: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z"/></svg>'
};

// Mini telas que dão a prévia de cada projeto nos cards.
function preview(tipo, nome) {
  const top = (t, s) => `<div class="mock-top"><b>${t}</b><small>${s}</small></div>`;
  switch (tipo) {
    case 'bpo':
      return `${top('Fluxo de caixa', 'Próximas 8 semanas')}
        <div class="mock-kpis"><div><small>A receber</small><b>R$ 184 mil</b></div><div><small>A pagar</small><b>R$ 121 mil</b></div><div><small>Saldo</small><b>R$ 63 mil</b></div></div>
        <div class="mock-bars">${[46, 62, 38, 74, 58, 88, 66, 92].map((h, i) => `<i class="${i > 4 ? 'hi' : ''}" style="height:${h}%"></i>`).join('')}</div>`;
    case 'cestas':
      return `${top('Cesta de preços', 'Fontes: PNCP · Compras.gov')}
        <div class="mock-table">
          <div><span>Item</span><span>Fontes</span><span>Mediana</span></div>
          <div><span>Papel A4 75g</span><span>12</span><span>R$ 24,90</span></div>
          <div><span>Toner HP 85A</span><span>9</span><span>R$ 189,00</span></div>
          <div><span>Cadeira giratória</span><span>7</span><span>R$ 612,40</span></div>
          <div><span>Álcool 70% 1L</span><span>15</span><span>R$ 8,75</span></div>
        </div>`;
    case 'licitacoes':
      return `${top('Análise do edital', 'Pregão eletrônico')}
        <div class="mock-flow">
          <div class="mock-step done"><i>✓</i>Requisitos de habilitação<span class="mock-line"></span></div>
          <div class="mock-step done"><i>✓</i>Prazos e riscos<span class="mock-line"></span></div>
          <div class="mock-step"><i>!</i>Certidão vencida<span class="mock-line" style="background:#f6dfb0"></span></div>
          <div class="mock-step done"><i>✓</i>Veredito: viável<span class="mock-line"></span></div>
        </div>`;
    case 'bndes':
      return `${top('Parecer técnico', 'Regras DUT/ANS')}
        <div class="mock-table">
          <div><span>Guia</span><span>Critério</span><span>Parecer</span></div>
          <div><span>Ressonância magnética</span><span>Atendido</span><span>Aprovação</span></div>
          <div><span>Cirurgia de joelho</span><span>Pendente</span><span>Laudo</span></div>
          <div><span>Exame genético</span><span>Não atendido</span><span>Glosa</span></div>
          <div><span>Fisioterapia</span><span>Atendido</span><span>Aprovação</span></div>
        </div>`;
    case 'controles':
      return `${top('Teste de efetividade', 'Controles SOx')}
        <div class="mock-gauge"><div class="mock-ring" style="background:conic-gradient(var(--brand) 0 72%,#8cb4e6 72% 90%,#dde4f0 90% 100%)"><span>72%</span></div>
        <div class="mock-legend"><div>Conforme · 72%</div><div>Exceção, com evidência · 18%</div><div>Inconclusivo, para revisão · 10%</div></div></div>`;
    case 'gov':
      return `${top('Painel do órgão', 'Módulos ativos')}
        <div class="mock-grid">${['Diário Oficial', 'Transparência', 'PNCP', 'Cesta de preços', 'Ouvidoria', 'Protocolo'].map((m, i) => `<div class="${i < 4 ? 'on' : ''}"><i></i><small style="font-size:10px;font-weight:600">${m}</small></div>`).join('')}</div>`;
    default:
      return `${top(nome, '')}<div class="mock-line"></div>`;
  }
}

function card(p, base) {
  return `<article class="p-card">
      <div class="preview" aria-hidden="true">${preview(p.preview, p.nome)}</div>
      <div class="body">
        <div class="meta"><span class="status ${p.status}">${statusLabel(p)}</span><span>${esc(p.setor)}</span></div>
        <h3>${esc(p.nome)}</h3>
        <p>${esc(p.resumo)}</p>
        <a class="more" href="${base}projetos/${p.slug}.html#topo">Ver projeto ${icon.arrow}<span class="sr-only"> ${esc(p.nome)}</span></a>
      </div>
    </article>`;
}

const ctaCard = base => `<article class="p-card cta-card">
      <span class="status andamento" style="background:rgba(255,255,255,.16);color:#fff">Próximo projeto</span>
      <div><h3>O próximo pode ser o seu.</h3><p style="color:rgba(255,255,255,.8);margin-top:12px">Conte o que você precisa resolver e a gente desenha o projeto com você.</p></div>
      <a class="more" href="${base}index.html#contato">Falar com a Nexo ${icon.arrow}</a>
    </article>`;

function layout({ title, description, base, current, body }) {
  const nav = [
    ['Projetos', `${base}projetos/index.html`, 'projetos'],
    ['Soluções', `${base}index.html#solucoes`, 'solucoes'],
    ['Recursos', `${base}index.html#recursos`, 'recursos'],
    ['Empresa', `${base}index.html#empresa`, 'empresa'],
    ['Contato', `${base}index.html#contato`, 'contato']
  ];
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <link rel="icon" href="${base}assets/favicon.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${base}assets/styles.css">
  <style>.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}</style>
</head>
<body>
  <span id="topo"></span>
  <a class="sr-only" href="#conteudo">Pular para o conteúdo</a>
  <header class="site-header">
    <nav class="wrap nav" aria-label="Principal">
      <a class="logo" href="${base}index.html" aria-label="${SITE.nome}, página inicial"><img src="${base}assets/logo-nexo.png" alt="Nexo" width="98" height="30"></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-label="Abrir menu"><span></span></button>
      <ul class="nav-links">
        ${nav.map(([l, h, k]) => `<li><a href="${h}"${current === k ? ' aria-current="page"' : ''}>${l}</a></li>`).join('\n        ')}
      </ul>
      <div class="nav-cta">
        <a class="btn btn-primary" href="${base}index.html#contato">Fale com a gente</a>
      </div>
    </nav>
  </header>
  <main id="conteudo">
${body}
  </main>
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <a class="logo" href="${base}index.html" aria-label="${SITE.nome}"><img src="${base}assets/logo-nexo-branca.png" alt="Nexo" width="98" height="30"></a>
          <p style="max-width:320px">Projetos, sistemas e operações que fazem empresas e órgãos públicos funcionarem melhor.</p>
        </div>
        <div><h4>Projetos</h4><ul>${projetos.map(p => `<li><a href="${base}projetos/${p.slug}.html#topo">${esc(p.nome)}</a></li>`).join('')}</ul></div>
        <div><h4>Soluções</h4><ul><li><a href="${base}index.html#solucoes">BPO e finanças</a></li><li><a href="${base}index.html#solucoes">Setor público</a></li><li><a href="${base}index.html#solucoes">IA e automação</a></li><li><a href="${base}index.html#solucoes">Sistemas sob medida</a></li></ul></div>
        <div><h4>Recursos</h4><ul><li><a href="${base}index.html#recursos">Guias</a></li><li><a href="${base}index.html#faq">Perguntas frequentes</a></li></ul></div>
        <div><h4>Empresa</h4><ul><li><a href="${base}index.html#empresa">Sobre a Nexo</a></li><li><a href="${base}index.html#contato">Contato</a></li><li><a href="mailto:${SITE.email}">${SITE.email}</a></li></ul></div>
      </div>
      <div class="footer-bottom"><span>© <span data-year>2026</span> Nexo Projetos e Mídias Digitais LTDA</span><nav class="footer-legal" aria-label="Documentos legais"><a href="${base}termos-de-uso/index.html">Termos de uso</a><a href="${base}privacy-policy/index.html">Política de privacidade</a></nav></div>
    </div>
  </footer>
  <script src="${base}assets/main.js" defer></script>
</body>
</html>
`;
}

// ---------- Home ----------
const nOper = projetos.filter(p => p.status === 'operacao').length;
const nAnd = projetos.filter(p => p.status === 'andamento').length;

const solucoes = [
  [icon.chart, 'BPO e finanças', 'Operamos o financeiro da sua empresa com processo, rotina e relatórios claros.', ['Contas a pagar e receber', 'Conciliação', 'Fluxo de caixa', 'Relatórios']],
  [icon.gov, 'Setor público', 'Ferramentas para compras públicas, transparência e serviços digitais, dentro da lei.', ['Lei 14.133', 'Cestas de preços', 'PNCP', 'LGPD']],
  [icon.code, 'IA e automação', 'Leitura e conferência de documentos com IA, motores de regras auditáveis e fluxos automatizados.', ['IA multimodal', 'Motor de regras', 'n8n e webhooks', 'Trilha de auditoria']],
  [icon.flag, 'Sistemas sob medida', 'Plataformas web, e-commerce e painéis de gestão desenhados para o seu processo.', ['Plataformas web', 'E-commerce', 'Integrações', 'Painéis']]
];

const faq = [
  ['Que tipo de cliente a Nexo atende?', 'Indústrias, comércios, profissionais liberais e empresas de tecnologia, além do setor público, como prefeituras, câmaras e conselhos. Também apresentamos soluções em desafios de inovação aberta, como o do BNDES Saúde.'],
  ['A Nexo desenvolve sistemas ou presta serviço?', 'Os dois. Temos plataformas próprias, como a NEXO Preços e o NEXO Gov, e também operamos rotinas para o cliente, como no BPO Financeiro.'],
  ['As soluções para o setor público seguem a Lei 14.133?', 'Sim. A NEXO Preços foi feita para a pesquisa de preços prevista na Lei 14.133/2021, com fontes oficiais como o PNCP e o Compras.gov.'],
  ['Como funciona o início de um projeto?', 'Começamos com uma conversa para entender o problema. Depois fazemos um diagnóstico, apresentamos a proposta com etapas e prazos, e só então iniciamos a execução.'],
  ['Os dados ficam seguros?', 'Trabalhamos de acordo com a LGPD, com controle de acesso por perfil, autenticação em dois fatores e registro das ações nos sistemas.']
];

const home = layout({
  title: `${SITE.nome} · Projetos, sistemas e operações`,
  description: SITE.descricao,
  base: '',
  current: '',
  body: `
    <section class="hero">
      <div class="wrap hero-grid">
        <div class="reveal">
          <span class="eyebrow">Nexo Projetos</span>
          <h1>Projetos que <em>funcionam</em> do papel ao dia a dia.</h1>
          <p class="lead">Desenhamos, construímos e operamos soluções para empresas e órgãos públicos. Do financeiro terceirizado às plataformas de compras públicas.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#projetos">Ver projetos ${icon.arrow}</a>
            <a class="btn btn-ghost" href="#contato">Fale com a gente</a>
          </div>
          <div class="hero-stats">
            <div><strong>${pad(nOper)}</strong><span>projetos em operação</span></div>
            <div><strong>${pad(nAnd)}</strong><span>em andamento</span></div>
            <div><strong>${pad(solucoes.length)}</strong><span>frentes de atuação</span></div>
          </div>
        </div>
        <div class="hero-visual reveal" aria-hidden="true">
          <div class="float-card main">
            <div class="fc-head"><div><div class="fc-title">Cesta de preços</div><div class="fc-sub">Pregão 014/2026 · 4 itens</div></div><span class="pill">Concluída</span></div>
            ${preview('cestas').replace(/^[\s\S]*?<\/div>/, '')}
          </div>
          <div class="float-card side">
            <div class="fc-head" style="margin-bottom:12px"><div class="fc-title" style="font-size:14px">Fluxo de caixa</div><span class="pill">+12%</span></div>
            <div class="mock-bars" style="height:80px">${[40, 55, 48, 70, 64, 86].map((h, i) => `<i class="${i > 3 ? 'hi' : ''}" style="height:${h}%"></i>`).join('')}</div>
          </div>
          <div class="float-card tag"><span class="dot-icon">${icon.shield}</span><div><div class="fc-title" style="font-size:14px">Conforme a Lei 14.133</div><div class="fc-sub">Fontes oficiais e memória de cálculo</div></div></div>
        </div>
      </div>
    </section>

    <section class="strip" aria-label="Onde atuamos">
      <div class="wrap strip-inner">
        <span class="strip-label">Soluções para desafios e setores como</span>
        <div class="strip-items"><span>BNDES Saúde</span><span>Setor elétrico</span><span>Prefeituras</span><span>Licitações públicas</span><span>Indústria e comércio</span></div>
      </div>
    </section>

    <section class="section projects" id="projetos">
      <div class="wrap">
        <div class="section-head reveal">
          <div><span class="eyebrow">Projetos</span><h2>O que já está rodando, e o que vem por aí.</h2></div>
          <p>Clique em um projeto para ver o desafio, a solução e o que foi entregue.</p>
        </div>
        <div class="p-grid">
          ${projetos.map(p => card(p, '')).join('\n          ')}
          ${ctaCard('')}
        </div>
      </div>
    </section>

    <section class="section" id="solucoes">
      <div class="wrap">
        <div class="section-head reveal">
          <div><span class="eyebrow">Soluções</span><h2>Quatro frentes, um mesmo jeito de trabalhar.</h2></div>
          <p>Cada solução nasce de um problema real de um cliente, e vira processo para os próximos.</p>
        </div>
        <div class="solutions-grid">
          ${solucoes.map(([ic, t, d, tags]) => `<article class="s-card reveal"><span class="icon">${ic}</span><h3>${t}</h3><p>${d}</p><ul>${tags.map(x => `<li>${x}</li>`).join('')}</ul></article>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">Como trabalhamos</span><h2>Do diagnóstico à operação.</h2></div></div>
        <div class="steps">
          <div class="step reveal"><h3>Diagnóstico</h3><p>Entendemos o problema, o processo atual e o que precisa mudar.</p></div>
          <div class="step reveal"><h3>Desenho</h3><p>Proposta com escopo, etapas, prazos e o que será entregue em cada uma.</p></div>
          <div class="step reveal"><h3>Construção</h3><p>Desenvolvemos e validamos cada etapa com a sua equipe.</p></div>
          <div class="step reveal"><h3>Operação</h3><p>Colocamos para rodar, acompanhamos os indicadores e ajustamos.</p></div>
        </div>
      </div>
    </section>

    <section class="section" id="recursos" style="padding-top:0">
      <div class="wrap">
        <div class="section-head reveal">
          <div><span class="eyebrow">Recursos</span><h2>Conteúdo para quem decide.</h2></div>
          <p>Guias práticos sobre compras públicas, gestão financeira e projetos.</p>
        </div>
        <div class="resources-grid">
          <article class="r-card reveal"><div class="thumb">${icon.book}</div><div class="body"><small>Guia · Setor público</small><h3>Pesquisa de preços na Lei 14.133</h3><p>O que a lei exige, quais fontes usar e como montar a cesta passo a passo.</p></div></article>
          <article class="r-card reveal"><div class="thumb alt">${icon.doc}</div><div class="body"><small>Checklist · Finanças</small><h3>Quando terceirizar o financeiro</h3><p>Sinais de que a sua empresa ganharia com um BPO financeiro.</p></div></article>
          <article class="r-card reveal"><div class="thumb gold">${icon.play}</div><div class="body"><small>Demonstração · NEXO Preços</small><h3>Uma cesta de preços em minutos</h3><p>Veja como a plataforma busca, calcula e gera o relatório.</p></div></article>
        </div>
      </div>
    </section>

    <section class="section company" id="empresa">
      <div class="wrap company-grid">
        <div class="reveal">
          <span class="eyebrow">Empresa</span>
          <h2>Gestão, tecnologia e processo no mesmo time.</h2>
          <p class="lead">A Nexo Projetos foi constituída em 2024, mas a história começa antes. O fundador foi pioneiro no desenvolvimento de sites e e-commerce no Brasil e passou anos construindo, em modelo white-label, a base de software de projetos vendidos por outras empresas.</p>
          <p class="lead" style="margin-top:16px">Hoje a Nexo assina as próprias soluções: sistemas sob medida, automação de processos com IA e plataformas digitais para empresas privadas e órgãos públicos.</p>
        </div>
        <div class="values">
          <div class="value reveal"><span class="dot-icon">${icon.flag}</span><div><h3>Foco no resultado</h3><p>Cada projeto tem metas claras e é medido por elas.</p></div></div>
          <div class="value reveal"><span class="dot-icon">${icon.shield}</span><div><h3>Conformidade de verdade</h3><p>Lei 14.133, LGPD e acessibilidade pensadas desde o início.</p></div></div>
          <div class="value reveal"><span class="dot-icon">${icon.clock}</span><div><h3>Perto do cliente</h3><p>Atendimento direto, com quem conhece o seu projeto.</p></div></div>
        </div>
      </div>
    </section>

    <section class="section" id="faq">
      <div class="wrap faq-grid">
        <div class="reveal"><span class="eyebrow">Perguntas frequentes</span><h2 style="font-size:clamp(32px,4.2vw,52px);margin-top:14px">Antes de conversar.</h2></div>
        <div class="faq-list">
          ${faq.map(([q, a], i) => `<details class="faq-item"${i === 0 ? ' open' : ''}><summary>${q}</summary><p>${a}</p></details>`).join('\n          ')}
        </div>
      </div>
    </section>

    ${contato('')}`
});

function contato(base = '') {
  return `<section class="cta" id="contato">
      <div class="wrap">
        <div class="cta-box">
          <div>
            <span class="eyebrow">Contato</span>
            <h2>Vamos tirar o seu projeto do papel?</h2>
            <p>Conte o que você precisa. A gente responde em até um dia útil com os próximos passos.</p>
            <ul class="contact-list">
              <li>${icon.mail}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
              <li>${icon.pin}Atendimento em todo o Brasil</li>
            </ul>
          </div>
          <form class="form" data-contact-form data-to="${SITE.email}" novalidate>
            <div class="row">
              <label for="f-nome">Nome<input id="f-nome" name="nome" required maxlength="120" autocomplete="name"></label>
              <label for="f-email">E-mail<input id="f-email" name="email" type="email" required maxlength="160" autocomplete="email"></label>
            </div>
            <div class="row">
              <label for="f-empresa">Empresa ou órgão<input id="f-empresa" name="empresa" maxlength="160" autocomplete="organization"></label>
              <label for="f-telefone">Telefone ou WhatsApp<input id="f-telefone" name="telefone" type="tel" maxlength="40" autocomplete="tel"></label>
            </div>
            <label for="f-assunto">Assunto<select id="f-assunto" name="assunto"><option>Novo projeto</option><option>BPO Financeiro</option><option>Cestas de Preços</option><option>NEXO Gov</option><option>IA e automação</option><option>Outro assunto</option></select></label>
            <label for="f-mensagem">Mensagem<textarea id="f-mensagem" name="mensagem" required maxlength="5000"></textarea></label>
            <label class="hp" aria-hidden="true">Site<input name="site" tabindex="-1" autocomplete="off"></label>
            <button class="btn btn-primary" type="submit">Enviar mensagem ${icon.arrow}</button>
            <p class="form-status" role="status" aria-live="polite" hidden></p>
            <p class="form-note">Respondemos em até um dia útil. Seus dados são usados só para responder ao contato, conforme a <a href="${base}privacy-policy/index.html">Política de privacidade</a>.</p>
          </form>
        </div>
      </div>
    </section>`;
}

// ---------- Página de cada projeto ----------
function paginaProjeto(p, i) {
  const base = '../';
  const prox = projetos[(i + 1) % projetos.length];
  const ant = projetos[(i - 1 + projetos.length) % projetos.length];
  return layout({
    title: `${p.nome} · ${SITE.nome}`,
    description: p.resumo,
    base,
    current: 'projetos',
    body: `
    <section class="p-hero">
      <div class="wrap">
        <nav class="crumbs" aria-label="Caminho"><a href="${base}index.html">Início</a><span>/</span><a href="${base}projetos/index.html">Projetos</a><span>/</span><span aria-current="page">${esc(p.nome)}</span></nav>
        <div style="margin-top:28px"><span class="status ${p.status}" style="background:${p.status === 'andamento' ? '#fdf3df' : 'var(--brand-soft)'};color:${p.status === 'andamento' ? '#8a5a00' : 'var(--brand-strong)'}">${statusLabel(p)}</span></div>
        <h1>${esc(p.nome)}</h1>
        <p class="lead">${esc(p.chamada)}</p>
        ${p.aviso ? `<p class="p-note">${esc(p.aviso)}</p>` : ''}
        <div class="p-facts">
          <div><small>Cliente</small><b>${esc(p.fatos.cliente)}</b></div>
          <div><small>Setor</small><b>${esc(p.setor)}</b></div>
          <div><small>Modelo</small><b>${esc(p.fatos.modelo)}</b></div>
          <div><small>Entrega</small><b>${esc(p.fatos.entrega)}</b></div>
        </div>
        <div class="p-showcase"><div class="preview" aria-hidden="true">${preview(p.preview, p.nome)}</div></div>
      </div>
    </section>

    <div class="wrap p-body">
      <aside class="p-toc" aria-label="Nesta página">
        <a href="#desafio">O desafio</a><a href="#solucao">A solução</a><a href="#entregas">Entregas</a><a href="#tecnologia">Base técnica</a>
      </aside>
      <div>
        <section class="p-section" id="desafio"><span class="eyebrow">O desafio</span><h2 style="margin-top:12px">O problema que resolvemos</h2>${p.desafio.map(t => `<p>${esc(t)}</p>`).join('')}</section>
        <section class="p-section" id="solucao"><span class="eyebrow">A solução</span><h2 style="margin-top:12px">Como a Nexo resolveu</h2>${p.solucao.map(t => `<p>${esc(t)}</p>`).join('')}
          <div class="feature-list">${p.recursos.map(([t, d]) => `<div class="feature"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>
        </section>
        <section class="p-section" id="entregas"><span class="eyebrow">Entregas</span><h2 style="margin-top:12px">O que foi entregue</h2><ul class="check-list">${p.entregas.map(t => `<li>${esc(t)}</li>`).join('')}</ul></section>
        <section class="p-section" id="tecnologia"><span class="eyebrow">Base técnica</span><h2 style="margin-top:12px">Normas e tecnologias</h2><div class="tags">${p.tecnologias.map(t => `<span>${esc(t)}</span>`).join('')}</div></section>
      </div>
    </div>

    <section class="next-projects">
      <div class="wrap next-grid">
        <a class="next-card" href="${ant.slug}.html#topo"><div><small>Projeto anterior</small><h3>${esc(ant.nome)}</h3></div><span class="arrow-circle">${icon.left}</span></a>
        <a class="next-card" href="${prox.slug}.html#topo"><div><small>Próximo projeto</small><h3>${esc(prox.nome)}</h3></div><span class="arrow-circle">${icon.right}</span></a>
      </div>
    </section>

    ${contato('../')}`
  });
}

// ---------- Todos os projetos ----------
const todos = layout({
  title: `Projetos · ${SITE.nome}`,
  description: 'Todos os projetos da Nexo Projetos, em operação e em andamento.',
  base: '../',
  current: 'projetos',
  body: `
    <section class="all-wrap">
      <div class="wrap" style="padding-top:72px">
        <nav class="crumbs" aria-label="Caminho" style="color:rgba(255,255,255,.6)"><a href="../index.html">Início</a><span>/</span><span aria-current="page">Projetos</span></nav>
        <span class="eyebrow" style="color:#8cc2ef;margin-top:28px">Projetos</span>
        <h1 style="font-size:clamp(40px,6vw,72px);font-weight:800;margin:16px 0 18px">Nosso portfólio.</h1>
        <p class="lead" style="color:rgba(255,255,255,.7);max-width:640px">${nOper} projetos em operação e ${nAnd} em andamento. Clique em um card para ver os detalhes.</p>
        <div class="p-grid all-grid">
          ${projetos.map(p => card(p, '../')).join('\n          ')}
          ${ctaCard('../')}
        </div>
      </div>
    </section>`
});

// ---------- Páginas legais ----------
function inline(t) {
  return esc(t)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+@[^`]+)`/g, '<a href="mailto:$1">$1</a>')
    .replace(/`([^`]+)`/g, '<b>$1</b>');
}
function markdown(md) {
  const out = []; let list = null;
  const close = () => { if (list) { out.push(list.html + (list.sub ? '</ul></li>' : '</li>') + `</${list.tag}>`); list = null; } };
  for (const raw of md.trim().split('\n')) {
    const line = raw.replace(/\s+$/, '');
    let m;
    if (!line.trim()) { close(); continue; }
    if ((m = line.match(/^## (.+)/))) { close(); out.push(`<h2>${inline(m[1])}</h2>`); continue; }
    if ((m = line.match(/^  - (.+)/)) && list) {
      if (!list.sub) { list.html += '<ul>'; list.sub = true; }
      list.html += `<li>${inline(m[1])}</li>`; continue;
    }
    if ((m = line.match(/^(-|1\.) (.+)/))) {
      const tag = m[1] === '-' ? 'ul' : 'ol';
      if (list && list.tag !== tag) close();
      if (!list) list = { tag, html: `<${tag}>`, first: true, sub: false };
      else list.html += list.sub ? '</ul></li>' : '</li>';
      list.sub = false; list.html += `<li>${inline(m[2])}`; continue;
    }
    close(); out.push(`<p>${inline(line)}</p>`);
  }
  close();
  return out.join('\n          ');
}
function paginaLegal(pg) {
  return layout({
    title: `${pg.titulo} · ${SITE.nome}`,
    description: `${pg.titulo} do site da ${SITE.nome}.`,
    base: '../',
    current: '',
    body: `
    <section class="p-hero">
      <div class="wrap">
        <nav class="crumbs" aria-label="Caminho"><a href="../index.html">Início</a><span>/</span><span aria-current="page">${esc(pg.titulo)}</span></nav>
        <h1 style="font-size:clamp(36px,5vw,56px)">${esc(pg.titulo)}</h1>
        <p class="lead">Última atualização: ${esc(pg.atualizacao)}</p>
      </div>
    </section>
    <section class="wrap">
      <article class="legal">
          ${markdown(pg.texto)}
      </article>
    </section>`
  });
}

mkdirSync(join(root, 'projetos'), { recursive: true });
writeFileSync(join(root, 'index.html'), home);
writeFileSync(join(root, 'projetos/index.html'), todos);
projetos.forEach((p, i) => writeFileSync(join(root, `projetos/${p.slug}.html`), paginaProjeto(p, i)));
paginasLegais.forEach(pg => { mkdirSync(join(root, pg.pasta), { recursive: true }); writeFileSync(join(root, `${pg.pasta}/index.html`), paginaLegal(pg)); });
console.log(`Gerado: index.html, projetos/index.html, ${projetos.length} páginas de projeto e ${paginasLegais.length} páginas legais.`);
