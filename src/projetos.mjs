// Conteúdo dos projetos. Cada item gera um card na home e uma página em /projetos/<slug>.html.
// Para incluir um projeto novo, copie um bloco, troque o slug e rode `node src/build.mjs`.
// status: "operacao" (em operação) ou "andamento" (em andamento)
// statusTexto (opcional): troca o rótulo do status, por exemplo "MVP funcional"
// preview: tipo da mini tela do card: "bpo", "cestas", "licitacoes", "bndes", "cemig", "gov"

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
    slug: 'licitacoes-com-ia',
    nome: 'Licitações com IA',
    setor: 'Compras públicas',
    status: 'operacao',
    preview: 'licitacoes',
    resumo: 'Plataforma de gestão de licitações que lê editais com IA, confere a documentação da empresa e organiza prazos, resultados e comissões.',
    chamada: 'Leitura automática de editais e conferência de documentos para quem participa de licitações públicas.',
    fatos: { cliente: 'Consultoria especializada em licitações', modelo: 'Plataforma web com IA', entrega: 'Em operação' },
    desafio: [
      'Quem participa de licitações precisa ler editais longos, extrair requisitos de habilitação, prazos e riscos, e conferir se a empresa tem todos os documentos exigidos.',
      'Feito à mão, esse trabalho consome horas por edital e abre espaço para erros que custam a desclassificação.'
    ],
    solucao: [
      'A plataforma faz a análise automática do edital, com extração de requisitos, prazos, riscos e um veredito de viabilidade. Os documentos da empresa ficam num só lugar e passam por um checklist automático de conformidade contra as exigências de cada edital.'
    ],
    recursos: [
      ['Análise automática de editais', 'Requisitos de habilitação, prazos, riscos e veredito de viabilidade extraídos pela IA.'],
      ['Meus Documentos', 'Documentos da empresa organizados e conferidos contra cada edital, com checklist de conformidade.'],
      ['Agenda e acompanhamento', 'Prazos, licitações suspensas, resultados e comissões em um painel.'],
      ['Chat com o edital', 'Perguntas em linguagem natural sobre o conteúdo do edital.']
    ],
    entregas: ['Plataforma web em operação', 'Análise de editais com IA', 'Checklist automático de conformidade documental', 'Controle de resultados e comissões'],
    tecnologias: ['IA generativa', 'Leitura de PDFs', 'React e TypeScript', 'Supabase', 'n8n']
  },
  {
    slug: 'bndes',
    nome: 'Auditoria Clínica · BNDES',
    setor: 'Saúde suplementar',
    status: 'andamento',
    statusTexto: 'MVP funcional',
    preview: 'bndes',
    resumo: 'Plataforma de auditoria clínica que confere solicitações médicas contra as Diretrizes de Utilização da ANS e emite parecer técnico em tempo real.',
    chamada: 'Proposta da Nexo para o Desafio Inteligência de Dados em Saúde do BNDES (CPSI nº 001/2026): auditoria clínica automatizada com base nas regras DUT/ANS.',
    fatos: { cliente: 'BNDES Saúde (CPSI 001/2026)', modelo: 'Licenciamento SaaS', entrega: 'MVP pronto para prova de conceito' },
    desafio: [
      'A auditoria clínica costuma ser manual e lenta. Os auditores médicos precisam validar um grande volume de solicitações frente às Diretrizes de Utilização (DUT) da ANS, buscando evidências espalhadas no histórico de cada beneficiário.',
      'O resultado são filas de análise, risco de inconformidade regulatória e pouco tempo da equipe médica para os casos realmente complexos.'
    ],
    solucao: [
      'As regras DUT/ANS foram parametrizadas num motor de regras. A plataforma cruza a guia solicitada com a trilha assistencial do beneficiário, verifica os critérios de elegibilidade e emite um parecer técnico automatizado.',
      'Cada demanda é classificada como Aprovação Rápida, Solicitação de Laudo Complementar ou Glosa Técnica, e a equipe médica fica livre para as exceções de alta complexidade.'
    ],
    recursos: [
      ['Interface para auditores', 'Portais onde auditores e gestores veem as solicitações e os pareceres em tempo real.'],
      ['Motor de regras DUT/ANS', 'Regras desenhadas em fluxos visuais, que podem ser ajustadas sem reescrever o sistema.'],
      ['Dados com rastreabilidade', 'Histórico assistencial e documentos armazenados em nuvem, com registro de tudo.'],
      ['Alertas e integrações', 'Webhooks e APIs que avisam a equipe sobre gargalos, aprovações e glosas.']
    ],
    entregas: ['Setup e parametrização da infraestrutura', 'Motor de regras DUT/ANS', 'Painéis e alertas integrados', 'Operação assistida e treinamento da equipe médica'],
    tecnologias: ['DUT/ANS', 'Motor de regras', 'Workflows (n8n)', 'Webhooks e APIs', 'Banco em nuvem']
  },
  {
    slug: 'cemig',
    nome: 'NEXO Controles · CEMIG',
    setor: 'Energia · Auditoria SOx',
    status: 'andamento',
    statusTexto: 'Protótipo',
    preview: 'cemig',
    resumo: 'IA que executa os testes de efetividade dos controles SOx a partir das evidências e monitora a execução dos controles de forma contínua.',
    chamada: 'Proposta da Nexo para o Desafio 8 do Inova Cemig.Lab: automação dos testes de efetividade e do monitoramento contínuo dos controles SOx.',
    fatos: { cliente: 'Inova Cemig.Lab · Desafio 8', modelo: 'Plataforma com IA', entrega: 'Protótipo funcional (TRL 5)' },
    desafio: [
      'Os testes de efetividade operacional (TOE) dos controles SOx são feitos por amostragem, com apoio de contratos terceirizados, a partir de evidências em formatos muito diferentes: PDFs, planilhas, prints de tela do SAP e e-mails de aprovação.',
      'O processo é caro, demorado e não garante que a mesma regra seja aplicada sempre da mesma forma.'
    ],
    solucao: [
      'A IA lê a matriz de controles e o teste de desenho de cada controle e gera uma Ficha de Controle, que o auditor aprova uma vez. A partir daí, a plataforma coleta as evidências no SharePoint, executa o teste e classifica cada verificação como Conforme, Exceção ou Inconclusivo, sempre com justificativa e citação da evidência.',
      'Os casos inconclusivos vão para revisão humana. O teste deixa de ser por amostragem anual e passa a cobrir 100% da população, na frequência do próprio controle.'
    ],
    recursos: [
      ['Ficha de Controle', 'Objetivo, risco, frequência, responsável e critérios de exceção extraídos pela IA e aprovados pelo auditor.'],
      ['Leitura multimodal de evidências', 'PDFs, planilhas, imagens, prints de tela e logs, com vínculo à origem de cada dado.'],
      ['Papéis de trabalho automáticos', 'Passo a passo do teste, evidências referenciadas e conclusão, no modelo da Auditoria Interna.'],
      ['Monitoramento contínuo', 'Painel de controles executados, atrasados ou com exceção, com alertas aos responsáveis.']
    ],
    entregas: ['Protótipo funcional validado com dados simulados', 'Geração da Ficha de Controle', 'Execução do teste com exceções justificadas', 'Papel de trabalho gerado automaticamente'],
    tecnologias: ['SOx', 'IA multimodal', 'SharePoint / Microsoft Graph', 'React e TypeScript', 'Postgres', 'Trilha de auditoria imutável', 'LGPD']
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
