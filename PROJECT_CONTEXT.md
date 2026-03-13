# PROJECT_CONTEXT

## 1. Visão geral do projeto

A plataforma representa o **hub tecnológico político** do laboratório de tecnologia da campanha de **Ludymilla Dias**, vinculada ao ecossistema do **Partido Missão**.

Objetivos estratégicos do projeto:
- Centralizar projetos desenvolvidos pela equipe.
- Apresentar os membros da equipe.
- Mostrar contribuições individuais.
- Servir como portfólio coletivo.
- Captar novos voluntários da área de tecnologia.
- Organizar leads vindos de formulários.
- Fortalecer o ecossistema tecnológico do Partido Missão.

A solução é composta por duas partes principais:

### Plataforma pública
Apresenta:
- Projetos.
- Equipe.
- Contribuições.
- Página de voluntários.
- Recrutamento.
- Cases dos projetos.

### Painel administrativo
Permite:
- Visualizar leads capturados.
- Acessar respostas de formulários.
- Cadastrar e editar projetos.
- Cadastrar membros da equipe.
- Vincular pessoas a projetos.
- Registrar contribuições.
- Gerenciar categorias.
- Gerenciar mídia.
- Configurar conteúdos do site.

## 2. Estrutura funcional do sistema

### Módulo: Projetos
Gerenciamento de projetos desenvolvidos pela equipe.

Campos esperados:
- nome
- descrição
- categoria
- objetivos
- tags
- status
- stack tecnológica
- membros envolvidos
- contribuições
- imagens
- métricas
- roadmap

### Módulo: Pessoas / equipe
Cadastro de membros da equipe.

Campos esperados:
- nome
- foto
- função
- bio curta
- bio longa
- stack
- projetos participados
- contribuições
- horas dedicadas
- GitHub
- LinkedIn
- Instagram

### Módulo: Leads
Captura de pessoas interessadas em participar.

Campos esperados:
- nome
- email
- cidade
- área de atuação
- tecnologias
- nível de experiência
- disponibilidade
- motivação
- GitHub
- LinkedIn

Status possíveis:
- novo
- em análise
- qualificado
- aprovado
- rejeitado

### Módulo: Formulários
Registro das respostas de formulários.

Tipos de formulários:
- voluntários tech
- contato geral
- sugestão de projeto

### Módulo: Contribuições
Registro da participação de pessoas em projetos.

Campos esperados:
- membro
- projeto
- função
- descrição
- horas dedicadas
- data

### Módulo: Categorias e tags
Sistema de classificação de projetos.

Exemplos:
- Categorias: Landing Pages, Transparência Política, Projetos Legislativos, Mobilização Política
- Tags: interativo, visualização de dados, quiz, mapa político, timeline

## 3. Estrutura esperada do banco de dados

Tabelas esperadas e função principal:

- **users_admin**: credenciais de acesso administrativo, papéis/permissões e status de conta.
- **leads**: cadastro estruturado de interessados capturados por formulários.
- **form_submissions**: respostas brutas de formulários, metadados e vínculo opcional com lead.
- **projects**: cadastro central dos projetos do laboratório e seus atributos públicos.
- **project_categories**: categorias oficiais para organização e filtro de projetos.
- **project_tags**: tags para classificação temática e funcional.
- **members**: cadastro central de membros da equipe.
- **member_social_links**: links sociais/profissionais dos membros por tipo de rede.
- **project_members**: relação N:N entre membros e projetos, com papel no projeto.
- **contributions**: registros de contribuição individual por membro, projeto e período.
- **media_files**: arquivos de mídia do ecossistema (imagens, vídeos, documentos) e metadados.
- **site_settings**: configurações dinâmicas de conteúdo e comportamento do site.

Relações esperadas de alto nível:
- `projects` N:N `members` via `project_members`.
- `contributions` ligada a `members` e `projects`.
- `projects` ligada a `project_categories` e `project_tags`.
- `members` ligada a `member_social_links`.
- `form_submissions` podendo criar/atualizar `leads`.
