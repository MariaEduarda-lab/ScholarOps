#!/usr/bin/env python3
"""Gera fixtures documentais sintéticas e determinísticas para o ScholarOps."""

from __future__ import annotations

import csv
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "dados" / "sinteticos"
NA = "nao_se_aplica"

HEADER = [
    "instituicao",
    "edicao",
    "candidatura_id",
    "cenario_teste",
    "membro_id",
    "relacao",
    "idade",
    "ocupacao",
    "categoria_documental",
    "tipo_documento",
    "regra_aplicabilidade",
    "obrigatoriedade",
    "arquivo_id",
    "status_documento",
    "competencia",
    "valor_declarado",
    "valor_extraido",
    "confianca_extracao",
    "pendencia_esperada",
    "revisao_humana_esperada",
    "nivel_confirmacao_fonte",
]

PREFIXOS = {
    "inteli": "INT",
    "bom_aluno_bh": "BOM",
    "marista_dom_silverio": "MAR",
}

PENDENCIAS = {
    "ok": "nenhuma",
    "faltante": "solicitar_documento_faltante",
    "ilegivel": "solicitar_arquivo_legivel",
    "periodo_incompleto": "solicitar_competencias_ausentes",
    "divergente": "comparar_declaracao_e_documento",
    "desatualizado": "solicitar_documento_atualizado",
    "nao_se_aplica": "nenhuma",
    "nao_verificado": "validar_regra_documental",
}

CONFIANCAS = {
    "ok": "0.97",
    "faltante": "0.00",
    "ilegivel": "0.28",
    "periodo_incompleto": "0.89",
    "divergente": "0.93",
    "desatualizado": "0.95",
    "nao_se_aplica": NA,
    "nao_verificado": "0.90",
}


def registro(
    *,
    instituicao: str,
    edicao: str,
    candidatura_id: str,
    cenario: str,
    membro_id: str,
    relacao: str,
    idade: int,
    ocupacao: str,
    categoria: str,
    tipo: str,
    regra: str,
    obrigatoriedade: str,
    sequencia_arquivo: int,
    status: str,
    competencia: str,
    valor_declarado: str = NA,
    valor_extraido: str = NA,
    nivel_fonte: str = "confirmado",
) -> list[str]:
    prefixo = PREFIXOS[instituicao]
    arquivo_id = (
        "ausente"
        if status in {"faltante", "nao_se_aplica"}
        else f"{prefixo}-DOC-{sequencia_arquivo:06d}"
    )
    if status in {"faltante", "ilegivel"} and valor_extraido != NA:
        valor_extraido = "nao_extraido"
    revisao = (
        "sim"
        if status not in {"ok", "nao_se_aplica"} or nivel_fonte != "confirmado"
        else "nao"
    )
    linha = [
        instituicao,
        edicao,
        candidatura_id,
        cenario,
        membro_id,
        relacao,
        str(idade),
        ocupacao,
        categoria,
        tipo,
        regra,
        obrigatoriedade,
        arquivo_id,
        status,
        competencia,
        valor_declarado,
        valor_extraido,
        CONFIANCAS[status],
        PENDENCIAS[status],
        revisao,
        nivel_fonte,
    ]
    if len(linha) != len(HEADER):
        raise ValueError(f"Registro inválido em {candidatura_id}: {len(linha)} campos")
    return linha


def valor_renda(indice: int) -> str:
    return f"{1450 + (indice * 137) % 4200:.2f}"


def valor_extraido(status: str, declarado: str) -> str:
    if status == "divergente":
        return f"{float(declarado) + 650:.2f}"
    if status in {"faltante", "ilegivel"}:
        return "nao_extraido"
    return declarado


