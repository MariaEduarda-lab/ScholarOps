# ScholarOps

> **Fase atual: validação do problema, pesquisa de stacks e protótipo de demonstração.** Pesquisa revisada em 21/09/2026.

O ScholarOps é um projeto de apoio à análise de candidaturas a bolsas e auxílios socioeconômicos. A proposta é organizar formulários e documentos, conferir informações objetivas e preparar um resumo com evidências para a assistente social, reduzindo o tempo de leitura repetitiva e de preparação das entrevistas.

A descoberta considera Inteli, Bom Aluno BH e Marista Dom Silvério, além do contexto de assistência estudantil descrito no briefing. São referências de pesquisa, **não parceiros confirmados nem processos intercambiáveis**. O primeiro piloto ainda precisa escolher uma instituição, um edital e uma edição.

## Pesquisa e decisões

A pesquisa detalhada está no [README de criação do projeto](docs/00-criacao-projeto/README.md). Ele reúne validação documental, preparação de entrevistas, combinações de stacks, casos de empresas, privacidade e experimentos. O [estudo de escalabilidade e custos](docs/00-criacao-projeto/escalabilidade-e-custos.md) apresenta arquitetura, cenários quantitativos e critérios para crescer.

| Pergunta | Onde encontrar a resposta |
|---|---|
| O que significa um documento estar “válido”? | [Camadas de validação](docs/00-criacao-projeto/README.md#2-validação-documental) |
| Como confrontar o formulário com os comprovantes? | [Comparação, regras e evidências](docs/00-criacao-projeto/README.md#2-validação-documental) |
| Como resumir a história e preparar perguntas? | [Copiloto de entrevista](docs/00-criacao-projeto/README.md#3-preparação-de-entrevistas) |
| Quais stacks experimentar primeiro? | [Trilhas de stack](docs/00-criacao-projeto/README.md#5-trilhas-de-stack) |
| Que empresas fazem algo relacionado? | [Casos reais e limites da comparação](docs/00-criacao-projeto/README.md#7-casos-reais) |
| Como reduzir exposição aos agentes e fornecedores? | [Privacidade e fronteiras de acesso](docs/00-criacao-projeto/README.md#8-privacidade-e-segurança) |
| O que acontece com milhares de inscrições? | [Escalabilidade e custos](docs/00-criacao-projeto/escalabilidade-e-custos.md) |

## O que existe hoje

A análise abaixo descreve o código do repositório, sem pressupor infraestrutura implantada:

| Área | Estado observado | Próxima capacidade necessária |
|---|---|---|
| Interface | React, TypeScript e Vite; telas de candidaturas, operação e métricas | Testar a conferência lado a lado e a edição do resumo com profissionais |
| API | FastAPI, Pydantic e SQLAlchemy | Autenticação, autorização e processamento assíncrono durável |
| Banco | SQLite é o padrão em configuração; há dependência para PostgreSQL | Validar PostgreSQL, migrações e isolamento por instituição no piloto |
| Ingestão | CSV/XLSX e linhas de API com metadados e resultados simulados | Receber PDFs/imagens, extrair campos e guardar suas evidências |
| Análise | Provedor de demonstração com texto Lorem ipsum e alternativa determinística | Benchmark de extração, regras e geração de resumo |
| Dados | Fixtures sintéticas tabulares para três processos | Corpus de PDFs/imagens com gabarito independente para avaliar OCR |
| Instituições | Seleção por cabeçalho de demonstração | Identidade autenticada e vínculo de acesso verificado no servidor |

Fontes locais: [configuração](apps/backend/app/core/config.py), [ingestão](apps/backend/app/services/ingestion.py), [análise](apps/backend/app/services/analysis.py) e [dependência de instituição](apps/backend/app/api/dependencies.py). Ter uma biblioteca instalada ou um campo de confiança não comprova que a capacidade correspondente está implementada ou validada.

## Dois problemas prioritários

### 1. Conferência de documentos

A profissional precisa ver o que o estudante declarou, o que foi extraído, a pessoa e o período a que cada informação se refere e a regra do edital utilizada.

“Válido” será decomposto em presença, legibilidade, completude, período, titularidade, consistência e, quando aplicável, verificação de assinatura. Uma assinatura válida atesta aspectos de integridade/autoria; não comprova o conteúdo socioeconômico. [Cartilha do VALIDAR/ITI](https://validar.iti.gov.br/Docs/cartilha-de-uso.pdf)

Por exemplo, R$ 2.500 de renda bruta declarada e R$ 2.300 líquidos no holerite não devem gerar divergência automática: as bases de comparação são diferentes. O sistema deve explicar isso e permitir confirmação humana.

### 2. Preparação de entrevistas

O copiloto deve produzir um resumo factual, com fontes, pontos ainda desconhecidos e perguntas abertas que a assistente social possa editar. O objetivo inicial é diminuir o tempo de preparação e de busca de informações. A redução do número ou da duração das entrevistas depende de pesquisa própria e das regras do processo.

Parecer social, interpretação profissional e decisão sobre benefícios permanecem humanos. Essa fronteira respeita as atribuições previstas na [Lei nº 8.662/1993](https://www.planalto.gov.br/ccivil_03/leis/l8662.htm).

## Direção técnica para experimentar

**Recomendação provisória:** aproveitar React/FastAPI, testar PostgreSQL, storage privado, uma fila durável e workers separados. Comparar um extrator local com um gerenciado; adicionar geração estruturada de resumo depois de estabelecer fontes e revisão.

As alternativas principais são:

- **Enxuta/híbrida:** Docling com OCR local, PostgreSQL, Celery e um provedor de IA avaliado; permite aprender preservando a base existente.
- **Azure:** Document Intelligence, Blob Storage, Service Bus, Container Apps e identidade institucional.
- **AWS:** Textract, S3, SQS, ECS/Fargate e modelos via Bedrock quando aprovados.
- **Google Cloud:** Document AI, Cloud Storage, Cloud Tasks/Pub/Sub, Cloud Run e modelos Gemini em serviço empresarial.
- **Ambiente institucional local:** extração e modelo executados na infraestrutura controlada, com equipe responsável por segurança, hardware e atualizações.

São desenhos candidatos, não benchmarks concluídos. Serviços de uma mesma nuvem podem ter regiões, retenção e cotas diferentes. A [matriz técnica](docs/00-criacao-projeto/README.md#5-trilhas-de-stack) explica vantagens, limitações e critérios de escolha.

## Escalabilidade e privacidade desde o início

O crescimento deve considerar páginas e megabytes por candidatura, concentração de uploads no prazo final, cotas de OCR/LLM, conexões de banco, custo por caso e capacidade da equipe de revisão.

Uma simulação de **5.000 candidaturas × 10 documentos × 3 páginas** representa **150.000 páginas**, não 5.000 chamadas de OCR. O estudo detalha o cálculo, a drenagem da fila, reprocessamentos e horas humanas — todos como hipóteses de planejamento, não medições do protótipo.

Para privacidade, separar originais, campos de comparação e contexto enviado ao modelo. Pseudonimizar reduz exposição, mas um relato familiar pode continuar identificável. Não há garantia absoluta de ausência de vazamento: são necessários autorização por caso, isolamento entre instituições, restrição de saída de rede, contratos e testes de acesso. A LGPD distingue dados pessoais, sensíveis e tratamento de crianças/adolescentes; a governança deve considerar cada finalidade e titular. [LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm)

## Próximos passos

| Prioridade | Entrega | Evidência para avançar |
|---|---|---|
| 1 | Escolher processo e entrevistar profissionais/estudantes | Fluxo, dor, exceções e tempo de trabalho observados |
| 2 | Formalizar documentos e regras de duas famílias documentais | Critérios revisados pelo responsável institucional |
| 3 | Criar corpus documental e gabarito separados | PDFs/imagens, fontes por campo e casos difíceis |
| 4 | Comparar extrator local e gerenciado | Exatidão por campo, custo, latência e taxa de revisão |
| 5 | Construir conferência com fonte e correção | Teste de usabilidade e tempo líquido economizado |
| 6 | Comparar resumo por template e por LLM | Fidelidade, cobertura, perguntas úteis e tempo de edição |
| 7 | Preparar isolamento e operação | Autorização real, fila, idempotência, exclusão e restauração testadas |
| 8 | Realizar piloto em modo de observação | Saídas comparadas à análise humana sem afetar o candidato |
| 9 | Decidir expansão | Qualidade, privacidade, orçamento e capacidade humana sustentáveis |

As metas e o roteiro de experimentos estão na [pesquisa técnica](docs/00-criacao-projeto/README.md#9-plano-de-validação). Resultados sintéticos não demonstram desempenho em produção.

## Navegação do repositório

- [Criação do projeto e pesquisa técnica](docs/00-criacao-projeto/pesquisa-propostas.md)
- [Briefing](docs/01-descoberta/briefing.md) e [mapeamento institucional](docs/01-descoberta/mapeamento.md)
- [Processo atual](docs/02-as-is/processo-atual.md), [inventário](docs/02-as-is/inventario-documentos-dados.md) e [usabilidade](docs/02-as-is/usabilidade-frontend.md)
- [Template do processo técnico futuro](docs/03-processo-tech/processo-tecnico.md)
- [Frontend](apps/frontend/README.md) e [backend](apps/backend/README.md)
- [Bases sintéticas](dados/sinteticos/README.md) e [candidato fictício](dados/exemplos/candidato-ficticio.md)

Registrar conclusões como **fato observado**, **hipótese**, **proposta** ou **decisão aprovada**. Não versionar documentos reais, credenciais ou conteúdo de candidaturas no Git.
