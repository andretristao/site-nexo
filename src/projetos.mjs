// Conteúdo dos projetos. Cada item gera um card na home e uma página em /projetos/<slug>.html.
// Para incluir um projeto novo, copie um bloco, troque o slug e rode `node src/build.mjs`.
// status: "operacao" (em operação) ou "andamento" (em andamento)
// preview: tipo da mini tela do card: "bpo", "cestas", "bndes", "cemig", "gov", "protocolo"

export const projetos = [
  {
    slug: 'bpo-financeiro',
    nome: 'BPO Financeiro',
    setor: 'Gestão financeira',
    status: 'operacao',
    preview: 'bpo',
    resumo: 'Rotina financeira terceirizada, com contas a pagar e a receber, conciliação e relatórios para decidir com números em dia.',
    chamada: 'O financeiro da sua empresa rodando todo dia, sem depender de planilhas soltas.',
    fatos: { cliente: 'Empresas de pequeno e médio porte', modelo: 'Serviço contínuo', entrega: 'Relatório mensal e painel' },
    desafio: [
      'Empresas em crescimento costumam ter o financeiro espalhado entre planilhas, extratos e mensagens. O resultado é caixa sem previsão, pagamentos atrasados e fechamentos que levam semanas.',
      'O desafio era montar uma operação que tirasse essa carga do dono do negócio sem perder o controle sobre o dinheiro.'
    ],
    solucao: [
      'A Nexo assume as rotinas financeiras do dia a dia com um processo padronizado e documentado, e entrega a informação pronta para decisão.'
    ],
    recursos: [
      ['Contas a pagar e a receber', 'Lançamento, agendamento e cobrança com calendário e alertas de vencimento.'],
      ['Conciliação bancária', 'Extratos conferidos com os lançamentos, com divergências apontadas na hora.'],
      ['Fluxo de caixa projetado', 'Visão das próximas semanas para antecipar falta ou sobra de caixa.'],
      ['Relatórios gerenciais', 'DRE gerencial e indicadores mensais em linguagem de negócio.']
    ],
    entregas: ['Processo financeiro mapeado e documentado', 'Rotina diária de lançamentos e conciliação', 'Fechamento mensal com relatório gerencial', 'Reunião mensal de resultados'],
    tecnologias: ['ERP do cliente', 'Integração bancária', 'Painéis gerenciais', 'Automação de rotinas']
  },
  {
    slug: 'cestas-de-precos',
    nome: 'Cestas de Preços',
    setor: 'Setor público',
    status: 'operacao',
    preview: 'cestas',
    resumo: 'Pesquisa de preços para compras públicas com fontes oficiais, cálculo automático e relatório pronto para o processo.',
    chamada: 'Pesquisa de preços conforme a Lei 14.133, com fontes oficiais e relatório pronto para anexar ao processo.',
    fatos: { cliente: 'Prefeituras, câmaras e órgãos públicos', modelo: 'Plataforma NEXO Preços', entrega: 'Relatório da cesta de preços' },
    desafio: [
      'A pesquisa de preços é uma das etapas mais trabalhosas da contratação pública. A equipe precisa reunir preços de várias fontes, descartar valores fora da curva e justificar tudo no processo.',
      'Feita à mão, essa etapa atrasa licitações e deixa o órgão exposto a questionamentos dos órgãos de controle.'
    ],
    solucao: [
      'A NEXO Preços busca preços homologados em fontes oficiais, como o PNCP e o Compras.gov, a partir do catálogo de materiais e serviços. A plataforma monta a cesta, aplica os critérios de cálculo e gera o relatório com a memória de cálculo.'
    ],
    recursos: [
      ['Busca em fontes oficiais', 'Preços de contratações publicadas no PNCP e no Compras.gov, inclusive de prefeituras da região.'],
      ['Catálogo CATMAT e CATSER', 'Itens padronizados para encontrar preços comparáveis com mais precisão.'],
      ['Cálculo da cesta', 'Média, mediana e menor preço, com descarte de valores inexequíveis ou excessivos.'],
      ['Relatório para o processo', 'Documento com fontes, datas e memória de cálculo, pronto para anexar.']
    ],
    entregas: ['Plataforma web com acesso por órgão e por equipe', 'Busca de preços por item do catálogo', 'Relatório da cesta em PDF', 'Treinamento da equipe de compras'],
    tecnologias: ['Lei 14.133/2021', 'PNCP', 'Compras.gov', 'CATMAT e CATSER', 'Supabase', 'React']
  },
  {
    slug: 'bndes',
    nome: 'BNDES',
    setor: 'Desenvolvimento econômico',
    status: 'operacao',
    preview: 'bndes',
    resumo: 'Projeto desenvolvido junto ao BNDES, com estruturação técnica, acompanhamento de etapas e prestação de contas organizada.',
    chamada: 'Estruturação e acompanhamento de projeto junto ao Banco Nacional de Desenvolvimento Econômico e Social.',
    fatos: { cliente: 'BNDES', modelo: 'Projeto com etapas', entrega: 'Documentação e acompanhamento' },
    desafio: [
      'Projetos com o BNDES exigem documentação técnica consistente, cronograma claro e prestação de contas a cada etapa.',
      'Era preciso organizar todas as frentes do projeto em um só lugar, com responsáveis e prazos visíveis para todos os envolvidos.'
    ],
    solucao: [
      'A Nexo estruturou o projeto em etapas com entregas definidas, centralizou a documentação e montou um acompanhamento que mostra o avanço físico e financeiro de cada fase.'
    ],
    recursos: [
      ['Estruturação técnica', 'Escopo, cronograma e plano de trabalho organizados conforme as exigências do banco.'],
      ['Gestão de etapas', 'Marcos, responsáveis e prazos acompanhados em um só painel.'],
      ['Prestação de contas', 'Relatórios de execução e documentos comprobatórios organizados por etapa.'],
      ['Comunicação com as partes', 'Reuniões e registros de decisões para manter todos alinhados.']
    ],
    entregas: ['Plano de trabalho e cronograma', 'Painel de acompanhamento de etapas', 'Relatórios de execução', 'Dossiê de prestação de contas'],
    tecnologias: ['Gestão de projetos', 'Painéis de acompanhamento', 'Gestão documental']
  },
  {
    slug: 'cemig',
    nome: 'CEMIG',
    setor: 'Energia',
    status: 'operacao',
    preview: 'cemig',
    resumo: 'Projeto para a CEMIG no setor de energia, com processos mapeados, indicadores de acompanhamento e entregas por etapa.',
    chamada: 'Projeto desenvolvido para a Companhia Energética de Minas Gerais, com foco em processo e indicadores.',
    fatos: { cliente: 'CEMIG', modelo: 'Projeto com etapas', entrega: 'Processos e indicadores' },
    desafio: [
      'Uma empresa do porte da CEMIG lida com muitas áreas, contratos e exigências regulatórias ao mesmo tempo.',
      'O projeto precisava dar clareza ao andamento das atividades e transformar dados operacionais em indicadores que apoiam a gestão.'
    ],
    solucao: [
      'A Nexo mapeou os processos envolvidos, definiu indicadores de acompanhamento e organizou as entregas em etapas validadas com a equipe da CEMIG.'
    ],
    recursos: [
      ['Mapeamento de processos', 'Fluxos documentados com responsáveis, entradas e saídas de cada etapa.'],
      ['Indicadores de gestão', 'Métricas definidas com a equipe e acompanhadas em painel.'],
      ['Entregas validadas', 'Cada fase revisada e aprovada antes de seguir para a próxima.'],
      ['Documentação técnica', 'Registro completo para consulta e continuidade do trabalho.']
    ],
    entregas: ['Mapa de processos', 'Painel de indicadores', 'Relatórios por etapa', 'Documentação técnica final'],
    tecnologias: ['Mapeamento de processos', 'Painéis de indicadores', 'Gestão de projetos']
  },
  {
    slug: 'nexo-gov',
    nome: 'NEXO Gov',
    setor: 'Setor público',
    status: 'andamento',
    preview: 'gov',
    resumo: 'Plataforma de serviços digitais para prefeituras, câmaras e conselhos: Diário Oficial, Transparência, Ouvidoria e mais, numa base só.',
    chamada: 'Uma base única de serviços digitais para órgãos públicos, segura, acessível e hospedada no Brasil.',
    fatos: { cliente: 'Prefeituras, câmaras e conselhos', modelo: 'Plataforma multi-órgão', entrega: 'Módulos por serviço' },
    desafio: [
      'Órgãos públicos costumam contratar um sistema para cada obrigação: Diário Oficial, Portal da Transparência, Ouvidoria, e-SIC, PNCP. Cada um com login, visual e suporte diferentes.',
      'Além disso, todos precisam cumprir LGPD, acessibilidade e trilha de auditoria.'
    ],
    solucao: [
      'O NEXO Gov reúne esses serviços numa base comum. Cada órgão tem seu espaço isolado, com perfis de acesso, autenticação em dois fatores e registro de tudo o que é feito.'
    ],
    recursos: [
      ['Módulos integrados', 'Diário Oficial, Transparência, PNCP, Cesta de preços e Ouvidoria/e-SIC.'],
      ['Segurança', 'Dados isolados por órgão, autenticação em dois fatores e trilha de auditoria que não pode ser alterada.'],
      ['Acessibilidade', 'Seguindo eMAG 3.1 e WCAG 2.1 AA, com alto contraste, fonte ajustável e VLibras.'],
      ['Hospedagem no Brasil', 'Banco de dados e funções hospedados em São Paulo, de acordo com a LGPD.']
    ],
    entregas: ['Base multi-órgão com perfis de acesso', 'Módulo de Protocolo e Processo Legislativo', 'Novos módulos em desenvolvimento', 'Implantação por órgão'],
    tecnologias: ['Next.js', 'Supabase', 'LGPD', 'eMAG 3.1', 'WCAG 2.1 AA']
  }
];
