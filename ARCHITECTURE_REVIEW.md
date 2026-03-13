# ARCHITECTURE_REVIEW

## Escopo da revisão
Revisão técnica completa do repositório atual `miss-o-GP-2.0`, cobrindo:
- Estrutura de pastas.
- Arquitetura de front-end e back-end.
- Rotas, componentes, serviços e chamadas de API.
- Banco de dados e modelo de domínio.
- Autenticação, segurança, performance, escalabilidade e organização de código.

Data da análise: **13/03/2026**.

## 1. Análise da estrutura atual

### 1.1 Estrutura de pastas
Estrutura principal encontrada:
- `app/`: rotas públicas e administrativas (App Router do Next.js).
- `components/layout/`: `navbar` e `footer`.
- `lib/`: `data.ts`, `firebase.ts`, `utils.ts`.
- `hooks/`: `use-mobile.ts`.

Não encontrados:
- `app/api/*` (nenhum endpoint backend).
- `middleware.ts` (sem proteção de rotas no servidor).
- Pasta de banco/migração (`prisma/`, `drizzle/`, `migrations/`, SQL etc.).

### 1.2 Arquitetura de front-end
- Stack: Next.js 15 + React 19 + TypeScript + Tailwind + Motion + Recharts.
- UI pública e admin com alto refinamento visual.
- Páginas com grande responsabilidade (dados + lógica + renderização no mesmo arquivo).
- Forte acoplamento a dados locais mockados.

### 1.3 Arquitetura de back-end
- Backend não implementado.
- Ausência total de handlers de API (`route.ts`) para leads, formulários, projetos, membros, contribuições, mídia ou configurações.
- Ausência de camada de serviço/repositório.

### 1.4 Rotas identificadas
Públicas:
- `/`
- `/projetos`
- `/projetos/[slug]`
- `/equipe`
- `/equipe/[id]`
- `/participe`

Admin:
- `/admin`
- `/admin/login`
- `/admin/leads`
- `/admin/formularios`
- `/admin/projects`
- `/admin/pessoas`
- `/admin/categorias`
- `/admin/midia`
- `/admin/configuracoes`

Inconsistência:
- O menu lateral aponta para `/admin/contribuicoes`, mas essa rota não existe.

### 1.5 Componentes, serviços e chamadas de API
- Componentes de layout existem, mas não há biblioteca de componentes de domínio admin (tabela, formulário, modal, filtros) reutilizável.
- Não há chamadas `fetch`/SDK para persistência de negócio no fluxo principal.
- Dados vêm de:
  - `lib/data.ts` (site público)
  - arrays mock locais dentro de páginas admin

### 1.6 Autenticação
- Login admin no cliente com credencial hardcoded (`admin` / `missao2026`).
- Sessão via `localStorage.setItem('admin_auth', 'true')`.
- Sem validação server-side, sem cookie seguro, sem RBAC e sem proteção real de rota.

## 2. Avaliação crítica da arquitetura

### 2.1 Pontos fortes
- Boa base de produto: narrativas públicas, páginas de case, página de recrutamento e painel administrativo já desenhado.
- Organização inicial clara entre área pública e área administrativa.
- Uso de TypeScript e App Router, que facilita evolução para fullstack.
- Intenção de integração com Firebase já iniciada (`lib/firebase.ts` e blueprint).

### 2.2 Problemas críticos e gargalos
1. **Build quebrado por dependências/configuração de CSS**
- `npm run build` falha por módulo ausente `@tailwindcss/postcss`.
- `postcss.config.mjs` também referencia `autoprefixer`, não presente no projeto.

2. **Dependências inconsistentes com imports reais**
- `app/admin/categorias/page.tsx` importa `framer-motion`, mas o pacote não está instalado.
- `app/globals.css` importa `tw-animate-css`, também não instalado.

3. **Quebra de consistência entre modelo de dados e telas**
- `lib/data.ts` define projetos/membros com estrutura simples.
- Páginas públicas usam campos inexistentes no mock atual (`strategicObjectives`, `functionalTags`, `teamIds`, `overview`, `detailedFeatures`, `contributions`, `technologies`, `badges`, `labStats` etc.).
- Risco alto de erro em runtime em várias páginas.

4. **Admin totalmente mockado (sem persistência)**
- CRUDs de leads, projetos, membros, categorias, mídia e formulários só alteram estado local.
- Não existe rastreabilidade nem operação real.

5. **Segurança inadequada para ambiente de campanha**
- Credenciais hardcoded no frontend.
- Controle de sessão manipulável no navegador.
- Nenhuma trilha de auditoria para ações administrativas.

### 2.3 Problemas de organização e escalabilidade
- Duplicação de dados e regras em múltiplas páginas admin.
- Ausência de contratos de domínio (DTOs/validação) compartilhados entre front e backend.
- Ausência de testes automatizados e de observabilidade (logs, métricas, tracing).
- Inconsistências de naming entre PT/EN (`projects`, `pessoas`, `configuracoes`, `participe`).

