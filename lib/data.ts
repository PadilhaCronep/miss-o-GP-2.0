export type ContributionItem = {
  memberId: string;
  role: string;
  tasks: string[];
  hours: number;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  objective: string;
  category: string;
  status: string;
  featured: boolean;
  image: string;
  link: string;
  strategicObjectives: string[];
  functionalTags: string[];
  teamIds: string[];
  overview: {
    whatIsIt: string;
    problemSolved: string;
    teamIntention: string;
  };
  strategicContext: string;
  objectivesList: string[];
  detailedFeatures: Array<{
    name: string;
    description: string;
    strategicValue: string;
  }>;
  features: string[];
  architecture: string;
  politicalRole: string;
  stack: Record<string, string[]>;
  contributions: ContributionItem[];
  gallery: string[];
  metrics: Array<{
    label: string;
    value: string;
  }>;
  timeline: Array<{
    phase: string;
    description: string;
    status: 'completed' | 'current' | 'planned';
  }>;
  nextSteps: string[];
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  area: string;
  experience: string;
  bio: string;
  technologies: string[];
  badges: string[];
  projectIds: string[];
  hours: number;
  links: {
    github: string;
    linkedin: string;
    instagram: string;
  };
};

export const projects: Project[] = [
  {
    id: 'plataforma-missao',
    slug: 'plataforma-missao',
    title: 'Plataforma Missao',
    description:
      'Hub central para projetos politicos, recrutamento tech e operacao do laboratorio.',
    objective:
      'Unificar visibilidade publica, organizacao interna e captacao de voluntarios em um unico sistema.',
    category: 'Infraestrutura Politica',
    status: 'Em Desenvolvimento',
    featured: true,
    image: 'https://picsum.photos/seed/missao-plataforma/1200/700',
    link: 'https://missao.org',
    strategicObjectives: ['Governanca Digital', 'Mobilizacao'],
    functionalTags: ['interativo', 'timeline', 'dashboard'],
    teamIds: ['1', '2', '3'],
    overview: {
      whatIsIt:
        'Plataforma principal do laboratorio para comunicar projetos e operar processos internos de tecnologia.',
      problemSolved:
        'Antes havia informacoes dispersas entre planilhas e canais isolados, sem rastreabilidade.',
      teamIntention:
        'Criar uma base unica que sirva ao publico, ao time interno e ao ecossistema do Partido Missao.',
    },
    strategicContext:
      'Projeto estruturante para dar previsibilidade operacional e transformar iniciativas isoladas em capacidade institucional.',
    objectivesList: [
      'Centralizar informacoes de projetos e equipe',
      'Acelerar recrutamento de voluntarios',
      'Dar transparencia a entregas e impacto',
    ],
    detailedFeatures: [
      {
        name: 'Catalogo de Projetos',
        description:
          'Listagem completa com filtros por categoria, objetivo estrategico e tags funcionais.',
        strategicValue: 'Aumenta descoberta de cases e melhora comunicacao de resultados.',
      },
      {
        name: 'Painel Administrativo',
        description:
          'Ambiente interno para gerenciamento de leads, membros, categorias e configuracoes.',
        strategicValue: 'Organiza operacao e reduz dependencia de processos manuais.',
      },
      {
        name: 'Jornada de Voluntariado',
        description:
          'Fluxo de formulario em etapas para captar, qualificar e priorizar perfis tecnicos.',
        strategicValue: 'Eleva taxa de conversao e melhora qualidade dos leads.',
      },
    ],
    features: [
      'Filtros avancados de projetos',
      'Perfil detalhado de membros',
      'Painel administrativo modular',
    ],
    architecture:
      'Frontend em Next.js App Router, com separacao entre area publica e area administrativa, preparado para evolucao para APIs e persistencia.',
    politicalRole:
      'Fortalece autoridade tecnica da campanha e demonstra capacidade de execucao digital em escala.',
    stack: {
      frontend: ['Next.js', 'React', 'Tailwind CSS'],
      backend: ['Node.js', 'Next Route Handlers'],
      dados: ['Firestore', 'PostgreSQL (planejado)'],
      observabilidade: ['Sentry (planejado)', 'Logs estruturados (planejado)'],
    },
    contributions: [
      {
        memberId: '1',
        role: 'Tech Lead',
        tasks: ['Arquitetura da aplicacao', 'Padrao de componentes', 'Estrategia de dados'],
        hours: 160,
      },
      {
        memberId: '2',
        role: 'Product Designer',
        tasks: ['Sistema visual', 'Fluxos do painel admin', 'Design do recrutamento'],
        hours: 120,
      },
      {
        memberId: '3',
        role: 'Data Engineer',
        tasks: ['Modelo de leads', 'Estruturacao de metricas', 'Blueprint de banco'],
        hours: 90,
      },
    ],
    gallery: [
      'https://picsum.photos/seed/missao-gal-1/1400/900',
      'https://picsum.photos/seed/missao-gal-2/1400/900',
      'https://picsum.photos/seed/missao-gal-3/1400/900',
    ],
    metrics: [
      { label: 'Leads Capturados', value: '156' },
      { label: 'Projetos Catalogados', value: '24' },
      { label: 'Voluntarios Ativos', value: '48' },
      { label: 'Paginas Publicadas', value: '32' },
    ],
    timeline: [
      {
        phase: 'Discovery e Alinhamento',
        description: 'Definicao do escopo e arquitetura inicial.',
        status: 'completed',
      },
      {
        phase: 'MVP Publico e Admin',
        description: 'Implementacao de telas e fluxos principais.',
        status: 'current',
      },
      {
        phase: 'Persistencia e Automacao',
        description: 'APIs, banco real e automacoes operacionais.',
        status: 'planned',
      },
    ],
    nextSteps: [
      'Implementar backend de leads e formularios',
      'Adicionar autenticacao segura para admin',
      'Publicar modulo de contribuicoes com relatorios',
    ],
  },
  {
    id: 'voz-do-povo',
    slug: 'voz-do-povo',
    title: 'Voz do Povo',
    description:
      'Plataforma de escuta digital para consolidar sinais de redes e formularios em pautas acionaveis.',
    objective:
      'Transformar feedback social em inteligencia de comunicacao para respostas rapidas e precisas.',
    category: 'Inteligencia de Dados',
    status: 'MVP',
    featured: true,
    image: 'https://picsum.photos/seed/voz-povo/1200/700',
    link: '#',
    strategicObjectives: ['Escuta Ativa', 'Transparencia Politica'],
    functionalTags: ['visualizacao de dados', 'mapa politico', 'quiz'],
    teamIds: ['1', '3'],
    overview: {
      whatIsIt:
        'Sistema de consolidacao de sinais publicos para orientar prioridades de comunicacao e mobilizacao.',
      problemSolved:
        'Feedback da base chegava disperso, com baixa capacidade de analise e priorizacao.',
      teamIntention:
        'Dar leitura clara do territorio digital para orientar decisoes semanais da campanha.',
    },
    strategicContext:
      'Aumenta capacidade de resposta em janelas curtas e reduz risco de desalinhamento narrativo.',
    objectivesList: [
      'Consolidar entradas multicanal',
      'Mapear temas por prioridade',
      'Apoiar estrategia de conteudo',
    ],
    detailedFeatures: [
      {
        name: 'Painel de Temas Prioritarios',
        description: 'Agrupa assuntos por volume, urgencia e recorrencia.',
        strategicValue: 'Direciona energia da equipe para o que realmente importa.',
      },
      {
        name: 'Radar de Sentimento',
        description: 'Classifica sinais em favoravel, neutro e critico.',
        strategicValue: 'Permite acao preventiva em temas sensiveis.',
      },
      {
        name: 'Relatorios Semanais',
        description: 'Entrega sintese executiva para coordenacao politica.',
        strategicValue: 'Acelera tomadas de decisao baseadas em dados.',
      },
    ],
    features: ['Painel de temas', 'Radar de sentimento', 'Relatorio semanal'],
    architecture:
      'Pipeline de coleta, enriquecimento e visualizacao com foco em leitura operacional.',
    politicalRole:
      'Apoia estrategia de posicionamento e melhora aderencia da comunicacao ao territorio.',
    stack: {
      frontend: ['Next.js', 'Recharts'],
      backend: ['Node.js'],
      dados: ['Python', 'BigQuery (planejado)'],
      integracoes: ['APIs sociais (planejado)'],
    },
    contributions: [
      {
        memberId: '1',
        role: 'Fullstack Lead',
        tasks: ['Definicao de arquitetura', 'Pipeline inicial', 'Integracao de dashboard'],
        hours: 110,
      },
      {
        memberId: '3',
        role: 'Data Scientist',
        tasks: ['Modelo de sinal', 'Taxonomia de temas', 'Indicadores semanais'],
        hours: 140,
      },
    ],
    gallery: [
      'https://picsum.photos/seed/voz-gal-1/1400/900',
      'https://picsum.photos/seed/voz-gal-2/1400/900',
    ],
    metrics: [
      { label: 'Temas Monitorados', value: '320' },
      { label: 'Relatorios Gerados', value: '42' },
      { label: 'Acoes Disparadas', value: '87' },
      { label: 'Tempo Medio de Resposta', value: '6h' },
    ],
    timeline: [
      {
        phase: 'Modelagem de Dados',
        description: 'Definicao de campos e taxonomia de sinais.',
        status: 'completed',
      },
      {
        phase: 'Dashboard MVP',
        description: 'Entrega de visao consolidada para operacao.',
        status: 'current',
      },
      {
        phase: 'Automacoes de alerta',
        description: 'Notificacoes de temas criticos em tempo real.',
        status: 'planned',
      },
    ],
    nextSteps: [
      'Conectar novas fontes de dados',
      'Adicionar alertas por nivel de risco',
      'Criar trilha de auditoria para decisoes',
    ],
  },
  {
    id: 'sentinela-digital',
    slug: 'sentinela-digital',
    title: 'Sentinela Digital',
    description:
      'Projeto de monitoramento de risco informacional e defesa da infraestrutura digital.',
    objective:
      'Detectar sinais de desinformacao e proteger ativos digitais de campanha.',
    category: 'Seguranca e Confiabilidade',
    status: 'Prototipo',
    featured: false,
    image: 'https://picsum.photos/seed/sentinela-digital/1200/700',
    link: '#',
    strategicObjectives: ['Seguranca Digital', 'Confiabilidade Operacional'],
    functionalTags: ['monitoramento', 'alerta', 'timeline'],
    teamIds: ['1', '2'],
    overview: {
      whatIsIt:
        'Camada de observacao de riscos digitais, combinando sinais tecnicos e contexto comunicacional.',
      problemSolved:
        'Faltava visao integrada de incidentes, o que atrasava respostas da equipe.',
      teamIntention:
        'Construir capacidade de resposta preventiva e reduzir exposicao da operacao.',
    },
    strategicContext:
      'Projeto essencial para proteger credibilidade, disponibilidade e continuidade da operacao digital.',
    objectivesList: [
      'Mapear riscos de alto impacto',
      'Responder incidentes com protocolo',
      'Fortalecer resiliencia da operacao',
    ],
    detailedFeatures: [
      {
        name: 'Painel de Alertas',
        description: 'Concentrador de eventos com classificacao por severidade.',
        strategicValue: 'Reduz tempo de deteccao e resposta.',
      },
      {
        name: 'Linha do Tempo de Incidentes',
        description: 'Registro cronologico de eventos e acoes executadas.',
        strategicValue: 'Cria memoria operacional e aprendizado continuo.',
      },
      {
        name: 'Checklist de Contencao',
        description: 'Fluxo padronizado para mitigar incidentes recorrentes.',
        strategicValue: 'Padroniza resposta e reduz risco humano.',
      },
    ],
    features: ['Alertas por severidade', 'Timeline de incidentes', 'Checklist de contencao'],
    architecture:
      'Arquitetura orientada a eventos com trilha de auditoria e camadas de priorizacao de risco.',
    politicalRole:
      'Protege continuidade de comunicacao e evita perda de confianca por incidentes digitais.',
    stack: {
      frontend: ['Next.js', 'Tailwind CSS'],
      backend: ['Node.js'],
      dados: ['Firestore', 'PostgreSQL (planejado)'],
      seguranca: ['WAF (planejado)', 'SIEM (planejado)'],
    },
    contributions: [
      {
        memberId: '1',
        role: 'Arquitetura e Resposta',
        tasks: ['Modelo de incidentes', 'Protocolos de resposta', 'Prioridades tecnicas'],
        hours: 80,
      },
      {
        memberId: '2',
        role: 'UX de Operacao',
        tasks: ['Fluxo de alertas', 'Layout de dashboard', 'Prioridade visual'],
        hours: 55,
      },
    ],
    gallery: [
      'https://picsum.photos/seed/sentinela-gal-1/1400/900',
      'https://picsum.photos/seed/sentinela-gal-2/1400/900',
    ],
    metrics: [
      { label: 'Alertas Processados', value: '214' },
      { label: 'Incidentes Criticos', value: '12' },
      { label: 'Tempo Medio de Mitigacao', value: '2h' },
      { label: 'Protocolos Criados', value: '9' },
    ],
    timeline: [
      {
        phase: 'Mapeamento de Riscos',
        description: 'Levantamento de vetores e cenarios prioritarios.',
        status: 'completed',
      },
      {
        phase: 'Prototipo Operacional',
        description: 'Painel interno de monitoramento em validacao.',
        status: 'current',
      },
      {
        phase: 'Integracao com automacoes',
        description: 'Alertas e acao assistida por regras.',
        status: 'planned',
      },
    ],
    nextSteps: [
      'Formalizar playbooks por categoria de incidente',
      'Integrar eventos tecnicos com canais de resposta',
      'Adicionar auditoria completa de acoes',
    ],
  },
];

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Felipe Pires',
    role: 'Tech Lead / Architect',
    area: 'Fullstack Development',
    experience: 'Senior',
    bio:
      'Lidera a arquitetura da plataforma e coordena evolucao tecnica dos modulos publicos e administrativos.',
    technologies: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Firebase'],
    badges: ['Arquitetura', 'Lideranca Tecnica', 'Produto'],
    projectIds: ['plataforma-missao', 'voz-do-povo', 'sentinela-digital'],
    hours: 450,
    links: {
      github: 'https://github.com/fpires',
      linkedin: 'https://linkedin.com/in/felipe-pires',
      instagram: 'https://instagram.com/fpires.tech',
    },
  },
  {
    id: '2',
    name: 'Ana Silva',
    role: 'UI/UX Designer',
    area: 'Product Design',
    experience: 'Senior',
    bio:
      'Responsavel por experiencia de usuario, sistema visual e consistencia da interface do laboratorio.',
    technologies: ['Figma', 'Design System', 'Tailwind CSS', 'Framer'],
    badges: ['UX Estrategico', 'Design System', 'Acessibilidade'],
    projectIds: ['plataforma-missao', 'sentinela-digital'],
    hours: 320,
    links: {
      github: 'https://github.com/anadesign',
      linkedin: 'https://linkedin.com/in/ana-silva-ux',
      instagram: 'https://instagram.com/ana.ux',
    },
  },
  {
    id: '3',
    name: 'Ricardo Santos',
    role: 'Data Scientist',
    area: 'Data & Analytics',
    experience: 'Pleno',
    bio:
      'Atua na modelagem de dados e em metricas operacionais para apoiar decisao politica orientada por evidencia.',
    technologies: ['Python', 'SQL', 'BigQuery', 'Power BI', 'Machine Learning'],
    badges: ['Data Intelligence', 'Metrica de Impacto', 'Analise Avancada'],
    projectIds: ['plataforma-missao', 'voz-do-povo'],
    hours: 210,
    links: {
      github: 'https://github.com/rsantos-data',
      linkedin: 'https://linkedin.com/in/ricardo-santos-data',
      instagram: 'https://instagram.com/ricardo.data',
    },
  },
];

export const labStats = {
  projectsCompleted: 24,
  activeVolunteers: 48,
  linesOfCode: '128K+',
  impactedUsers: '150K+',
};
