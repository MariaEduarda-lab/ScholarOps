# ScholarOps — ambiente Python

Esta pasta registra o ambiente do futuro backend em FastAPI. A API ainda não foi implementada; as dependências criam uma base reproduzível para autenticação, persistência, upload, leitura inicial de documentos, testes e qualidade de código.

## Ativar o ambiente

Na raiz do repositório:

```bash
source .venv/bin/activate
```

No Windows (PowerShell):

```powershell
.venv\Scripts\Activate.ps1
```

## Reinstalar dependências

```bash
python -m pip install -r apps/backend/requirements-dev.txt
```

As bibliotecas de OCR e modelos de IA serão definidas quando o pipeline técnico for implementado. Elas não foram adicionadas antecipadamente porque dependem da estratégia escolhida, do ambiente de execução e das exigências de privacidade.
