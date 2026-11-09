
import { useState } from "react";

import ReceitaList from "../components/ReceitaList";
import ReceitaForm from "../components/ReceitaForm";

import "./css//Receitas.css";

function Receitas() {

    // Controla a exibição do formulário
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    // Guarda a receita que está sendo editada
    const [receitaEditando, setReceitaEditando] = useState(null);

    // Controla a atualização da lista
    const [atualizarLista, setAtualizarLista] = useState(0);

    // Abre o formulário para cadastrar uma nova receita
    function abrirNovaReceita() {
        setReceitaEditando(null);
        setMostrarFormulario(true);
    }

    // Abre o formulário para editar uma receita
    function editarReceita(receita) {
        setReceitaEditando(receita);
        setMostrarFormulario(true);
    }

    // Executado quando uma receita é salva
    function receitaSalva() {
        setMostrarFormulario(false);
        setReceitaEditando(null);

        setAtualizarLista((valorAtual) => valorAtual + 1);
    }

    // Cancela o formulário
    function cancelarFormulario() {
        setMostrarFormulario(false);
        setReceitaEditando(null);
    }

    // Atualiza a lista depois de excluir uma receita
    function receitaExcluida() {
        setAtualizarLista((valorAtual) => valorAtual + 1);
    }

    return (
        <main className="pagina-receitas">

            {/* Cabeçalho da página */}
            <section className="receitas-cabecalho">

                <div>
                    <h1>Minhas Receitas</h1>

                    <p>
                        Acompanhe e organize todo o dinheiro que entra.
                    </p>
                </div>

                <button
                    type="button"
                    className="botao-nova-receita"
                    onClick={abrirNovaReceita}
                >
                    + Adicionar Receita
                </button>

            </section>

            {/* Lista de receitas cadastradas */}
            <section className="receitas-conteudo">

                <div className="receitas-titulo-lista">
                    <h2>Receitas cadastradas</h2>

                    <p>
                        Consulte, edite ou exclua suas receitas.
                    </p>
                </div>

                <ReceitaList
                    key={`receitas-${atualizarLista}`}
                    onEditar={editarReceita}
                    onExcluido={receitaExcluida}
                />

            </section>

            {/* Formulário de cadastro ou edição */}
            {mostrarFormulario && (
                <section className="receitas-formulario">

                    <ReceitaForm
                        receitaEditando={receitaEditando}
                        onSalvo={receitaSalva}
                        onCancelar={cancelarFormulario}
                    />

                </section>
            )}

        </main>
    );
}

export default Receitas;
