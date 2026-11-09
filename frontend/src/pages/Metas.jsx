
import { useEffect, useState } from "react";
import api from "../services/api";
import { useConfirmacao } from "../components/ConfirmacaoContext";

import "./css/Metas.css";

function Metas() {

    // Guarda as metas cadastradas
    const [metas, setMetas] = useState([]);

    // Controla a exibição do formulário
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    // Guarda a meta que está sendo editada
    const [metaEditando, setMetaEditando] = useState(null);

    // Controla os campos do formulário
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valorObjetivo, setValorObjetivo] = useState("");
    const [valorAtual, setValorAtual] = useState("0");
    const [prazo, setPrazo] = useState("");

    // Controla carregamento e mensagens
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");

    // Acessa o modal global de confirmação
    const { confirmar } = useConfirmacao();

    // Busca as metas do usuário
    async function carregarMetas() {
        try {
            setCarregando(true);
            setErro("");

            const resposta = await api.get("/metas");

            setMetas(resposta.data);

        } catch (erro) {
            console.error("Erro ao carregar metas:", erro);
            setErro("Não foi possível carregar suas metas.");
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarMetas();
    }, []);

    // Limpa os campos do formulário
    function limparFormulario() {
        setNome("");
        setDescricao("");
        setValorObjetivo("");
        setValorAtual("0");
        setPrazo("");
        setMetaEditando(null);
    }

    // Abre o formulário para cadastrar uma nova meta
    function abrirNovaMeta() {
        limparFormulario();
        setErro("");
        setMostrarFormulario(true);
    }

    // Abre o formulário para editar uma meta
    function editarMeta(meta) {
        setMetaEditando(meta);

        setNome(meta.nome);
        setDescricao(meta.descricao || "");
        setValorObjetivo(meta.valorObjetivo);
        setValorAtual(meta.valorAtual);
        setPrazo(meta.prazo);

        setErro("");
        setMostrarFormulario(true);
    }

    // Fecha o formulário
    function cancelarFormulario() {
        setMostrarFormulario(false);
        limparFormulario();
        setErro("");
    }

    // Salva uma nova meta ou atualiza uma existente
    async function salvarMeta(evento) {
        evento.preventDefault();

        try {
            setSalvando(true);
            setErro("");

            const dadosMeta = {
                nome: nome.trim(),
                descricao: descricao.trim(),
                valorObjetivo: Number(valorObjetivo),
                valorAtual: Number(valorAtual),
                prazo: prazo
            };

            if (metaEditando) {
                await api.put(`/metas/${metaEditando.id}`, dadosMeta);
            } else {
                await api.post("/metas", dadosMeta);
            }

            setMostrarFormulario(false);
            limparFormulario();

            await carregarMetas();

        } catch (erro) {
            console.error("Erro ao salvar meta:", erro);

            setErro(
                erro.response?.data?.message ||
                "Não foi possível salvar a meta. Verifique os dados e tente novamente."
            );
        } finally {
            setSalvando(false);
        }
    }

    // Exclui uma meta utilizando o modal personalizado
    async function excluirMeta(id) {

        const meta = metas.find((item) => item.id === id);

        if (!meta) {
            return;
        }

        // Abre o modal e aguarda a resposta do usuário
        const confirmou = await confirmar({
            titulo: "Excluir esta meta?",
            mensagem: "Tem certeza de que deseja excluir esta meta? Essa ação não poderá ser desfeita.",
            nomeItem: meta.nome
        });

        // Se o usuário cancelar, interrompe a exclusão
        if (!confirmou) {
            return;
        }

        try {

            setErro("");

            await api.delete(`/metas/${id}`);

            await carregarMetas();

        } catch (erro) {

            console.error("Erro ao excluir meta:", erro);
            setErro("Não foi possível excluir a meta.");

        }
    }

    // Formata valores para o padrão monetário brasileiro
    function formatarMoeda(valor) {
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    // Calcula o progresso da meta
    function calcularProgresso(meta) {
        const objetivo = Number(meta.valorObjetivo);
        const atual = Number(meta.valorAtual);

        if (!objetivo || objetivo <= 0) {
            return 0;
        }

        return Math.min((atual / objetivo) * 100, 100);
    }

    // Formata a data sem alterar o dia por causa do fuso horário
    function formatarData(data) {
        if (!data) {
            return "-";
        }

        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    return (
        <main className="pagina-metas">

            {/* Cabeçalho da página */}
            <section className="metas-cabecalho">

                <div>
                    <h1>Minhas Metas</h1>

                    <p>
                        Planeje seus objetivos e acompanhe sua evolução financeira.
                    </p>
                </div>

                <button
                    type="button"
                    className="botao-nova-meta"
                    onClick={abrirNovaMeta}
                >
                    + Adicionar Meta
                </button>

            </section>

            {/* Mensagem de erro */}
            {erro && (
                <div className="metas-mensagem-erro">
                    {erro}
                </div>
            )}

            {/* Formulário de cadastro ou edição */}
            {mostrarFormulario && (
                <section className="metas-formulario">

                    <div className="metas-formulario-cabecalho">
                        <h2>
                            {metaEditando ? "Editar Meta" : "Nova Meta"}
                        </h2>

                        <p>
                            Informe os dados do seu objetivo financeiro.
                        </p>
                    </div>

                    <form onSubmit={salvarMeta}>

                        <div className="metas-campo">
                            <label htmlFor="nomeMeta">Nome da meta</label>

                            <input
                                id="nomeMeta"
                                type="text"
                                value={nome}
                                onChange={(evento) => setNome(evento.target.value)}
                                placeholder="Ex.: Comprar um notebook"
                                maxLength="120"
                                required
                            />
                        </div>

                        <div className="metas-campo">
                            <label htmlFor="descricaoMeta">Descrição</label>

                            <textarea
                                id="descricaoMeta"
                                value={descricao}
                                onChange={(evento) => setDescricao(evento.target.value)}
                                placeholder="Descreva seu objetivo..."
                                maxLength="300"
                                rows="3"
                            />
                        </div>

                        <div className="metas-campos-duplos">

                            <div className="metas-campo">
                                <label htmlFor="valorObjetivo">
                                    Valor desejado (R$)
                                </label>

                                <input
                                    id="valorObjetivo"
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    value={valorObjetivo}
                                    onChange={(evento) => setValorObjetivo(evento.target.value)}
                                    placeholder="Ex.: 5000.00"
                                    required
                                />
                            </div>

                            <div className="metas-campo">
                                <label htmlFor="valorAtual">
                                    Valor já guardado (R$)
                                </label>

                                <input
                                    id="valorAtual"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={valorAtual}
                                    onChange={(evento) => setValorAtual(evento.target.value)}
                                    required
                                />
                            </div>

                        </div>

                        <div className="metas-campo">
                            <label htmlFor="prazoMeta">
                                Prazo para alcançar a meta
                            </label>

                            <input
                                id="prazoMeta"
                                type="date"
                                value={prazo}
                                onChange={(evento) => setPrazo(evento.target.value)}
                                required
                            />
                        </div>

                        <div className="metas-formulario-botoes">

                            <button
                                type="button"
                                className="botao-cancelar-meta"
                                onClick={cancelarFormulario}
                                disabled={salvando}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="botao-salvar-meta"
                                disabled={salvando}
                            >
                                {salvando
                                    ? "Salvando..."
                                    : metaEditando
                                        ? "Salvar alterações"
                                        : "Cadastrar Meta"}
                            </button>

                        </div>

                    </form>

                </section>
            )}

            {/* Lista de metas cadastradas */}
            <section className="metas-conteudo">

                <div className="metas-titulo-lista">
                    <h2>Metas cadastradas</h2>

                    <p>
                        Acompanhe seus objetivos e o quanto falta para alcançá-los.
                    </p>
                </div>

                {carregando ? (

                    <p className="metas-mensagem">
                        Carregando suas metas...
                    </p>

                ) : metas.length === 0 ? (

                    <div className="metas-vazio">
                        <h3>Nenhuma meta cadastrada</h3>

                        <p>
                            Comece criando sua primeira meta financeira!
                        </p>
                    </div>

                ) : (

                    <div className="metas-lista">

                        {metas.map((meta) => {

                            const progresso = calcularProgresso(meta);
                            const concluida =
                                Number(meta.valorAtual) >= Number(meta.valorObjetivo);

                            return (
                                <article className="meta-card" key={meta.id}>

                                    <div className="meta-card-cabecalho">

                                        <div>
                                            <h3>{meta.nome}</h3>

                                            {meta.descricao && (
                                                <p className="meta-descricao">
                                                    {meta.descricao}
                                                </p>
                                            )}
                                        </div>

                                        <span className={
                                            concluida
                                                ? "meta-status concluida"
                                                : "meta-status andamento"
                                        }>
                                            {concluida ? "Concluída" : "Em andamento"}
                                        </span>

                                    </div>

                                    <div className="meta-valores">

                                        <div>
                                            <span>Valor guardado</span>
                                            <strong>
                                                {formatarMoeda(meta.valorAtual)}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Objetivo</span>
                                            <strong>
                                                {formatarMoeda(meta.valorObjetivo)}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="meta-progresso-info">

                                        <span>Progresso</span>

                                        <strong>
                                            {progresso.toFixed(1).replace(".", ",")}%
                                        </strong>

                                    </div>

                                    <div className="meta-barra-fundo">
                                        <div
                                            className="meta-barra-preenchida"
                                            style={{ width: `${progresso}%` }}
                                        />
                                    </div>

                                    <p className="meta-prazo">
                                        Prazo: {formatarData(meta.prazo)}
                                    </p>

                                    <div className="meta-acoes">

                                        <button
                                            type="button"
                                            className="botao-editar-meta"
                                            onClick={() => editarMeta(meta)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            type="button"
                                            className="botao-excluir-meta"
                                            onClick={() => excluirMeta(meta.id)}
                                        >
                                            Excluir
                                        </button>

                                    </div>

                                </article>
                            );
                        })}

                    </div>

                )}

            </section>

        </main>
    );
}

export default Metas;
