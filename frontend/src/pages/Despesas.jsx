
import { useState } from "react";

import DespesaList from "../components/DespesaList";
import DespesaForm from "../components/DespesaForm";

import "./css//Despesas.css";

function Despesas() {

    // Controla a exibição do formulário
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    // Guarda a despesa que está sendo editada
    const [despesaEditando, setDespesaEditando] = useState(null);

    // Controla a atualização da lista
    const [atualizarLista, setAtualizarLista] = useState(0);

    // Abre o formulário para cadastrar uma nova despesa
    function abrirNovaDespesa() {
        setDespesaEditando(null);
        setMostrarFormulario(true);
    }

    // Abre o formulário para editar uma despesa
    function editarDespesa(despesa) {
        setDespesaEditando(despesa);
        setMostrarFormulario(true);
    }

    // Executado quando uma despesa é salva
    function despesaSalva() {
        setMostrarFormulario(false);
        setDespesaEditando(null);

        setAtualizarLista((valorAtual) => valorAtual + 1);
    }

    // Cancela o formulário
    function cancelarFormulario() {
        setMostrarFormulario(false);
        setDespesaEditando(null);
    }

    // Atualiza a lista depois de excluir uma despesa
    function despesaExcluida() {
        setAtualizarLista((valorAtual) => valorAtual + 1);
    }

    return (
        <main className="pagina-despesas">

            {/* Cabeçalho da página */}
            <section className="despesas-cabecalho">

                <div>
                    <h1>Minhas Despesas</h1>

                    <p>
                        Organize seus gastos e acompanhe para onde seu dinheiro vai.
                    </p>
                </div>

                <button
                    type="button"
                    className="botao-nova-despesa"
                    onClick={abrirNovaDespesa}
                >
                    + Adicionar Despesa
                </button>

            </section>

            {/* Lista de despesas cadastradas */}
            <section className="despesas-conteudo">

                <div className="despesas-titulo-lista">
                    <h2>Despesas cadastradas</h2>

                    <p>
                        Consulte, edite ou exclua suas despesas.
                    </p>
                </div>

                <DespesaList
                    key={`despesas-${atualizarLista}`}
                    onEditar={editarDespesa}
                    onExcluido={despesaExcluida}
                />

            </section>

            {/* Formulário de cadastro ou edição */}
            {mostrarFormulario && (
                <section className="despesas-formulario">

                    <DespesaForm
                        despesaEditando={despesaEditando}
                        onSalvo={despesaSalva}
                        onCancelar={cancelarFormulario}
                    />

                </section>
            )}

        </main>
    );
}

export default Despesas;
