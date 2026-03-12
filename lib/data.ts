export const projects = [
  { 
    id: '1', 
    title: 'Plataforma Missão', 
    description: 'Hub central de tecnologia política para coordenação de voluntários e projetos estratégicos.', 
    category: 'Infraestrutura', 
    status: 'Ativo', 
    featured: true,
    image: 'https://picsum.photos/seed/missao/800/400',
    link: 'https://missao.org'
  },
  { 
    id: '2', 
    title: 'Voz do Povo', 
    description: 'Sistema de escuta ativa e análise de sentimento em redes sociais para campanhas municipais.', 
    category: 'Dados', 
    status: 'Ativo', 
    featured: true,
    image: 'https://picsum.photos/seed/voz/800/400',
    link: '#'
  },
  { 
    id: '3', 
    title: 'Sentinela Digital', 
    description: 'Monitoramento de desinformação e ataques coordenados contra o ecossistema do partido.', 
    category: 'Segurança', 
    status: 'Em Desenvolvimento', 
    featured: false,
    image: 'https://picsum.photos/seed/sentinela/800/400',
    link: '#'
  }
];

export const team = [
  {
    id: '1',
    name: 'Felipe Pires',
    role: 'Tech Lead / Architect',
    area: 'Fullstack Development',
    experience: 'Sênior',
    projectIds: ['1', '2'],
    hours: 450,
    links: {
      github: 'fpires',
      linkedin: 'felipe-pires',
      instagram: 'fpires.tech'
    }
  },
  {
    id: '2',
    name: 'Ana Silva',
    role: 'UI/UX Designer',
    area: 'Product Design',
    experience: 'Sênior',
    projectIds: ['1'],
    hours: 320,
    links: {
      github: 'anadesign',
      linkedin: 'ana-silva-ux',
      instagram: 'ana.ux'
    }
  },
  {
    id: '3',
    name: 'Ricardo Santos',
    role: 'Data Scientist',
    area: 'Data & Analytics',
    experience: 'Pleno',
    projectIds: ['2'],
    hours: 210,
    links: {
      github: 'rsantos-data',
      linkedin: 'ricardo-santos-data',
      instagram: 'ricardo.data'
    }
  }
];
