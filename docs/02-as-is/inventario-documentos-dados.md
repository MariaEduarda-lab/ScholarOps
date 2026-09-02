# Inventário de documentos e dados

> Mapeie uma amostra anonimizada ou sintética. Não envie documentos reais de candidatos para o repositório.

## 1. Catálogo de documentos

| ID | Tipo de documento | Obrigatório quando | Emissor | Formato/canal | Campos necessários | Validade | Variações conhecidas | Sensibilidade | Volume/ciclo |
|---|---|---|---|---|---|---|---|---|---:|
| DOC-001 | [Nome] | [Condição] | [Origem] | [PDF/JPG/etc.] | [Campos] | [Regra] | [Variações] | [baixa/média/alta] | [n] |

## 2. Checklist por documento

Copie esta seção para cada tipo relevante.

### DOC-[XXX] — [Nome]

- Finalidade no processo: [Por que é solicitado]
- Base/regra que exige o documento: [Fonte e versão]
- Alternativas aceitas: [Lista]
- Critérios de presença: [Descrição]
- Critérios de legibilidade: [Descrição]
- Critérios de validade: [Descrição]
- Campos a extrair: [Lista]
- Comparações com outros dados: [Lista]
- Exceções legítimas: [Lista]
- Quem resolve divergências: [Papel]
- Nível de dano se houver erro: [baixo/médio/alto + justificativa]

| Cenário de teste | Entrada | Resultado esperado | Exige humano? | Motivo |
|---|---|---|---|---|
| Documento completo | [Descrição] | [Resultado] | [sim/não] | [Motivo] |
| Imagem ilegível | [Descrição] | [Resultado] | Sim | Baixa confiança |
| Formato alternativo | [Descrição] | [Resultado] | [sim/não] | [Motivo] |
| Campo divergente | [Descrição] | [Resultado] | Sim | Confirmar contexto |

## 3. Dicionário de dados

| Campo | Definição | Tipo/formato | Origem | Obrigatório? | Pode ser derivado? | Sensível? | Uso autorizado | Qualidade observada |
|---|---|---|---|---|---|---|---|---|
| `candidatura_id` | Identificador interno | UUID/string | Sistema | Sim | Não | Não diretamente | Rastreabilidade | [Avaliar] |
| [campo] | [Definição] | [Tipo] | [Origem] | [S/N] | [S/N] | [S/N] | [Finalidade] | [Avaliar] |

## 4. Matriz de consistência

| ID | Campo A | Fonte A | Relação esperada | Campo B | Fonte B | Tolerância/exceção | Saída quando diverge |
|---|---|---|---|---|---|---|---|
| CON-001 | [Campo] | [Documento] | [igual/intervalo/regra] | [Campo] | [Fonte] | [Regra] | [alerta/revisão] |

Evite tratar divergência como fraude. A saída padrão deve descrever o fato observável e solicitar verificação, sem inferir intenção.

## 5. Perfil de qualidade

| Fonte/tipo | Amostra | Completude | Legibilidade | Exatidão estimada | Duplicidade | Atualidade | Principais falhas |
|---|---:|---:|---:|---:|---:|---:|---|
| [Fonte] | [n] | [%] | [%] | [%] | [%] | [%] | [Descrição] |

## 6. Ciclo de vida e acesso

| Categoria | Finalidade | Base legal validada por responsável | Coleta | Acesso por papel | Retenção | Exclusão | Compartilhamento |
|---|---|---|---|---|---|---|---|
| [Categoria] | [Finalidade] | [Registrar após validação] | [Origem] | [Papéis] | [Prazo] | [Processo] | [Destinatários] |

## 7. Lacunas

| Lacuna | Impacto | Como investigar | Responsável | Prazo | Status |
|---|---|---|---|---|---|
| [Dado sem fonte confiável] | [Impacto] | [Ação] | [Nome/papel] | [Data] | [Status] |
