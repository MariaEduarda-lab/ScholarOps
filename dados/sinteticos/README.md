# Bases sintéticas de candidaturas

Estas bases representam dossiês **inteiramente artificiais** para pesquisa e testes do ScholarOps. Nenhuma linha corresponde a uma pessoa real.

## Arquivos

| Base | Processo representado | Unidade de observação |
|---|---|---|
| `inteli_documentos_sinteticos.csv` | Programa de Bolsas Inteli — Graduação 2026 | 1.000 documentos de 100 candidaturas |
| `bom_aluno_bh_documentos_sinteticos.csv` | Programa Bom Aluno BH — processo 2026 | 1.000 documentos de 200 candidaturas |
| `marista_dom_silverio_documentos_sinteticos.csv` | Bolsa Social para novos estudantes — ano letivo 2026 | 1.000 documentos de 125 candidaturas |

Documentos ausentes continuam aparecendo como registros: nesses casos, `arquivo_id` recebe `ausente` e `status_documento` recebe `faltante`. Isso permite testar a detecção de pendências.

As três bases podem ser regeneradas de forma determinística executando:

```bash
python3 scripts/gerar_bases_sinteticas.py
```

## Dicionário de dados

| Campo | Descrição |
|---|---|
| `instituicao` | Instituição ou programa associado ao registro |
| `edicao` | Edição do processo usada como referência |
| `candidatura_id` | Identificador artificial da candidatura |
| `cenario_teste` | Situação que o conjunto de registros pretende simular |
| `membro_id` | Identificador artificial de uma pessoa do grupo familiar |
| `relacao` | Relação sintética com o candidato |
| `idade` | Idade artificial ou `nao_informado` |
| `ocupacao` | Ocupação declarada no cenário |
| `categoria_documental` | Família do documento |
| `tipo_documento` | Tipo documental esperado ou recebido |
| `regra_aplicabilidade` | Condição que torna o documento aplicável |
| `obrigatoriedade` | `obrigatorio` `condicional` `preferencial` ou `a_validar` |
| `arquivo_id` | Identificador artificial do arquivo ou `ausente` |
| `status_documento` | Resultado esperado da conferência |
| `competencia` | Período artificial coberto pelo documento |
| `valor_declarado` | Valor informado no formulário quando aplicável |
| `valor_extraido` | Valor artificial extraído do documento quando aplicável |
| `confianca_extracao` | Confiança simulada entre `0` e `1` ou `nao_se_aplica` |
| `pendencia_esperada` | Pendência que o protótipo deveria gerar |
| `revisao_humana_esperada` | Indica se o cenário deve ser encaminhado à revisão humana |
| `nivel_confirmacao_fonte` | `confirmado` `parcial` ou `hipotese` conforme a pesquisa documental |

## Vocabulário de status

Os valores principais de `status_documento` são:

- `ok`: documento presente e sem falha artificial conhecida;
- `faltante`: documento aplicável sem arquivo correspondente;
- `ilegivel`: qualidade insuficiente para uma extração segura;
- `periodo_incompleto`: não cobre todos os meses exigidos no cenário;
- `divergente`: valor ou dado extraído difere da declaração;
- `desatualizado`: documento fora da validade ou período esperado;
- `nao_se_aplica`: documento não é exigível para aquele membro/cenário;
- `nao_verificado`: item cuja conferência detalhada depende de regra ainda não confirmada.

## Cuidados de interpretação

- Os CSVs são **fixtures de teste**, não amostras estatísticas e não podem sustentar conclusões sobre frequência de erros ou perfis de candidatos.
- `revisao_humana_esperada=sim` significa encaminhamento para conferência; não significa suspeita de fraude nem recomendação de indeferimento.
- A base do Inteli segue a lista publicada no [edital de bolsas de 2026](https://www.inteli.edu.br/wp-content/uploads/2025/08/Inteli-Edital-Processo-Seletivo-Inteli-Programa-de-Bolsas-2026_ajustado.pdf).
- No Bom Aluno BH, ficha e boletins são confirmados pela [página oficial do processo](https://bomalunobh.com.br/como-participar/). Identificação, residência e comprovantes específicos de renda vieram da pesquisa de partida e estão marcados como `hipotese`.
- No Marista Dom Silvério, o [edital social de 2026](https://colegiosmaristas.com.br/wp-content/uploads/2025/09/Edital-n.-02-2025_CON_COL_UBEE-DOM-SILVERIO.pdf) confirma formulário, documentação familiar e comprovação socioeconômica na entrevista. Como a relação integral do Anexo III não foi recuperada na verificação, os tipos documentais detalhados estão marcados como `parcial` ou `hipotese`.
