# Briefing do projeto

> Documento vivo para alinhar problema, contexto, usuários, escopo e critérios de sucesso. Não descreva uma solução como se ela já estivesse validada.

## 1. Identificação

| Campo | Preenchimento |
|---|---|
| Nome do projeto | ScholarOps |
| Organização/programa de bolsas | [Nome] |
| Responsável pelo projeto | [Nome e papel] |
| Sponsor/decisor | [Nome e papel] |
| Pessoas participantes | [Nomes ou áreas] |
| Data da versão | [AAAA-MM-DD] |
| Status | [rascunho / em validação / aprovado] |

## 2. Resumo executivo

**Problema em uma frase:**  
[Quem] precisa [realizar qual tarefa], mas hoje [barreira observada], o que causa [impacto mensurável].

**Oportunidade em uma frase:**  
Podemos apoiar [usuários] por meio de [capacidade], preservando [salvaguarda/decisão humana], para alcançar [resultado].

**Por que agora:**  
[Mudança de volume, prazo, equipe, regulação, tecnologia ou qualidade que torna a iniciativa relevante agora.]

## 3. Contexto e dor

### 3.1 Situação atual

- Como uma candidatura chega à equipe? [Descrever canais e formatos]
- Quem faz a triagem, a análise, a entrevista e a decisão? [Papéis]
- Quantas candidaturas existem por ciclo? [Volume e sazonalidade]
- Quanto tempo leva cada etapa? [Informar medição ou estimativa]
- Quais ferramentas são usadas? [Planilhas, e-mail, sistemas, papel]
- Onde ficam os documentos e os registros da análise? [Fontes]

### 3.2 Evidências da dor

| Evidência | Fonte | Período/amostra | O que indica | Confiança |
|---|---|---|---|---|
| [Ex.: tempo mediano de triagem] | [Sistema/entrevista] | [Período] | [Interpretação] | [alta/média/baixa] |

Evite afirmações genéricas como “o processo é muito manual”. Registre tarefas, frequência, duração, retrabalho, erros, filas e consequências.

### 3.3 Impactos

| Público | Impacto atual | Severidade | Frequência |
|---|---|---|---|
| Candidato(a) | [Ex.: atraso, repetição de envio, falta de clareza] | [1–5] | [ocasional/frequente] |
| Assistência social | [Ex.: conferência repetitiva, contexto fragmentado] | [1–5] | [...] |
| Gestão do programa | [Ex.: baixa previsibilidade do ciclo] | [1–5] | [...] |
| Auditoria/compliance | [Ex.: justificativas dispersas] | [1–5] | [...] |

## 4. Pessoas e necessidades

### 4.1 Atores

| Ator | Responsabilidade | Necessidade principal | Decisões que toma | Acesso necessário |
|---|---|---|---|---|
| Candidato(a) | Enviar candidatura | [Preencher] | [Preencher] | [Preencher] |
| Assistente social | Analisar e entrevistar | [Preencher] | [Preencher] | [Preencher] |
| Coordenação | Gerir processo | [Preencher] | [Preencher] | [Preencher] |
| Suporte/secretaria | Tratar pendências | [Preencher] | [Preencher] | [Preencher] |
| Auditoria/DPO/jurídico | Supervisionar conformidade | [Preencher] | [Preencher] | [Preencher] |

### 4.2 Trabalhos a realizar (Jobs to Be Done)

Use o formato: “Quando [situação], quero [ação], para [resultado]”.

1. Quando `[situação]`, a assistente social quer `[ação]`, para `[resultado]`.
2. Quando `[situação]`, o candidato quer `[ação]`, para `[resultado]`.
3. Quando `[situação]`, a coordenação quer `[ação]`, para `[resultado]`.

## 5. Objetivos

### 5.1 Objetivo geral

[Ex.: reduzir o trabalho operacional de preparação da análise, oferecendo uma visão confiável, explicável e revisável de cada candidatura.]

### 5.2 Objetivos específicos

- [ ] Estruturar informações hoje dispersas;
- [ ] Identificar documentos ausentes, ilegíveis, vencidos ou incompatíveis;
- [ ] Apresentar resumo com referência às fontes;
- [ ] Direcionar exceções e casos de baixa confiança para revisão;
- [ ] Medir tempo, retrabalho e qualidade do processo;
- [ ] [Outro objetivo validado].

### 5.3 Não objetivos

- Tomar automaticamente a decisão de conceder ou negar bolsa;
- Produzir diagnóstico ou julgamento sobre caráter, intenção ou vulnerabilidade;
- Priorizar pessoas com base em atributos sensíveis ou proxies não autorizados;
- Substituir entrevista ou parecer profissional;
- [Outros limites acordados].

## 6. Escopo

### Dentro do primeiro ciclo

