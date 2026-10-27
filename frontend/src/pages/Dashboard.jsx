import { useState } from "react";
import "./Dashboard.css";

import DespesaList from "../components/DespesaList";
import ReceitaList from "../components/ReceitaList";
import DespesaForm from "../components/DespesaForm";
import ReceitaForm from "../components/ReceitaForm";
import GraficoFinanceiro from "../components/GraficoFinanceiro";
import FiltroPeriodo from "../components/FiltroPeriodo";
import RelatorioFinanceiro from "../components/RelatorioFinanceiro";

function Dashboard({ onLogout }) {

  // Controla se o formulário de despesa está aparecendo
  const [mostrarDespesa, setMostrarDespesa] = useState(false);

  // Controla se o formulário de receita está aparecendo
  const [mostrarReceita, setMostrarReceita] = useState(false);

  // Guarda a despesa que está sendo editada
  const [despesaEditando, setDespesaEditando] = useState(null);

  // Guarda a receita que está sendo editada
  const [receitaEditando, setReceitaEditando] = useState(null);

  // Usado para avisar aos componentes que os dados foram alterados
  const [atualizarListas, setAtualizarListas] = useState(0);

  // Período selecionado no filtro
  const [periodo, setPeriodo] = useState("mensal");


  // Atualiza os dados do Dashboard
  function atualizarDados() {
    setAtualizarListas((valorAtual) => valorAtual + 1);
  }


  // Abre o formulário para cadastrar uma nova despesa
  function abrirNovaDespesa() {
    setDespesaEditando(null);
    setMostrarDespesa(true);
    setMostrarReceita(false);
  }


  // Abre o formulário para cadastrar uma nova receita
  function abrirNovaReceita() {
    setReceitaEditando(null);
    setMostrarReceita(true);
    setMostrarDespesa(false);
  }


  // Abre o formulário para editar uma despesa
  function editarDespesa(despesa) {
    setDespesaEditando(despesa);
    setMostrarDespesa(true);
    setMostrarReceita(false);
  }


  // Abre o formulário para editar uma receita
  function editarReceita(receita) {
    setReceitaEditando(receita);
    setMostrarReceita(true);
    setMostrarDespesa(false);
  }


  // Executado depois que uma despesa é salva
  function despesaSalva() {
    setMostrarDespesa(false);
    setDespesaEditando(null);
    atualizarDados();
  }


  // Executado depois que uma receita é salva
  function receitaSalva() {
    setMostrarReceita(false);
    setReceitaEditando(null);
    atualizarDados();
  }


  // Cancela o formulário de despesa
  function cancelarDespesa() {
    setMostrarDespesa(false);
    setDespesaEditando(null);
  }


  // Cancela o formulário de receita
  function cancelarReceita() {
    setMostrarReceita(false);
    setReceitaEditando(null);
  }


  return (
    <div className="dashboard">

      {/* Formulário de despesa */}
      {mostrarDespesa && (
        <DespesaForm
          despesaEditando={despesaEditando}
          onSalvo={despesaSalva}
          onCancelar={cancelarDespesa}
        />
      )}


      {/* Formulário de receita */}
      {mostrarReceita && (
        <ReceitaForm
          receitaEditando={receitaEditando}
          onSalvo={receitaSalva}
          onCancelar={cancelarReceita}
        />
      )}


      {/* Filtro de período */}
      <section className="finance-section">

        <FiltroPeriodo
          onAlterar={setPeriodo}
        />

      </section>


      {/* Relatório financeiro */}
      <RelatorioFinanceiro
        atualizar={atualizarListas}
        periodo={periodo}
      />


      {/* Gráfico financeiro */}
      <section className="finance-section">

        <GraficoFinanceiro
          atualizar={atualizarListas}
          periodo={periodo}
        />

      </section>


      {/* Lista de despesas */}
      <section className="finance-section">

        <div className="section-title">

          <div>
            <h2>Minhas despesas</h2>
            <p>Controle seus gastos</p>
          </div>

          <button
            className="small-add-button expense-button"
            onClick={abrirNovaDespesa}
          >
            + Adicionar Nova Despesa
          </button>

        </div>


        <DespesaList
          key={`despesas-${atualizarListas}`}
          onEditar={editarDespesa}
          onExcluido={atualizarDados}
        />

      </section>


      {/* Lista de receitas */}
      <section className="finance-section">

        <div className="section-title">

          <div>
            <h2>Minhas receitas</h2>
            <p>Acompanhe seu dinheiro entrando</p>
          </div>

          <button
            className="small-add-button income-button"
            onClick={abrirNovaReceita}
          >
            + Adicionar Nova Receita
          </button>

        </div>


        <ReceitaList
          key={`receitas-${atualizarListas}`}
          onEditar={editarReceita}
          onExcluido={atualizarDados}
        />

      </section>

    </div>
  );
}

export default Dashboard;