### 2.4 Problemas de performance
- Re-renderizações e payload de UI potencialmente altos por páginas extensas sem fragmentação de componentes.
- Sem estratégia de cache de dados, paginação real, busca server-side ou lazy loading orientado a dados.

## 3. Análise do modelo de banco de dados

### 3.1 Estado atual
- Não existe banco relacional implementado no código.
- Não existem migrações nem schema SQL/ORM.
- Há apenas:
  - `lib/data.ts` (dados mock estáticos)
  - `firebase-blueprint.json` com modelagem parcial (apenas `Lead` e `Project`)

### 3.2 Avaliação técnica (normalização e integridade)
- Normalização: não aplicável no estado atual (sem banco real).
- Relacionamentos: inexistentes formalmente (sem FK, sem tabelas de junção).
- Integridade referencial: ausente.
- Redundância: alta (mocks distribuídos em várias páginas).
- Indexação: inexistente.
- Escalabilidade: limitada a protótipo.

### 3.3 Lacunas de schema
Faltam entidades centrais para o domínio definido:
- `users_admin`
- `form_submissions`
- `members`
- `member_social_links`
- `project_members`
- `contributions`
- `media_files`
- `site_settings`
- `project_categories` e `project_tags` estruturadas com relacionamentos

## 4. Melhorias recomendadas

### 4.1 Código e organização
- Estruturar por domínio:
  - `src/modules/leads`
  - `src/modules/projects`
  - `src/modules/members`
  - `src/modules/contributions`
  - `src/modules/forms`
  - `src/modules/media`
  - `src/modules/settings`
- Separar camadas:
  - `domain` (entidades/regras)
  - `application` (casos de uso)
  - `infrastructure` (db/adapters)
  - `presentation` (UI)
- Criar componentes compartilhados do admin (tabela, filtros, paginação, modal, formulário).
- Padronizar naming e convenções (idioma único para rotas e entidades).

### 4.2 Arquitetura (front/back/APIs)
- Implementar backend no próprio Next (Route Handlers) com endpoints para todos os módulos.
- Adotar validação de entrada/saída (ex.: `zod`) nos payloads.
- Criar camada service/repository para evitar acesso direto ao banco pela UI.
- Introduzir autenticação real (Firebase Auth, NextAuth ou equivalente) com sessão segura por cookie httpOnly.
- Proteger `/admin/*` com middleware + autorização por perfil.

### 4.3 Banco de dados
Sugestão: migrar para **PostgreSQL** com ORM e migrações versionadas.

Estrutura base recomendada:
- `users_admin`
- `leads`
- `form_submissions`
- `projects`
- `project_categories`
- `project_tags`
- `project_tag_links`
- `members`
- `member_social_links`
- `project_members`
- `contributions`
- `media_files`
- `site_settings`

Índices recomendados (mínimo):
- `leads(email)` único.
- `leads(status, created_at)`.
- `projects(slug)` único.
- `projects(category_id, status)`.
- `project_members(project_id, member_id)` único.
- `contributions(project_id, member_id, contributed_at)`.
- `form_submissions(form_type, created_at)`.

### 4.4 Painel administrativo
Gestão de leads:
- Pipeline de status com histórico de contato.
- Notas por lead e SLA de resposta.

Gestão de projetos:
- Formulário completo com objetivos, tags, stack, métricas, roadmap e mídia.
- Fluxo de publicação/despublicação com revisão.

Gestão de membros:
- Perfil detalhado, links sociais normalizados e histórico por projeto.

Gestão de contribuições:
- Criar módulo e rota dedicados (`/admin/contribuicoes`).
- Relatórios por período, projeto e membro.

Sistema de mídia:
- Upload real para storage.
- Metadados (alt text, dimensão, autor, uso).
- Controle de reuso e remoção segura.

## 5. Proposta de arquitetura ideal (alvo)

Camadas:
1. **Presentation**: App Router (público e admin), componentes reutilizáveis.
2. **Application/Domain**: casos de uso, validações e regras de negócio.
3. **Data/Infra**: banco relacional, storage, autenticação, auditoria e integrações.

Diretrizes:
- Fonte única de verdade para dados.
- APIs consistentes e versionáveis.
- Segurança por padrão.
- Observabilidade de operações administrativas.
- Testes automatizados para fluxos críticos.

## 6. Evidências técnicas coletadas
- `npm run build`: falhou por ausência de `@tailwindcss/postcss`.
- `npx tsc --noEmit`: falhou por referência inválida em `tsconfig` (`.next/types/cache-life.d.ts`).
- `npm run lint`: falhou por incompatibilidade de patch do ESLint no ambiente atual.
- Busca por rotas de API: nenhuma `route.ts` encontrada em `app/`.

## 7. Conclusão
O repositório atual está em estágio de **protótipo de interface**, com excelente direção visual e de produto, mas sem sustentação backend, sem modelo de dados operacional e com riscos críticos de segurança/auth.

Para tornar a plataforma apta ao contexto de campanha, o próximo passo é estabilizar o build, implantar backend e banco reais, e evoluir o painel para operação segura com dados persistentes e auditáveis.
