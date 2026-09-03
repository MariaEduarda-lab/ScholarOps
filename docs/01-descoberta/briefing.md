# Briefing do projeto

> Documento vivo para alinhar problema, contexto, usuários, escopo e critérios de sucesso. Esta versão consolida pesquisa secundária e a experiência direta do proponente. Afirmações ainda não confirmadas em campo estão identificadas como hipóteses.

## 1. Identificação

| Campo | Preenchimento |
|---|---|
| Nome do projeto | ScholarOps |
| Domínio | Assistência estudantil e bolsas socioeconômicas no ensino superior brasileiro |
| Primeiro recorte proposto | Triagem e preparação da análise documental do Programa de Assistência Estudantil (PAE), previsto na PNAES, e de auxílios socioeconômicos institucionais semelhantes |
| Responsável pelo projeto | Proponente — pesquisa, produto, design e desenvolvimento |
| Equipe | Uma pessoa |
| Sponsor/organização parceira | Não definido; projeto independente em fase de descoberta |
| Data da versão | 2026-09-02 |
| Status | Em validação |

## 2. Resumo executivo

**Problema em uma frase:**
Equipes administrativas e de Serviço Social precisam analisar grandes volumes de formulários e comprovantes socioeconômicos em prazos curtos, mas a conferência é fragmentada, repetitiva e majoritariamente manual, prolongando o processo e consumindo tempo que poderia ser dedicado à entrevista, ao estudo socioeconômico e ao acompanhamento estudantil.

**Oportunidade em uma frase:**
Criar um sistema de apoio que organize o dossiê, extraia informações, verifique requisitos objetivos, mostre pendências e divergências com suas evidências e produza um resumo revisável, sem substituir a interpretação ou o parecer profissional.

**Motivação do projeto:**
O projeto nasce da experiência direta do proponente com esse tipo de processo e da percepção prática de quanto tempo e esforço a análise documental exige. O objetivo principal é aprender, por meio da construção de um produto realista, ao mesmo tempo em que se investiga uma solução útil para uma dor vivenciada e documentada na assistência estudantil.

**Por que agora:**
A pesquisa secundária indica uma combinação de alto volume de candidaturas, prazos exíguos, sistemas instáveis ou pouco integrados, documentos heterogêneos e equipes reduzidas. O atraso da análise pode deixar estudantes sem apoio para alimentação, transporte ou moradia justamente no início do período letivo. A PNAES tem entre seus objetivos garantir condições de permanência e reduzir retenção e evasão, além de prever ações de alimentação, moradia e transporte ([BRASIL, 2024](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14914.htm)). Tecnologias de extração documental e modelos de linguagem tornam possível experimentar parte da automação, desde que usados com limites claros, evidência rastreável e revisão humana.

## 3. Contexto e recorte da política

### 3.1 Tipos de bolsas e auxílios mapeados

A Lei nº 14.914/2024 instituiu a PNAES e passou a tratar o Programa de Assistência Estudantil (PAE) e o Programa de Bolsa Permanência (PBP) como programas distintos dentro da mesma política. Ela também atribui às instituições federais autonomia para definir critérios, metodologia e documentação exigida no PAE ([BRASIL, 2024](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14914.htm)).