def gerar_inteli() -> list[list[str]]:
    linhas: list[list[str]] = []
    ocupacoes = [
        ("assalariado", "holerites_3_meses"),
        ("trabalhador_informal", "declaracao_trabalho_informal"),
        ("mei", "comprovante_mei_e_dasn_simei"),
        ("aposentado", "extrato_beneficio_3_meses"),
        ("desempregado", "rescisao_fgts_ou_declaracao_inatividade"),
        ("autonomo", "dasn_simei_ou_decore"),
    ]
    cenarios = [
        "dossie_completo",
        "documento_faltante",
        "arquivo_ilegivel",
        "periodo_incompleto",
        "valor_divergente",
        "documento_desatualizado",
    ]
    alvo_falha = {
        "dossie_completo": -1,
        "documento_faltante": 8,
        "arquivo_ilegivel": 7,
        "periodo_incompleto": 7,
        "valor_divergente": 7,
        "documento_desatualizado": 2,
    }
    status_cenario = {
        "documento_faltante": "faltante",
        "arquivo_ilegivel": "ilegivel",
        "periodo_incompleto": "periodo_incompleto",
        "valor_divergente": "divergente",
        "documento_desatualizado": "desatualizado",
    }

    for indice in range(1, 101):
        candidatura = f"INT-SYN-{indice:04d}"
        candidato = f"{candidatura}-M1"
        responsavel = f"{candidatura}-M2"
        cenario = cenarios[(indice - 1) % len(cenarios)]
        ocupacao_responsavel, doc_renda = ocupacoes[(indice - 1) % len(ocupacoes)]
        renda = valor_renda(indice)
        moradias = [
            ("moradia_propria", "irpf_ou_iptu"),
            ("moradia_alugada", "comprovante_aluguel_ultimo_mes"),
            ("moradia_financiada", "comprovante_financiamento_ultimo_mes"),
            ("moradia_cedida", "declaracao_cessao_imovel"),
        ]
        regra_moradia, doc_moradia = moradias[(indice - 1) % len(moradias)]
        extras = [
            ("patrimonio", "crlv_ou_renavam", "grupo_possui_veiculo", NA),
            ("renda", "comprovante_ou_declaracao_pensao", "recebe_pensao", "420.00"),
            ("gastos", "comprovantes_saude", "gasto_de_saude_declarado", "560.00"),
            ("gastos", "comprovantes_educacao", "gasto_de_educacao_declarado", "250.00"),
        ]
        categoria_extra, doc_extra, regra_extra, valor_extra = extras[(indice - 1) % 4]
        tipos = [
            (candidato, "candidato", 17 + indice % 8, "sem_renda", "identificacao", "rg_ou_cnh_candidato", "todo_candidato", "obrigatorio", "atual", NA),
            (responsavel, "responsavel", 34 + indice % 28, ocupacao_responsavel, "identificacao", "rg_cpf_adulto", "todo_adulto", "obrigatorio", "atual", NA),
            (responsavel, "responsavel", 34 + indice % 28, ocupacao_responsavel, "residencia", "comprovante_residencia_ultimo_mes", "todo_grupo_familiar", "obrigatorio", "2025-09", NA),
            (responsavel, "responsavel", 34 + indice % 28, ocupacao_responsavel, "moradia", doc_moradia, regra_moradia, "condicional", "2025-09", "1200.00"),
            (responsavel, "responsavel", 34 + indice % 28, ocupacao_responsavel, "trabalho", "ctps", "todo_adulto", "obrigatorio", "atual", NA),
            (responsavel, "responsavel", 34 + indice % 28, ocupacao_responsavel, "trabalho", "cnis_completo", "todo_adulto", "obrigatorio", "atual", NA),
            (responsavel, "responsavel", 34 + indice % 28, ocupacao_responsavel, "tributario", "irpf_com_recibo_ou_nada_consta", "todo_adulto", "obrigatorio", "exercicio_2025_ano_base_2024", NA),
            (responsavel, "responsavel", 34 + indice % 28, ocupacao_responsavel, "financeiro", "extratos_todas_contas", "todo_adulto", "obrigatorio", "2025-07|2025-08|2025-09", renda),
            (responsavel, "responsavel", 34 + indice % 28, ocupacao_responsavel, "renda", doc_renda, f"renda_{ocupacao_responsavel}", "condicional", "2025-07|2025-08|2025-09", renda),
            (responsavel, "responsavel", 34 + indice % 28, ocupacao_responsavel, categoria_extra, doc_extra, regra_extra, "condicional", "media_2025-07_a_2025-09", valor_extra),
        ]

        for posicao, dados in enumerate(tipos):
            status = "ok"
            if posicao == alvo_falha[cenario]:
                status = status_cenario[cenario]
            membro, relacao, idade, ocupacao, categoria, tipo, regra, obrigatoriedade, competencia, declarado = dados
            extraido = valor_extraido(status, declarado) if declarado != NA else NA
            linhas.append(
                registro(
                    instituicao="inteli",
                    edicao="graduacao_2026",
                    candidatura_id=candidatura,
                    cenario=cenario,
                    membro_id=membro,
                    relacao=relacao,
                    idade=idade,
                    ocupacao=ocupacao,
                    categoria=categoria,
                    tipo=tipo,
                    regra=regra,
                    obrigatoriedade=obrigatoriedade,
                    sequencia_arquivo=len(linhas) + 1,
                    status=status,
                    competencia=competencia,
                    valor_declarado=declarado,
                    valor_extraido=extraido,
                )
            )
    return linhas


