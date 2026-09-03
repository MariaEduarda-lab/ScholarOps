# ScholarOps — frontend

Protótipo navegável para apoiar equipes de assistência social na triagem de candidaturas a bolsas. A interface organiza evidências e sinaliza itens para revisão; decisões continuam sob responsabilidade profissional.

## Stack

- React + TypeScript + Vite;
- React Router para os fluxos e páginas;
- TanStack Query para a camada assíncrona de dados;
- Recharts para indicadores operacionais;
- React Hook Form e Zod preparados para formulários integrados ao futuro backend;
- Vitest e Testing Library para testes.

Nesta etapa, os dados são derivados dos CSVs sintéticos em `dados/sinteticos`. A função desse adaptador local é simular o contrato que depois será atendido pela API em FastAPI.

O ambiente interno é institucional: cada pessoa autenticada possui um único `institutionId`, e todas as consultas, métricas e candidaturas são limitadas a esse vínculo. A sessão demonstrativa está configurada para o Inteli em `src/context/institution-session.ts`. No backend, o mesmo filtro deverá ser obrigatório na autorização e nas consultas ao banco; não pode depender apenas da interface.

## Executar

```bash
npm install
npm run dev
```

Abra o endereço informado pelo Vite. O login é demonstrativo: o formulário já vem preenchido e leva ao ambiente interno.

## Verificações

```bash
npm run typecheck
npm test
npm run build
```

## Rotas

- `/`: apresentação do projeto;
- `/login` e `/cadastro`: acesso simulado;
- `/app/processo`: instituição, calendário e matriz documental;
- `/app/inscricoes`: busca e filtros sobre candidaturas;
- `/app/inscricoes/:id`: dossiê e resumo individual;
- `/app/operacoes`: fila de revisão humana;
- `/app/metricas`: indicadores do processo.

## Integração futura com FastAPI

Substitua as funções de `src/data/mock-data.ts` por um cliente HTTP mantendo os tipos de `src/types.ts`. A recomendação é gerar os tipos do cliente a partir do OpenAPI exposto pelo FastAPI, evitando divergências manuais entre frontend e backend.