| Capacidade | Caso de uso | Usuário | Prioridade |
|---|---|---|---|
| Extração | [Quais documentos/campos] | [Papel] | [P0/P1/P2] |
| Verificação | [Presença, validade, consistência] | [Papel] | [...] |
| Pendências | [Tipos e forma de comunicação] | [Papel] | [...] |
| Resumo | [Conteúdo e nível de detalhe] | [Papel] | [...] |
| Encaminhamento | [Filas ou responsáveis] | [Papel] | [...] |
| Revisão humana | [Gatilhos e procedimento] | [Papel] | [...] |

### Fora do primeiro ciclo

- [Integrações, documentos, públicos ou decisões não contemplados]
- [Automação que depende de regras ainda não formalizadas]

## 7. Regras e critérios conhecidos

| ID | Regra atual | Fonte oficial | Exceções | Responsável | Última revisão |
|---|---|---|---|---|---|
| REG-001 | [Descrição objetiva] | [Edital/norma] | [Exceções] | [Papel] | [Data] |

Toda regra deve ter uma fonte e uma versão. Prática informal deve ser marcada como hipótese até validação.

## 8. Resultados e métricas

| Resultado desejado | Indicador | Linha de base | Meta | Guardrail | Fonte |
|---|---|---:|---:|---|---|
| Menor esforço operacional | Minutos ativos por candidatura | [x] | [y] | Sem aumentar retrabalho | [Fonte] |
| Mais previsibilidade | Tempo total até análise | [x] | [y] | Sem criar fila oculta | [Fonte] |
| Melhor completude | % analisadas sem reabertura | [x] | [y] | Medir por grupo/canal | [Fonte] |
| Resumo confiável | % de afirmações sustentadas pela fonte | [x] | [y] | Zero invenções críticas | [Amostra auditada] |
| Revisão adequada | Recall de casos que exigem revisão | [x] | [y] | Monitorar falso negativo | [Amostra rotulada] |

Não use apenas “acurácia”. Defina métricas por tarefa, custo dos erros e desempenho por tipo de documento e contexto relevante.

## 9. Restrições e dependências

| Tipo | Restrição/dependência | Impacto | Ação necessária | Responsável |
|---|---|---|---|---|
| Legal/LGPD | [Preencher] | [Preencher] | [Preencher] | [Preencher] |
| Prazo | [Preencher] | [Preencher] | [Preencher] | [Preencher] |
| Dados | [Preencher] | [Preencher] | [Preencher] | [Preencher] |
| Integração | [Preencher] | [Preencher] | [Preencher] | [Preencher] |
| Equipe | [Preencher] | [Preencher] | [Preencher] | [Preencher] |

## 10. Hipóteses a validar

| ID | Hipótese | Evidência necessária | Método | Critério de validação | Status |
|---|---|---|---|---|---|
| HIP-001 | [Ex.: conferir completude consome parcela relevante da análise] | [Dado] | [Observação/log] | [Limiar] | [Status] |

## 11. Riscos iniciais

| Risco | Consequência | Probabilidade | Severidade | Mitigação inicial |
|---|---|---:|---:|---|
| Erro de extração parecer um fato | Decisão apoiada em dado incorreto | [1–5] | [1–5] | Mostrar fonte, confiança e revisão |
| Regra desatualizada | Pendência indevida | [1–5] | [1–5] | Versionar regras e validade |
| Viés entre grupos/documentos | Tratamento desigual | [1–5] | [1–5] | Avaliação segmentada e auditoria |
| Exposição de dados pessoais | Dano ao candidato e não conformidade | [1–5] | [1–5] | Minimização, acesso, criptografia, retenção |
| Automação virar decisão de fato | Perda de autonomia profissional | [1–5] | [1–5] | Sem score decisório; revisão e justificativa |

Detalhe e acompanhe os riscos em [Riscos e governança](../05-governanca/riscos-e-governanca.md).

## 12. Perguntas em aberto

- [ ] Qual é a unidade de análise: pessoa, família, candidatura ou documento?
- [ ] Quais inconsistências realmente mudam a preparação da entrevista?
- [ ] Que erro é mais grave em cada etapa: falso alerta ou pendência não detectada?
- [ ] Quais dados não devem entrar no modelo?
- [ ] Quem pode corrigir dados e quem aprova a correção?
- [ ] Por quanto tempo documentos e resultados precisam ser retidos?
- [ ] Como o candidato contesta ou complementa uma informação?

## 13. Aprovação do briefing

| Papel | Nome | Decisão | Data | Observação |
|---|---|---|---|---|
| Produto/projeto | [Nome] | [Aprovado/ajustes] | [Data] | [Texto] |
| Assistência social | [Nome] | [Aprovado/ajustes] | [Data] | [Texto] |
| Privacidade/jurídico | [Nome] | [Aprovado/ajustes] | [Data] | [Texto] |