def gerar_bom_aluno() -> list[list[str]]:
    linhas: list[list[str]] = []
    cenarios = [
        "inscricao_inicial_completa",
        "boletim_atual_faltante",
        "boletim_anterior_ilegivel",
        "boletim_atual_incompleto",
        "renda_declarada_divergente",
        "cadunico_desatualizado",
    ]
    extras = [
        ("candidato", "identificacao", "certidao_ou_rg_candidato", "lista_detalhada_nao_publicada", NA),
        ("responsavel", "identificacao", "rg_cpf_responsavel", "lista_detalhada_nao_publicada", NA),
        ("responsavel", "residencia", "comprovante_endereco", "lista_detalhada_nao_publicada", NA),
        ("responsavel", "renda", "comprovante_renda_familiar", "criterio_de_renda_publicado_documento_nao_enumerado", "1800.00"),
    ]
    status_por_cenario = {
        "boletim_atual_faltante": (2, "faltante"),
        "boletim_anterior_ilegivel": (1, "ilegivel"),
        "boletim_atual_incompleto": (2, "periodo_incompleto"),
        "renda_declarada_divergente": (4, "divergente"),
        "cadunico_desatualizado": (3, "desatualizado"),
    }

    for indice in range(1, 201):
        candidatura = f"BOM-SYN-{indice:04d}"
        candidato = f"{candidatura}-M1"
        responsavel = f"{candidatura}-M2"
        cenario = cenarios[(indice - 1) % len(cenarios)]
        extra = extras[(indice - 1) % len(extras)]
        if cenario == "renda_declarada_divergente":
            extra = extras[3]
        alvo_extra, categoria_extra, tipo_extra, regra_extra, valor_extra = extra
        renda = valor_renda(indice)
        if valor_extra != NA:
            valor_extra = renda
        tipos = [
            (candidato, "candidato", 11 + indice % 2, "estudante", "inscricao", "ficha_inscricao", "todo_candidato", "obrigatorio", "2026", NA, "confirmado"),
            (candidato, "candidato", 11 + indice % 2, "estudante", "escolar", "boletim_ano_anterior", "todo_candidato", "obrigatorio", "2025", NA, "confirmado"),
            (candidato, "candidato", 11 + indice % 2, "estudante", "escolar", "boletim_ano_atual", "todo_candidato", "obrigatorio", "2026_bimestres_disponiveis", NA, "confirmado"),
            (responsavel, "responsavel", 30 + indice % 30, "responsavel_familiar", "cadastro_social", "folha_resumo_cadunico", "familia_inscrita_no_cadunico", "preferencial", "atual", NA, "parcial"),
            (candidato if alvo_extra == "candidato" else responsavel, alvo_extra, 11 + indice % 2 if alvo_extra == "candidato" else 30 + indice % 30, "estudante" if alvo_extra == "candidato" else "responsavel_familiar", categoria_extra, tipo_extra, regra_extra, "a_validar", "periodo_a_validar", valor_extra, "hipotese"),
        ]

        for posicao, dados in enumerate(tipos):
            status = "ok"
            if cenario in status_por_cenario and posicao == status_por_cenario[cenario][0]:
                status = status_por_cenario[cenario][1]
            membro, relacao, idade, ocupacao, categoria, tipo, regra, obrigatoriedade, competencia, declarado, nivel = dados
            extraido = valor_extraido(status, declarado) if declarado != NA else NA
            linhas.append(
                registro(
                    instituicao="bom_aluno_bh",
                    edicao="selecao_2026",
                    candidatura_id=candidatura,
                    cenario=cenario,
                    membro_id=membro,
                    relacao=relacao,
                    idade=idade,
                    ocupacao=ocupacao,
                    categoria=categoria,
                    tipo=tipo,
                    regra=regra,
                    obrigatoriedade=obrigatoriedade,
                    sequencia_arquivo=len(linhas) + 1,
                    status=status,
                    competencia=competencia,
                    valor_declarado=declarado,
                    valor_extraido=extraido,
                    nivel_fonte=nivel,
                )
            )
    return linhas


