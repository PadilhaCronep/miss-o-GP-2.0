# ADMIN FRONTEND BACKEND HANDOFF

Este documento define a interface de integracao entre o front do painel administrativo e o backend proprietario.

## 1. Objetivo

O front admin ja esta estruturado e funcional. Para operar em producao, o backend deve implementar os endpoints REST abaixo e retornar payloads compativeis com os contratos em:

- `lib/admin/api-contracts.ts`
- `lib/admin/api-endpoints.ts`
- `lib/admin/api-service.ts`

## 2. Configuracao de modo

No front, usar:

- `NEXT_PUBLIC_ADMIN_DATA_MODE=api`
- `NEXT_PUBLIC_ADMIN_API_BASE_URL=https://SEU_SERVIDOR/api`

Enquanto `mock`, o painel usa localStorage.

## 3. Formato padrao de resposta

Todas as rotas devem responder em JSON no formato:

```json
{
  "data": {},
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 100
  },
  "message": "opcional"
}
```

Para listas, `data` deve ser array.

## 4. Endpoints esperados

Base: `/api`

### Bootstrap e dashboard
- `GET /admin/bootstrap` -> retorna `AdminDatabase` completo
- `GET /admin/dashboard` -> resumo de indicadores
- `GET /admin/activities` -> lista de atividades (aceitar query/paginacao)

### Leads
- `GET /admin/leads`
- `POST /admin/leads`
- `PUT /admin/leads/:id`
- `DELETE /admin/leads/:id`

Status de lead aceitos:
- `novo`
- `em_analise`
- `qualificado`
- `aprovado`
- `rejeitado`
- `arquivado`

### Formularios
- `GET /admin/forms`
- `POST /admin/forms`
- `PUT /admin/forms/:id`
- `DELETE /admin/forms/:id`

Tipos de formulario aceitos:
- `voluntarios_tech`
- `contato_geral`
- `sugestao_projeto`

### Projetos
- `GET /admin/projects`
- `POST /admin/projects`
- `PUT /admin/projects/:id`
- `DELETE /admin/projects/:id`

Status de projeto aceitos:
- `rascunho`
- `em_desenvolvimento`
- `publicado`
- `arquivado`

### Membros
- `GET /admin/members`
- `POST /admin/members`
- `PUT /admin/members/:id`
- `DELETE /admin/members/:id`

Status de membro:
- `ativo`
- `arquivado`

### Contribuicoes
- `GET /admin/contributions`
- `POST /admin/contributions`
- `PUT /admin/contributions/:id`
- `DELETE /admin/contributions/:id`

### Taxonomia
Categorias:
- `GET /admin/categories`
- `POST /admin/categories`
- `PUT /admin/categories/:id`
- `DELETE /admin/categories/:id`

Objetivos:
- `GET /admin/objectives`
- `POST /admin/objectives`
- `PUT /admin/objectives/:id`
- `DELETE /admin/objectives/:id`

Tags:
- `GET /admin/tags`
- `POST /admin/tags`
- `PUT /admin/tags/:id`
- `DELETE /admin/tags/:id`

### Midia
- `GET /admin/media`
- `POST /admin/media`
- `DELETE /admin/media/:id`

Observacao: `POST /admin/media` pode receber URL final de storage ja processada pelo backend.

### Configuracoes
- `GET /admin/settings`
- `PUT /admin/settings`

## 5. Query params recomendados para listas

Implementar para todos os `GET` de lista:

- `search`
- `page`
- `pageSize`
- `status`
- `sortBy`
- `sortOrder=asc|desc`

## 6. Contratos (DTOs)

Os DTOs de entrada esperados pelo front estao em `lib/admin/api-contracts.ts`:

- `LeadUpsertDTO`
- `FormSubmissionUpsertDTO`
- `ProjectUpsertDTO`
- `MemberUpsertDTO`
- `ContributionUpsertDTO`
- `TaxonomyUpsertDTO`
- `MediaCreateDTO`
- `SiteSettingsDTO`

## 7. Regras de integracao importantes

- IDs devem ser strings estaveis.
- Datas devem ser ISO-8601.
- Respostas devem manter os nomes de campos exatamente como nos DTOs.
- Erros devem retornar status HTTP correto e mensagem legivel.
- Quando houver paginacao, preencher `meta.page`, `meta.pageSize`, `meta.total`.

## 8. Sequencia recomendada para backend

1. Implementar `GET /admin/bootstrap` para plugar rapidamente toda a UI.
2. Implementar CRUD de leads e projetos.
3. Implementar membros, contribuicoes, formularios.
4. Implementar taxonomia, midia e settings.
5. Ativar paginacao/filtros e auditoria.

## 9. Checklist de entrega backend

- [ ] Endpoints REST criados com base neste documento
- [ ] Contratos 100% aderentes a `api-contracts.ts`
- [ ] CORS/autenticacao configurados para painel admin
- [ ] Paginacao e filtros nas listas principais
- [ ] Tratamento de erro padronizado
- [ ] Testes de integracao por modulo

## 10. Front readiness

O front ja possui camada de integracao pronta para consumo de API:

- `lib/admin/api-http.ts`
- `lib/admin/api-service.ts`

Basta habilitar modo API via env e implementar os endpoints no servidor.
