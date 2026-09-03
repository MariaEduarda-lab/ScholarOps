# ScholarOps API

Backend inicial do ScholarOps, construído com FastAPI, Pydantic e SQLAlchemy. Ele torna o protótipo utilizável hoje e mantém pontos de extensão claros para autenticação, PostgreSQL/Supabase e análise por IA.

## O que já funciona

- banco SQLite criado e populado automaticamente com as três bases sintéticas;
- isolamento por instituição em todas as consultas e gravações;
- listagem, detalhe e atualização parcial de candidaturas;
- ingestão por upload CSV/XLSX ou lote de linhas JSON;
- métricas institucionais;
- registro auditável de decisões humanas;
- análise provisória baseada em regras;
- contrato `AnalysisProvider` para conectar um modelo de IA no futuro;
- documentação OpenAPI/Swagger automática.

O cabeçalho `X-Institution-Id` representa o vínculo institucional durante esta fase demonstrativa. No ambiente real, ele deverá ser obtido de um token autenticado e validado no backend — nunca aceito livremente do navegador.

## Executar

Na raiz do repositório:

```bash
source .venv/bin/activate
cd apps/backend
uvicorn app.main:app --reload
```

Acesse:

- API: `http://127.0.0.1:8000`;
- Swagger: `http://127.0.0.1:8000/docs`;
- saúde da aplicação: `http://127.0.0.1:8000/health`;
- conexão do banco: `http://127.0.0.1:8000/health/database`.

Em outro terminal, execute o frontend:

```bash
cd apps/frontend
npm run dev
```

O Vite redireciona `/api` para o backend. Se a API estiver desligada, o frontend usa a base sintética local porque `VITE_ENABLE_MOCK_FALLBACK=true`. Defina essa opção como `false` em homologação e produção.

## Rotas principais

| Método | Rota | Finalidade |
|---|---|---|
| `GET` | `/health` | Saúde da API |
| `GET` | `/health/database` | Testa a conexão SQL |
| `GET` | `/api/v1/session` | Sessão e instituição atual |
| `GET` | `/api/v1/session/process` | Processo seletivo atual |
| `GET` | `/api/v1/candidates` | Lista institucional paginada |
| `GET` | `/api/v1/candidates/{id}` | Dossiê completo |
| `PATCH` | `/api/v1/candidates/{id}` | Atualização parcial |
| `POST` | `/api/v1/candidates/{id}/analysis` | Executa o provedor de análise |
| `POST` | `/api/v1/candidates/{id}/decisions` | Registra uma decisão humana |
| `GET` | `/api/v1/metrics` | Métricas institucionais |
| `POST` | `/api/v1/ingestions/file` | Importa CSV UTF-8 ou XLSX |
| `POST` | `/api/v1/ingestions/csv` | Rota compatível exclusiva para CSV |
| `POST` | `/api/v1/ingestions/rows` | Recebe linhas de tabela/API |
| `GET` | `/api/v1/ingestions/{id}` | Consulta uma ingestão |

Exemplo de atualização parcial:

```bash
curl -X PATCH http://127.0.0.1:8000/api/v1/candidates/INT-SYN-0001 \
  -H "Content-Type: application/json" \
  -H "X-Institution-Id: inteli" \
  -d '{"phone":"(11) 99999-9999","familyMembers":4}'
```

Exemplo de lote vindo de uma tabela ou integração:

```json
{
  "sourceName": "automacao-planilha",
  "rows": [
    {
      "candidatura_id": "INT-API-0001",
      "tipo_documento": "comprovante_residencia",
      "arquivo_id": "DOC-API-0001",
      "status_documento": "pendente"
    }
  ]
}
```

## Banco de dados e Supabase

O padrão local é SQLite. Para Supabase, copie `.env.example` para `.env` e substitua `DATABASE_URL` pela conexão PostgreSQL exibida no painel **Connect**:

```env
DATABASE_URL=postgresql+psycopg://USUARIO:SENHA@HOST:5432/postgres?sslmode=require
```

Para um backend persistente, a documentação do Supabase recomenda conexão direta quando houver IPv6, ou Supavisor em modo sessão em redes apenas IPv4. Para execução serverless, use o pooler em modo transação. Consulte a [documentação oficial de conexão](https://supabase.com/docs/guides/database/connecting-to-postgres).

Alternativas razoáveis são Neon, Render PostgreSQL e Railway PostgreSQL. Para este projeto, Supabase é uma boa escolha porque acrescenta painel, Storage e autenticação; porém o backend deve continuar sendo a autoridade sobre acesso institucional e regras de negócio.

## Futuro modelo de IA

O contrato está em `app/services/analysis.py`. Um novo provedor implementará:

```python
class AnalysisProvider(Protocol):
    name: str
    version: str

    def analyze(self, candidate: Candidate) -> AnalysisResult: ...
```

O retorno contém resumo, insights, sinais e confiança. Ele não contém uma decisão de bolsa. Cada execução é gravada em `analysis_runs` com provedor, versão e resultado, preservando rastreabilidade.

## Qualidade

```bash
ruff check .
pytest
mypy app
```

O upload usa `UploadFile`, apropriado para arquivos maiores porque trabalha com arquivo temporário em vez de manter todo o conteúdo permanentemente em memória. O suporte a formulário exige `python-multipart`, conforme a [documentação do FastAPI](https://fastapi.tiangolo.com/tutorial/request-files/).