def gerar_marista() -> list[list[str]]:
    linhas: list[list[str]] = []
    cenarios = [
        "dossie_presente",
        "comprovante_renda_faltante",
        "residencia_ilegivel",
        "periodo_de_renda_incompleto",
        "renda_declarada_divergente",
        "cadunico_desatualizado",
    ]
    ocupacoes = [
        ("assalariado", "contracheques"),
        ("trabalhador_informal", "declaracao_atividade_remunerada"),
        ("mei", "dasn_simei"),
        ("aposentado", "extrato_beneficio_previdenciario"),
        ("desempregado", "declaracao_sem_renda_e_cnis"),
    ]
    status_por_cenario = {
        "comprovante_renda_faltante": (5, "faltante"),
        "residencia_ilegivel": (3, "ilegivel"),
        "periodo_de_renda_incompleto": (5, "periodo_incompleto"),
        "renda_declarada_divergente": (5, "divergente"),
        "cadunico_desatualizado": (7, "desatualizado"),
    }

    for indice in range(1, 126):
        candidatura = f"MAR-SYN-{indice:04d}"
        candidato = f"{candidatura}-M1"
        responsavel = f"{candidatura}-M2"
        cenario = cenarios[(indice - 1) % len(cenarios)]
        ocupacao_responsavel, doc_renda = ocupacoes[(indice - 1) % len(ocupacoes)]
        renda = valor_renda(indice)
        moradias = [
            ("moradia_propria", "iptu_ou_irpf"),
            ("moradia_alugada", "contrato_e_recibo_aluguel"),
            ("moradia_financiada", "comprovante_financiamento"),
            ("moradia_cedida", "declaracao_imovel_cedido"),
        ]
        regra_moradia, doc_moradia = moradias[(indice - 1) % len(moradias)]
        tipos = [
            (candidato, "candidato", 6 + indice % 12, "estudante", "inscricao", "formulario_avaliacao_socioeconomica", "todo_candidato", "obrigatorio", "2026", NA, "confirmado"),
            (candidato, "candidato", 6 + indice % 12, "estudante", "identificacao", "certidao_ou_rg_candidato", "documentos_do_candidato_detalhados_no_anexo", "a_validar", "atual", NA, "parcial"),
            (responsavel, "responsavel", 30 + indice % 35, ocupacao_responsavel, "identificacao", "rg_cpf_adulto", "documentos_do_grupo_detalhados_no_anexo", "a_validar", "atual", NA, "parcial"),
            (responsavel, "responsavel", 30 + indice % 35, ocupacao_responsavel, "residencia", "comprovante_endereco", "indicado_na_pesquisa_de_partida", "a_validar", "2025-10", NA, "hipotese"),
            (responsavel, "responsavel", 30 + indice % 35, ocupacao_responsavel, "moradia", doc_moradia, regra_moradia, "a_validar", "2025-10", "1350.00", "hipotese"),
            (responsavel, "responsavel", 30 + indice % 35, ocupacao_responsavel, "renda", doc_renda, "comprovacao_de_renda_detalhada_no_anexo", "a_validar", "2025-08|2025-09|2025-10", renda, "parcial"),
            (responsavel, "responsavel", 30 + indice % 35, ocupacao_responsavel, "tributario", "irpf_ou_comprovacao_de_nao_declaracao", "indicado_na_pesquisa_de_partida", "a_validar", "ultimo_exercicio", NA, "hipotese"),
            (responsavel, "responsavel", 30 + indice % 35, ocupacao_responsavel, "cadastro_social", "folha_resumo_cadunico", "criterio_oficial_documento_exato_a_validar", "preferencial", "atual", NA, "parcial"),
        ]

        for posicao, dados in enumerate(tipos):
            status = "ok"
            if cenario in status_por_cenario and posicao == status_por_cenario[cenario][0]:
                status = status_por_cenario[cenario][1]
            membro, relacao, idade, ocupacao, categoria, tipo, regra, obrigatoriedade, competencia, declarado, nivel = dados
            extraido = valor_extraido(status, declarado) if declarado != NA else NA
            linhas.append(
                registro(
                    instituicao="marista_dom_silverio",
                    edicao="bolsa_social_2026",
                    candidatura_id=candidatura,
                    cenario=cenario,
                    membro_id=membro,
                    relacao=relacao,
                    idade=idade,
                    ocupacao=ocupacao,
                    categoria=categoria,
                    tipo=tipo,
                    regra=regra,
                    obrigatoriedade=obrigatoriedade,
                    sequencia_arquivo=len(linhas) + 1,
                    status=status,
                    competencia=competencia,
                    valor_declarado=declarado,
                    valor_extraido=extraido,
                    nivel_fonte=nivel,
                )
            )
    return linhas


def salvar(nome: str, linhas: list[list[str]]) -> None:
    if len(linhas) < 1000:
        raise ValueError(f"{nome} possui somente {len(linhas)} registros")
    destino = OUTPUT_DIR / nome
    with destino.open("w", encoding="utf-8", newline="") as arquivo:
        escritor = csv.writer(arquivo, lineterminator="\n")
        escritor.writerow(HEADER)
        escritor.writerows(linhas)
    print(f"{destino.relative_to(ROOT)}: {len(linhas)} registros")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    salvar("inteli_documentos_sinteticos.csv", gerar_inteli())
    salvar("bom_aluno_bh_documentos_sinteticos.csv", gerar_bom_aluno())
    salvar("marista_dom_silverio_documentos_sinteticos.csv", gerar_marista())


if __name__ == "__main__":
    main()