| Programa/âmbito | Público e benefício | Fluxo/documentação característica | Relação com o projeto |
|---|---|---|---|
| PAE/PNAES e auxílios institucionais de IFES | Prioritariamente estudantes de cursos presenciais em situações previstas na lei e nos critérios suplementares da instituição; as ações podem envolver alimentação, transporte, moradia, saúde e outros apoios ([BRASIL, 2024](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14914.htm)) | Questionário socioeconômico e documentação definida por cada instituição; exemplos atuais incluem CadÚnico, CNIS, comprovantes de renda, residência e declarações contextuais ([UFVJM, 2026](https://portal.ufvjm.edu.br/editais/proaae/programa-de-assistencia-estudantil/2026/2026-2/diamantina/edital-02-2026-proaae); [IFBA, 2026](https://portal.ifba.edu.br/valenca/ensino/pae-2026)) | **Primeiro recorte proposto**, por concentrar triagem socioeconômica e documentação recorrente |
| Programa Bolsa Permanência — PBP/MEC | Atualmente direcionado sobretudo a estudantes indígenas e quilombolas de cursos presenciais nas instituições federais; o serviço federal também registra a manutenção de beneficiários socioeconomicamente vulneráveis admitidos até 2016 ([MEC, 2025](https://www.gov.br/pt-br/servicos/obter-bolsa-do-programa-de-bolsa-permanencia)) | SISBP/Gov.br e documentação específica de pertencimento e vínculo, conforme normas vigentes do programa ([MEC, 2025](https://www.gov.br/pt-br/servicos/obter-bolsa-do-programa-de-bolsa-permanencia)) | Contexto relevante, mas **fora do MVP**; pertencimento étnico e documentos comunitários exigem governança e desenho específicos |
| Bolsas CEBAS em instituições comunitárias/filantrópicas | Estudantes da educação básica ou superior em instituições privadas sem fins lucrativos certificadas; podem ser bolsas integrais ou parciais ([BRASIL, 2021](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp187.htm); [MEC, s.d.](https://www.gov.br/mec/pt-br/cebas/cebas/)) | Seleção socioeconômica e documentação definida pela instituição conforme a legislação e seu processo seletivo | Segmento adjacente para pesquisa posterior; regras e riscos de fiscalização próprios |

O primeiro recorte é uma decisão provisória de produto, não uma conclusão da pesquisa. Antes do protótipo, deve-se escolher uma instituição ou um único edital como referência e validar se um fluxo do PAE/PNAES é o melhor ponto de entrada.

### 3.2 Jornada atual sintetizada

A sequência abaixo combina as pesquisas fornecidas com exemplos institucionais. Na UFMG, por exemplo, o acesso passa por questionário socioeconômico, documentação definida a partir das respostas e análise pela Fump; determinados benefícios ainda exigem inscrição, chamada ou entrevista adicional ([FUMP, s.d.-a](https://fump.ufmg.br/questionario-socioeconomico/); [FUMP, s.d.-b](https://fump.ufmg.br/faq/); [UFMG, s.d.](https://www.ufmg.br/prae/assistencia-estudantil/como-acessar-a-politica-de-assistencia-estudantil/)). Esse exemplo não deve ser generalizado para todas as instituições.

1. A instituição publica o edital e abre uma janela de inscrição.
2. O estudante preenche um questionário socioeconômico e informa composição familiar, renda, moradia, saúde e outras condições previstas no edital.
3. O estudante e sua família reúnem e enviam os documentos aplicáveis ao contexto informado; em alguns fluxos, a lista é gerada após o questionário ([FUMP, s.d.-b](https://fump.ufmg.br/faq/)).
4. A secretaria ou equipe administrativa recebe os arquivos, organiza o dossiê e confere o checklist.
5. Pendências documentais geram contato, complementação e nova conferência.
6. A equipe de Serviço Social analisa informações e documentos no contexto do estudo socioeconômico.
7. Quando necessário, são realizadas entrevistas e, em alguns contextos, visitas domiciliares.
8. O assistente social emite o parecer técnico; comissão e/ou gestão realiza classificação, homologação, recursos e encaminhamento financeiro.

### 3.3 Documentos e situações de maior complexidade

Editais institucionais recentes confirmam que o conjunto documental pode incluir CNIS, CadÚnico, comprovantes de renda e residência, carteira de trabalho e declarações específicas, mas a relação varia conforme instituição, campus, benefício e contexto familiar ([UFVJM, 2026](https://portal.ufvjm.edu.br/editais/proaae/programa-de-assistencia-estudantil/2026/2026-2/diamantina/edital-02-2026-proaae); [IFBA, 2026](https://portal.ifba.edu.br/valenca/ensino/pae-2026)). Por isso, os itens abaixo são candidatos à pesquisa, não um checklist nacional.

| Documento/situação | Trabalho observado na pesquisa | Por que é complexo |
|---|---|---|
| CNIS de integrantes aplicáveis segundo o edital | Ler vínculos, remunerações e contribuições — informações que compõem o extrato ([BRASIL, 2026](https://www.gov.br/pt-br/servicos/emitir-extrato-de-contribuicao-cnis)) | A leitura precisa considerar período, vínculo e contexto; não se deve inferir renda atual apenas pela presença de um registro |
| CadÚnico/Folha Resumo | Conferir composição, renda e atualização cadastral | Cadastro desatualizado pode exigir comprovação alternativa |
| Holerites e comprovantes formais | Extrair e comparar rendimentos | Meses, verbas e formatos variam; renda bruta e deduções precisam seguir o edital |
| Trabalho informal/autônomo | Analisar declarações e, em alguns casos, movimentações bancárias | Não há comprovante padronizado; médias e recorrências podem exigir contexto profissional |
| Composição familiar | Relacionar moradores, dependência e contribuição financeira | Arranjos familiares reais nem sempre coincidem com categorias administrativas simples |
| Separação de fato e ausência de pensão | Conferir declarações e documentos disponíveis | Há situações sem formalização judicial e com diferentes exigências institucionais |
| Moradia cedida, aluguel e despesas relevantes | Conferir declarações, contratos e comprovantes | Documentos alternativos e informalidade são frequentes |
| Arquivos digitais | Verificar tipo, período, completude e legibilidade | PDFs/imagens podem estar cortados, duplicados, fora do prazo ou nomeados incorretamente |

O sistema não deve interpretar automaticamente contexto familiar, pertencimento étnico, condição de saúde ou intenção. Nesses casos, pode apenas organizar evidências autorizadas e encaminhar para o profissional competente.

### 3.4 Limites do exercício profissional

A Lei nº 8.662/1993 inclui a realização de estudos socioeconômicos com usuários para fins de benefícios e serviços sociais entre as competências do assistente social (art. 4º, XI). A mesma lei define como atribuição privativa a produção de vistorias, perícias técnicas, laudos, informações e pareceres sobre matéria de Serviço Social (art. 5º, IV) ([BRASIL, 1993](https://www.planalto.gov.br/ccivil_03/leis/l8662.htm)). O CFESS também orienta que estudos, documentos e opiniões técnicas envolvem dimensões teórico-metodológicas, ético-políticas e técnico-operativas que não se reduzem ao preenchimento de um formulário ([CFESS, 2022](https://www.cfess.org.br/publicacao/view/226)).

Assim, o ScholarOps limita-se à organização e checagem de informação e não produz parecer social nem se apresenta como substituto do processo metodológico profissional. A distribuição exata de tarefas entre secretaria, equipe multiprofissional e Serviço Social deverá ser confirmada no contexto parceiro.

## 4. Mapeamento da dor

### 4.1 Dores da família e do estudante

Hipóteses geradas

- Interpretar editais longos e regras documentais diferentes entre instituições;
- reunir comprovantes de todos os membros do grupo familiar em uma janela curta;
- obter declarações para trabalho informal, separação de fato, ausência de pensão ou moradia cedida;
- lidar com custos de deslocamento, autenticação ou cartório quando exigidos;
- enfrentar barreiras de letramento digital, acesso a equipamentos e qualidade de conexão;
- receber solicitações de complemento somente depois da submissão;
- aguardar semanas ou meses por um benefício necessário para subsistência e permanência acadêmica;
- correr risco de indeferimento, desistência ou autoexclusão por documentação incompleta.

### 4.2 Dores das secretarias e equipes administrativas

Hipóteses geradas

- Receber centenas de pastas físicas ou arquivos em formatos e qualidades diferentes;
- baixar, renomear, catalogar e localizar documentos dispersos;
- conferir manualmente item a item do edital;
- identificar arquivos ilegíveis, incompletos, vencidos ou atribuídos à pessoa errada;
- notificar pendências e reconferir complementações de forma repetitiva;
- manter planilhas e controles paralelos por falta de integração;
- trabalhar sob picos sazonais, prazos curtos e instabilidade dos portais.

### 4.3 Dores da assistência social

A preocupação é compatível com a orientação do CFESS de que o estudo e a opinião técnica exigem articulação teórica, ética e metodológica ([CFESS, 2022](https://www.cfess.org.br/publicacao/view/226)).

- Investir parcela relevante do tempo em busca, organização, transcrição e conferência documental;
- cruzar manualmente dados de formulários, CNIS, CadÚnico, renda, residência e declarações;
- reconstituir o contexto da família a partir de fontes fragmentadas;
- analisar muitos dossiês em pouco tempo, com pressão por produtividade;
- lidar com regras institucionais, exceções legítimas e informações ambíguas;
- ter menos tempo para entrevista, análise multidimensional, orientação e acompanhamento;
- sofrer pressão para assumir uma função fiscalizatória ou de “fiscal da pobreza”, incompatível com uma abordagem de garantia de direitos;
- preservar sigilo e qualidade técnica mesmo em condições operacionais precárias.

### 4.4 Impactos organizacionais e sociais

| Público | Impacto indicado pela pesquisa | Severidade inicial | Confiança atual |
|---|---|---:|---|
| Estudante/família | Atraso, pedidos repetidos de documentos, custos adicionais, insegurança material e risco de desistência/evasão | 5 | Média; pesquisa secundária, pendente de validação local |
| Secretaria | Acúmulo de fila, extensão de jornada, retrabalho e atraso no edital | 4 | Média |
| Assistência social | Sobrecarga, redução do tempo de análise qualitativa e desgaste ético-profissional | 5 | Média-alta; convergência entre as pesquisas e experiência do proponente |
| Gestão institucional | Baixa previsibilidade, recursos e homologações atrasados, aumento de recursos administrativos | 4 | Média |
| Auditoria/compliance | Evidências dispersas, regras aplicadas de modo pouco rastreável e receio diante de documentos alternativos | 4 | Baixa-média; precisa de pesquisa com responsáveis |

### 4.5 Evidências disponíveis

| Evidência | Fonte | O que indica | Limite da evidência |
|---|---|---|---|
| Fluxo sequencial com triagem, análise, entrevista, parecer e homologação | exemplos Fump/UFMG | Há múltiplos handoffs e atividades manuais antes do parecer | Processos variam por instituição e edital |
| Prazo de 60 a 90 dias citado para análise e homologação | Pesquisas secundárias | Morosidade pode ser material e incompatível com o calendário acadêmico | Estimativa não deve ser tratada como linha de base do projeto sem fonte primária e medição local |
| CNIS, CadÚnico, renda, residência e declarações aparecem de forma recorrente | editais institucionais atuais | Existe um núcleo documental candidato à experimentação | Obrigatoriedade e validade dependem do edital; não há checklist nacional único |
| Sobrecarga e “tarefismo” burocrático | Pesquisas e experiência direta do proponente | A automação deve liberar tempo para trabalho profissional de maior valor | Precisa ser quantificado por observação/entrevista |
| Atrasos afetam alimentação, transporte, moradia e permanência | Pesquisas secundárias | Tempo de processamento é também um problema de impacto social | Parte do atraso pode ser orçamentária/financeira, fora do alcance do produto |

## 5. Pessoas e necessidades

### 5.1 Atores

| Ator | Responsabilidade | Necessidade principal | Decisões que toma | Acesso necessário |
|---|---|---|---|---|
| Estudante/candidato | Preencher dados, enviar documentos e responder pendências | Saber exatamente o que entregar e corrigir erros com clareza | Enviar, complementar ou contestar informações | Própria candidatura e comunicações |
| Familiar do candidato | Fornecer informações e comprovantes aplicáveis | Entender finalidade e forma segura de compartilhamento | Autorizar/fornecer documentos | Somente o necessário para sua participação |
| Secretaria/equipe administrativa | Receber, organizar e triar dossiês | Checklist claro, arquivos organizados e pendências acionáveis | Marcar completude e encaminhar fluxo administrativo | Dados cadastrais e documentais compatíveis com o papel |
| Assistente social | No contexto pesquisado, conduzir estudo socioeconômico e, quando se tratar de matéria de Serviço Social, produzir informação ou parecer profissional ([BRASIL, 1993](https://www.planalto.gov.br/ccivil_03/leis/l8662.htm)) | Contexto consolidado, evidências rastreáveis e menos tarefa repetitiva | Validar informações, aprofundar análise e emitir parecer dentro de suas atribuições | Dossiê completo, histórico e instrumentos profissionais |
| Coordenação/comissão | Gerir edital, filas, recursos e homologação | Visibilidade do andamento e aplicação consistente de regras | Homologar, gerir exceções e recursos | Indicadores agregados e casos sob sua competência |
| TI/operação do sistema | Manter integrações, segurança e disponibilidade | Diagnóstico técnico sem exposição desnecessária de dados | Corrigir falhas e controlar versões | Metadados e logs minimizados |
| Privacidade/jurídico/auditoria | Supervisionar finalidade, conformidade e controles | Rastreabilidade, acesso restrito e regras documentadas | Aprovar controles e orientar incidentes | Auditoria compatível com atribuição |

### 5.2 Trabalhos a realizar (Jobs to Be Done)

1. Quando recebo um novo lote de candidaturas, quero identificar rapidamente quais dossiês estão completos, ilegíveis ou pendentes, para organizar a fila sem reler todos os arquivos.
2. Quando começo uma análise socioeconômica, quero ter um resumo factual com acesso às fontes, para dedicar mais tempo ao contexto, à entrevista e ao parecer.
3. Quando encontro valores ou declarações diferentes, quero ver a divergência e as duas evidências lado a lado, para verificar a situação sem presumir erro ou má-fé.
4. Quando um estudante precisa complementar a candidatura, quero informar exatamente o item e o motivo, para evitar múltiplas rodadas de retrabalho.
5. Quando uma extração ou regra é incerta, quero que o sistema encaminhe o caso à revisão e explique o motivo, para que a automação não esconda riscos.
6. Quando envio minha candidatura, quero entender o que falta e poder corrigir ou contestar uma informação, para não ser excluído por uma falha evitável.

## 6. Objetivos

### 6.1 Objetivo principal — aprendizado aplicado

Aprender a investigar, desenhar, implementar e avaliar um produto de software com IA responsável a partir de uma dor real: o custo humano e operacional da análise documental em processos de assistência estudantil. O sucesso pessoal do projeto é transformar experiência prática e pesquisa em conhecimento verificável, decisões documentadas e um protótipo tecnicamente consistente.

### 6.2 Objetivo de impacto do produto

Explorar se um sistema de apoio consegue reduzir trabalho documental repetitivo e melhorar a preparação da análise socioeconômica, mantendo evidências, incerteza e decisão profissional visíveis.

### 6.3 Objetivos específicos

- [ ] Compreender e documentar o AS-IS de pelo menos um edital/instituição;
- [ ] validar as dores com assistentes sociais, profissionais administrativos e, quando viável, estudantes;
- [ ] construir um inventário dos documentos, campos, regras e exceções do recorte escolhido;
- [ ] criar um conjunto de casos sintéticos representando situações comuns e exceções;
- [ ] prototipar extração de campos com referência à página/região de origem;
- [ ] prototipar verificações objetivas de presença, legibilidade, período e consistência;
- [ ] gerar um resumo estritamente fundamentado nos dados e documentos disponíveis;
- [ ] criar gatilhos explícitos para baixa confiança e revisão humana;
- [ ] avaliar qualidade, erros críticos, tempo economizado e experiência de revisão;
- [ ] documentar aprendizados, limitações e decisões técnicas ao longo do projeto.

### 6.4 Não objetivos

- Tomar automaticamente a decisão de conceder, negar ou priorizar uma bolsa;
- produzir o estudo ou parecer social, que permanece atribuição profissional;
- atribuir score de “merecimento”, vulnerabilidade, fraude ou risco pessoal;
- inferir intenção, honestidade, raça/etnia, saúde, condição familiar ou informação não declarada;
- validar pertencimento indígena ou quilombola no primeiro ciclo;
- substituir entrevista, visita domiciliar, acompanhamento ou julgamento contextual;
- resolver atrasos de orçamento, repasse financeiro ou dimensionamento insuficiente das equipes;
- integrar Gov.br, CNIS, CadÚnico, Receita Federal ou sistemas institucionais no primeiro protótipo;
- implantar em produção ou usar dados pessoais reais antes de governança e parceria formal.

## 7. Escopo do primeiro ciclo

### 7.1 Dentro do escopo

| Capacidade | Caso de uso inicial | Usuário | Prioridade |
|---|---|---|---|
| Lista de candidaturas | Exibir casos sintéticos, status do processamento e pendências | Secretaria/assistente social | P0 |
| Ingestão controlada | Receber formulário e poucos tipos de documento sintético/anonimizado | Pesquisador | P0 |
| Classificação | Identificar o tipo provável de cada documento e mostrar confiança | Secretaria | P0 |
| Extração | Extrair um conjunto pequeno de campos de CNIS, CadÚnico/Folha Resumo e comprovante de renda ou residência | Secretaria/assistente social | P0 |
| Verificação objetiva | Identificar ausência, arquivo ilegível, período inválido e diferença entre campos definidos | Secretaria/assistente social | P0 |
| Resumo fundamentado | Sintetizar composição documental, dados extraídos e pontos a confirmar, sempre com fonte | Assistente social | P0 |
| Revisão humana | Corrigir extração, confirmar evidência e registrar justificativa | Assistente social/pesquisador | P0 |
| Encaminhamento | Separar casos completos, pendentes, com baixa confiança ou falha técnica | Secretaria/assistente social | P1 |
| Analytics do piloto | Medir tempo, correções, falsos alertas e falhas por documento/campo | Pesquisador | P1 |

### 7.2 Fora do primeiro ciclo

- Fluxo completo de inscrição do estudante e comunicação oficial de resultado;
- classificação socioeconômica, ranking ou alocação de orçamento;
- análise automática de extratos bancários completos;
- análise de laudos ou inferência sobre saúde e deficiência;
- validação de declarações de pertencimento indígena/quilombola;
- autenticação documental forense ou acusação de fraude;
- integrações com bases públicas e sistemas de produção;
- parecer social, homologação, recurso e pagamento.

## 8. Princípios e requisitos de produto

1. **Apoio, não decisão:** o sistema prepara informação; profissionais habilitados interpretam e decidem.
2. **Fonte sempre acessível:** cada campo, alerta e frase crítica aponta para sua origem.
3. **Incerteza explícita:** “não encontrado”, “ilegível”, “divergente” e “não aplicável” são estados distintos.
4. **Linguagem não acusatória:** inconsistência significa apenas diferença entre fontes até revisão.
5. **Correção e discordância:** o usuário pode corrigir, confirmar ou rejeitar a saída, registrando o motivo.
6. **Regra versionada:** todo check deve ter origem no edital ou ser marcado como hipótese.
7. **Minimização:** somente dados necessários ao experimento são utilizados; dados sintéticos são o padrão. O princípio de necessidade da LGPD limita o tratamento ao mínimo necessário para a finalidade ([BRASIL, 2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)).
8. **Sem automação silenciosa:** baixa confiança e falha técnica devem aparecer e gerar encaminhamento.
9. **Separação de papéis:** triagem administrativa não se confunde com análise e parecer social.
10. **Aprendizado documentado:** falhas e resultados negativos também são entregas válidas do projeto.

## 9. Regras e critérios conhecidos

As pesquisas mostram padrões, mas não substituem o edital que será escolhido como fonte normativa.

| ID | Regra/padrão inicial | Fonte atual | Status | Exceções/observações |
|---|---|---|---|---|
| REG-001 | No PAE, critérios, metodologia e documentação comprobatória são definidos pelas instituições, observados a lei e seus regulamentos | [Brasil (2024)](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14914.htm), art. 7º | Confirmado em fonte primária | Não criar checklist universal; usar edital versionado |
| REG-002 | CNIS é solicitado em processos institucionais atuais, mas sua aplicabilidade depende do edital e do integrante familiar | [UFVJM (2026)](https://portal.ufvjm.edu.br/editais/proaae/programa-de-assistencia-estudantil/2026/2026-2/diamantina/edital-02-2026-proaae); [IFBA (2026)](https://portal.ifba.edu.br/valenca/ensino/pae-2026) | Confirmado apenas nesses contextos | Idade, validade e alternativas devem vir do edital escolhido |
| REG-003 | CadÚnico/Folha Resumo pode exigir atualização dentro de período definido pelo edital | [UFFS (2026)](https://boletim-mgm.uffs.edu.br/atos-normativos/edital/gr/2026-0349) | Confirmado no edital consultado, não como regra universal | O prazo deve ser parametrizado pela fonte normativa do recorte |
| REG-004 | Comprovantes de renda variam conforme vínculo formal, autônomo, informal ou benefício | Pesquisas secundárias | Fato geral; regra local pendente | Não inferir renda ausente sem revisão |
| REG-005 | Divergência documental deve provocar verificação, não conclusão automática | Princípio do projeto | Decisão proposta | Sempre mostrar ambas as fontes |
| REG-006 | Estudos socioeconômicos constam entre as competências do assistente social; informações e pareceres sobre matéria de Serviço Social são atribuições privativas | [Brasil (1993)](https://www.planalto.gov.br/ccivil_03/leis/l8662.htm), arts. 4º, XI, e 5º, IV | Confirmado na lei; aplicação concreta requer validação profissional | O produto não produz parecer social |

## 10. Resultados e métricas

Como o objetivo principal é aprendizado, o projeto terá métricas de aprendizagem, produto e segurança. Metas numéricas serão definidas após a linha de base e o primeiro conjunto de avaliação.

| Resultado desejado | Indicador | Linha de base | Meta inicial | Guardrail |
|---|---|---|---|---|
| Aprendizado sobre o domínio | AS-IS validado, entrevistas realizadas e hipóteses atualizadas | Não iniciada | Um fluxo institucional documentado e revisado por profissionais | Não generalizar uma única instituição para todo o país |
| Aprendizado técnico | Experimentos reproduzíveis e decisões registradas | Não iniciada | Pipeline de ponta a ponta com dados sintéticos | Resultado negativo deve ser documentado, não ocultado |
| Menor esforço repetitivo | Minutos ativos por dossiê/tarefa | A medir | Redução demonstrável no teste | Não aumentar correções ou tempo total |
| Extração confiável | Exatidão por campo e tipo de documento | A medir | Definida por criticidade do campo | Campo crítico incorreto exige revisão/fallback |
| Pendências úteis | Precision/recall por regra e taxa de falso alerta | A medir | A definir com profissional | Monitorar especialmente pendência não detectada |
| Resumo fundamentado | Percentual de afirmações sustentadas pelas fontes | A medir | 100% para afirmações factuais críticas | Zero invenções críticas aceitas |
| Revisão adequada | Percentual de casos críticos corretamente encaminhados | A medir | A definir por cenário | Sistema nunca deve ocultar falha ou baixa confiança |
| Boa experiência profissional | Utilidade percebida, clareza e taxa de correção | A medir | Avaliação qualitativa positiva no teste | Não induzir confirmação automática |

## 11. Restrições e dependências

| Tipo | Restrição/dependência | Impacto | Tratamento inicial | Responsável |
|---|---|---|---|---|
| Equipe | Uma única pessoa acumula pesquisa, design, desenvolvimento e avaliação | Limita escopo e reduz revisão independente | Trabalhar com um edital, poucos documentos e fases curtas | Proponente |
| Conhecimento do domínio | Experiência própria não substitui diversidade de práticas profissionais | Risco de desenhar para um único caso | Entrevistar/validar com profissionais e registrar divergências | Proponente |
| Parceria | Ainda não há organização ou sponsor definidos | Sem acesso legítimo a processo e dados reais | Usar dados sintéticos até parceria e governança formal | Proponente |
| Dados | Documentos contêm informações pessoais e podem conter dados sensíveis definidos pela LGPD ([BRASIL, 2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)) | Restringe coleta, teste e exposição | Sintéticos por padrão; base legal, finalidade, segurança e eventual anonimização devem ser validadas antes de casos reais | Proponente + futuro parceiro |
| Regras | Editais e exigências variam no tempo e entre instituições | Regra genérica pode produzir alerta indevido | Escolher uma versão de edital e versionar cada regra | Proponente + especialista |
| Legal/ética | Assistência estudantil envolve direitos e atuação profissional regulamentada | Automação inadequada pode causar dano | Revisão com assistência social e privacidade antes de piloto | Futuro parceiro |
| Técnica | PDFs, fotos, digitalizações e tabelas têm qualidade variável | Extração pode falhar de forma desigual | Avaliar por documento/campo, mostrar confiança e fallback | Proponente |
| Integração | Bases governamentais e sistemas institucionais não estão disponíveis ao projeto | Limita validação automática | Não incluir integração no MVP | Proponente |

## 12. Hipóteses a validar

| ID | Hipótese | Evidência necessária | Método | Critério de validação | Status |
|---|---|---|---|---|---|
| HIP-001 | Organização e conferência básica consomem parcela relevante do tempo da equipe | Tempo por atividade e relatos convergentes | Observação contextual + cronometragem | Tarefa aparece entre os maiores custos do fluxo | Em aberto |
| HIP-002 | CNIS, CadÚnico e comprovantes de renda/residência formam um primeiro conjunto útil | Frequência e importância por edital | Análise de editais + entrevistas | Pequeno conjunto cobre parte relevante dos casos do recorte | Em aberto |
| HIP-003 | Resumo com fontes reduz preparação sem reduzir entendimento | Comparação com e sem apoio | Teste de tarefa com profissionais | Menor tempo com qualidade igual ou superior | Em aberto |
| HIP-004 | Exibir divergências lado a lado é mais útil que um alerta genérico | Comportamento e feedback do usuário | Teste de protótipo | Usuário explica e resolve o caso com menos busca | Em aberto |
| HIP-005 | Correção humana pode gerar dados de avaliação sem virar confirmação automática | Taxa/qualidade de correção | Teste de usabilidade | Usuários corrigem quando necessário e entendem limites | Em aberto |
| HIP-006 | O primeiro recorte deve ser um fluxo institucional do PAE/PNAES | Acesso, recorrência da dor e viabilidade | Entrevistas + seleção de edital | Há parceiro/contexto e documentos adequados ao estudo | Em aberto |
| HIP-007 | Parte relevante da demora está ao alcance do produto documental | Decomposição do lead time | AS-IS quantitativo | Triagem/análise documental representa gargalo mensurável | Em aberto |

## 13. Riscos iniciais

| Risco | Consequência | Probabilidade inicial | Severidade | Mitigação inicial |
|---|---|---:|---:|---|
| Escopo amplo demais para uma pessoa | Protótipo superficial e pesquisa inconclusiva | 5 | 4 | Um edital, 2–3 documentos e um fluxo principal |
| Experiência pessoal dominar a definição | Solução refletir apenas um contexto | 4 | 4 | Triangulação com profissionais, estudantes e evidências |
| Erro de extração parecer um fato | Análise apoiada em dado incorreto | 4 | 5 | Fonte, confiança, distinção visual e revisão |
| Regra desatualizada ou generalizada | Pendência indevida | 4 | 5 | Fonte oficial, versão, testes e owner |
| Viés por formato, letramento ou contexto | Mais erros e barreiras para alguns candidatos | 3 | 5 | Casos variados, métricas segmentadas e fallback |
| Exposição de dados pessoais | Dano ao candidato e não conformidade | 3 | 5 | Dados sintéticos, minimização, acesso e retenção |
| Automação virar decisão de fato | Redução da autonomia profissional e possível exclusão | 3 | 5 | Sem score/parecer; justificativa e auditoria humana |
| Linguagem sugerir fraude ou culpa | Relação punitiva com estudante | 3 | 5 | Descrever fatos observáveis e permitir contestação |
| Otimizar apenas velocidade | Perda de qualidade e de escuta profissional | 4 | 5 | Métricas de qualidade, segurança e experiência junto ao tempo |
| Confundir demora documental com demora orçamentária | Prometer impacto que o produto não entrega | 4 | 3 | Mapear causas e limitar atribuição do resultado |

Detalhe e acompanhe os riscos em [Riscos e governança](../05-governanca/riscos-e-governanca.md).

## 14. Perguntas em aberto

- [ ] Qual instituição e qual versão de edital serão usadas como referência?
- [ ] Quem será o primeiro usuário: secretaria administrativa ou assistente social?
- [ ] Onde termina a triagem administrativa e começa a análise profissional nesse contexto?
- [ ] Quais 2–3 documentos aparecem com maior frequência e consomem mais tempo?
- [ ] Qual unidade será exibida: candidatura, estudante, grupo familiar ou dossiê?
- [ ] Quanto do prazo atual decorre de documentos, fila, entrevista, recurso ou orçamento?
- [ ] Quais divergências mudam a preparação da entrevista?
- [ ] Qual erro é mais grave por tarefa: falso alerta ou condição não detectada?
- [ ] Que informações nunca devem ser processadas por modelo generativo?
- [ ] Como estudante e profissional corrigem ou contestam uma informação?
- [ ] Que parceria permitiria observar o processo sem expor dados pessoais?
- [ ] Que conhecimento representa “aprendizado suficiente” para encerrar cada fase?

## 15. Próximas decisões

1. Selecionar um edital real e vigente apenas como referência de regras, sem coletar candidaturas;
2. entrevistar de três a cinco profissionais envolvidos em triagem ou análise socioeconômica;
3. transformar o fluxo geral em um AS-IS específico e mensurável;
4. priorizar até três tipos de documento;
5. criar casos sintéticos comuns, limítrofes e de falha;
6. somente então escolher técnicas e ferramentas para o primeiro experimento.

## 16. Checagem factual desta versão

| Afirmação conferida | Resultado | Tratamento no briefing |
|---|---|---|
| PNAES, PAE e PBP eram usados como se fossem equivalentes | A Lei nº 14.914/2024 institui a PNAES e distingue PAE e PBP | Terminologia corrigida para “PAE/PNAES” quando o assunto é o fluxo institucional de assistência |
| Existiria uma lista nacional única de documentos | Incorreto: no PAE, as instituições definem critérios, metodologia e documentação, observados lei e regulamento | CNIS, CadÚnico e demais comprovantes são exemplos de editais, não requisitos universais |
| Toda análise socioeconômica seria atribuição legalmente privativa | Impreciso: o art. 4º, XI, apresenta o estudo socioeconômico como competência; o art. 5º, IV, torna privativos laudos, informações e pareceres sobre matéria de Serviço Social | Texto corrigido e limite do produto mantido por segurança e respeito profissional |
| PBP atende principalmente indígenas e quilombolas | Confirmado no serviço federal vigente; permanecem também beneficiários socioeconomicamente vulneráveis admitidos até 2016 | Descrição atualizada e PBP mantido fora do MVP |
| CEBAS pode envolver bolsas integrais e parciais na educação superior | Confirmado pelo portal do MEC; o CEBAS também alcança educação básica | Descrição restringe o interesse do projeto ao ensino superior sem afirmar que esse é o único nível atendido |
| CNIS e CadÚnico aparecem em processos institucionais atuais | Confirmado em editais e páginas institucionais consultados | Mantidos como candidatos ao protótipo, condicionados à seleção de um edital específico |
| A análise e homologação levam de 60 a 90 dias | Não confirmado em fonte primária comum a todo o domínio | Mantido apenas como estimativa dos textos de pesquisa e explicitamente excluído da linha de base até medição local |
| Morosidade decorre somente da conferência documental | Incorreto: os materiais fornecidos indicam fatores institucionais e orçamentários além do processamento de documentos | O briefing limita o impacto esperado à parcela documental do fluxo |

Esta conferência reduz erros conceituais, mas não substitui validação jurídica ou profissional no contexto de uma instituição parceira.

## 17. Referências bibliográficas

Referências organizadas em formato próximo à ABNT NBR 6023:2018. A data de acesso registra a última conferência desta versão do briefing.

BRASIL. **Lei nº 8.662, de 7 de junho de 1993**. Dispõe sobre a profissão de Assistente Social e dá outras providências. Brasília, DF: Presidência da República, 1993. Disponível em: <https://www.planalto.gov.br/ccivil_03/leis/l8662.htm>. Acesso em: 2 set. 2026.

BRASIL. **Lei nº 13.709, de 14 de agosto de 2018**. Lei Geral de Proteção de Dados Pessoais (LGPD). Brasília, DF: Presidência da República, 2018. Disponível em: <https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm>. Acesso em: 2 set. 2026.

BRASIL. **Lei Complementar nº 187, de 16 de dezembro de 2021**. Dispõe sobre a certificação das entidades beneficentes e regula procedimentos referentes à imunidade de contribuições à seguridade social. Brasília, DF: Presidência da República, 2021. Disponível em: <https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp187.htm>. Acesso em: 2 set. 2026.

BRASIL. **Lei nº 14.914, de 3 de julho de 2024**. Institui a Política Nacional de Assistência Estudantil (PNAES). Brasília, DF: Presidência da República, 2024. Disponível em: <https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14914.htm>. Acesso em: 2 set. 2026.

BRASIL. Instituto Nacional do Seguro Social. **Emitir Extrato de Contribuição (CNIS)**. Brasília, DF: Gov.br, 2026. Disponível em: <https://www.gov.br/pt-br/servicos/emitir-extrato-de-contribuicao-cnis>. Acesso em: 2 set. 2026.

CFESS — CONSELHO FEDERAL DE SERVIÇO SOCIAL. **Produção de documentos e emissão de opinião técnica em Serviço Social**. Organização de Abigail Aparecida de Paiva Franco, Eunice Teresinha Fávero e Rita de Cássia Silva Oliveira. Brasília, DF: CFESS, 2022. Disponível em: <https://www.cfess.org.br/publicacao/view/226>. Acesso em: 2 set. 2026.

FUMP — FUNDAÇÃO UNIVERSITÁRIA MENDES PIMENTEL. **Como acessar: Questionário Socioeconômico**. Belo Horizonte: Fump, [s.d.-a]. Disponível em: <https://fump.ufmg.br/questionario-socioeconomico/>. Acesso em: 2 set. 2026.

FUMP — FUNDAÇÃO UNIVERSITÁRIA MENDES PIMENTEL. **FAQ**. Belo Horizonte: Fump, [s.d.-b]. Disponível em: <https://fump.ufmg.br/faq/>. Acesso em: 2 set. 2026.

IFBA — INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DA BAHIA. **Programa de Assistência Estudantil — PAE 2026: Campus Valença**. Valença: IFBA, 2026. Disponível em: <https://portal.ifba.edu.br/valenca/ensino/pae-2026>. Acesso em: 2 set. 2026.

MEC — MINISTÉRIO DA EDUCAÇÃO. **Certificação das Entidades Beneficentes de Assistência Social — CEBAS**. Brasília, DF: MEC, [s.d.]. Disponível em: <https://www.gov.br/mec/pt-br/cebas/cebas/>. Acesso em: 2 set. 2026.

MEC — MINISTÉRIO DA EDUCAÇÃO. **Obter bolsa do Programa Bolsa Permanência**. Brasília, DF: MEC, 2025. Disponível em: <https://www.gov.br/pt-br/servicos/obter-bolsa-do-programa-de-bolsa-permanencia>. Acesso em: 2 set. 2026.

UFFS — UNIVERSIDADE FEDERAL DA FRONTEIRA SUL. **Edital nº 349/GR/UFFS/2026**. Chapecó: UFFS, 2026. Disponível em: <https://boletim-mgm.uffs.edu.br/atos-normativos/edital/gr/2026-0349>. Acesso em: 2 set. 2026.

UFMG — UNIVERSIDADE FEDERAL DE MINAS GERAIS. Pró-Reitoria de Assuntos Estudantis. **Como acessar a política de assistência estudantil**. Belo Horizonte: UFMG, [s.d.]. Disponível em: <https://www.ufmg.br/prae/assistencia-estudantil/como-acessar-a-politica-de-assistencia-estudantil/>. Acesso em: 2 set. 2026.

UFVJM — UNIVERSIDADE FEDERAL DOS VALES DO JEQUITINHONHA E MUCURI. **Edital nº 02/2026/PROAAE: processo de solicitação/classificação do benefício do PAE — Diamantina**. Diamantina: UFVJM, 12 fev. 2026. Disponível em: <https://portal.ufvjm.edu.br/editais/proaae/programa-de-assistencia-estudantil/2026/2026-2/diamantina/edital-02-2026-proaae>. Acesso em: 2 set. 2026.




