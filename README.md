# ScholarOps

Base de pesquisa e descoberta para um sistema de apoio à análise de candidaturas a bolsas.

O produto pretende ajudar equipes de assistência social a:

1. extrair informações de formulários e documentos;
2. verificar presença, legibilidade, validade e compatibilidade de documentos;
3. detectar pendências e possíveis inconsistências;
4. resumir a candidatura com evidências rastreáveis;
5. encaminhar casos para o fluxo adequado;
6. indicar quando a revisão humana é necessária.

> O ScholarOps é um sistema de apoio, não um decisor automático. Aprovação, reprovação e parecer social permanecem sob responsabilidade de profissionais autorizados. Sinais produzidos pelo sistema devem apresentar fonte, justificativa, nível de confiança e permitir correção humana.

## Como usar este repositório

Preencha os documentos na ordem abaixo. Substitua os campos entre `[colchetes]`, registre evidências e marque hipóteses que ainda precisam ser validadas.

| Etapa | Documento | Resultado esperado |
|---|---|---|
| 1 | [Briefing do projeto](docs/01-descoberta/briefing.md) | Problema, usuários, escopo, resultados e restrições alinhados |
| 2 | [Mapeamento dos processos-alvo](docs/01-descoberta/mapeamento.md) | Fluxos e matrizes documentais do Inteli, Bom Aluno BH e Marista descritos e verificados |
| 3 | [AS-IS — operações e analytics](docs/02-as-is/processo-atual.md) | Processo atual, gargalos, regras e linha de base mensurados |
| 4 | [Inventário de documentos e dados](docs/02-as-is/inventario-documentos-dados.md) | Entradas, campos, qualidade e sensibilidade conhecidos |
| 5 | [Plano de pesquisa](docs/04-pesquisa/plano-de-pesquisa.md) | Entrevistas e observações organizadas para validar hipóteses |
| 6 | [Processo técnico TO-BE](docs/03-processo-tech/processo-tecnico.md) | Pipeline, arquitetura, revisão humana e avaliação definidos |
| 7 | [Riscos e governança](docs/05-governanca/riscos-e-governanca.md) | Salvaguardas de privacidade, segurança, justiça e operação |

Use ainda:

- [Documentação de usabilidade e front-end](docs/02-as-is/usabilidade-frontend.md) para consultar os wireframes, fluxos e critérios iniciais da interface;
- [Registro de decisões](docs/05-governanca/registro-de-decisoes.md) para documentar escolhas importantes;
- [Glossário](docs/glossario.md) para padronizar termos do processo;
- [Bases sintéticas de documentos](dados/sinteticos/README.md) para testar os três processos sem usar dados pessoais reais;
- [Ficha de candidato fictício](dados/exemplos/candidato-ficticio.md) somente para testes iniciais, sem dados pessoais reais.

## Aplicações

O protótipo do frontend está em `apps/frontend`. Para executá-lo:

```bash
cd apps/frontend
npm install
npm run dev
```

O ambiente Python do futuro backend fica na `.venv` da raiz. Consulte `apps/backend/README.md` e ative-o com:

```bash
source .venv/bin/activate
python -m pip install -r apps/backend/requirements-dev.txt
```

## Estrutura

```text
ScholarOps/
├── README.md
├── docs/
│   ├── 01-descoberta/       # briefing e definição do problema
│   ├── 02-as-is/            # processo atual, operações, métricas e dados
│   ├── 03-processo-tech/     # processo futuro e desenho técnico
│   ├── 04-pesquisa/         # plano, entrevistas e aprendizados
│   ├── 05-governanca/       # riscos, controles e decisões
│   └── glossario.md
├── dados/
│   └── exemplos/            # apenas dados sintéticos/fictícios
└── templates/               # modelos reutilizáveis para cada estudo/ciclo
```

## Convenções de trabalho

Ao preencher os documentos, classifique as afirmações:

- **Fato:** confirmado por fonte ou observação registrada;
- **Hipótese:** ainda precisa ser testada;
- **Decisão:** escolha aprovada, com responsável e data;
- **Dúvida:** questão aberta que impede ou altera uma decisão.

Para itens de pesquisa, use o estado `não iniciado`, `em andamento`, `validado` ou `descartado`. Nunca inclua CPF, dados bancários, laudos, endereços ou documentos reais no Git.

## Princípios do produto

- **Revisão humana por padrão:** automação prepara e organiza; profissionais decidem.
- **Evidência antes de alerta:** toda pendência ou inconsistência aponta para documento, campo ou regra que a originou.
- **Incerteza visível:** baixa confiança gera revisão, nunca uma conclusão silenciosa.
- **Minimização de dados:** coletar e reter apenas o necessário para finalidade definida.
- **Contestabilidade:** correções, justificativas e divergências precisam ser registráveis.
- **Sem atalhos discriminatórios:** atributos sensíveis não são usados como proxies para risco ou merecimento.
- **Auditabilidade:** entradas, versões de regras/modelos, saídas e ações humanas ficam rastreáveis.

## Critério inicial de sucesso

O primeiro protótipo deve provar que consegue reduzir trabalho repetitivo e melhorar a preparação para entrevistas sem diminuir a qualidade da análise, ocultar incertezas ou transferir a decisão profissional para o modelo. A linha de base e as metas serão definidas no documento AS-IS.
