import { useEffect, useState } from "react";
import api from "../services/api";
import "./css/RelatorioFinanceiro.css";

function RelatorioFinanceiro({ atualizar, periodo }) {
  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Carrega receitas e despesas do usuário
  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");

        const [respostaReceitas, respostaDespesas] =
          await Promise.all([
            api.get("/receitas"),
            api.get("/despesas"),
          ]);

        setReceitas(respostaReceitas.data);
        setDespesas(respostaDespesas.data);
      } catch (erro) {
        console.error("Erro ao carregar relatório:", erro);
        setErro("Não foi possível carregar o relatório financeiro.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [atualizar]);

  // Converte YYYY-MM-DD para uma data local
  function criarData(dataString) {
    const [ano, mes, dia] = dataString
      .split("-")
      .map(Number);

    return new Date(ano, mes - 1, dia);
  }

  // Verifica se uma data pertence ao período selecionado
  function pertenceAoPeriodo(dataString) {
    const data = criarData(dataString);
    const hoje = new Date();

    if (periodo === "diario") {
      return (
        data.getFullYear() === hoje.getFullYear() &&
        data.getMonth() === hoje.getMonth() &&
        data.getDate() === hoje.getDate()
      );
    }

    if (periodo === "semanal") {
      const inicioSemana = new Date(
        hoje.getFullYear(),
        hoje.getMonth(),
        hoje.getDate() - hoje.getDay()
      );

      const fimSemana = new Date(
        inicioSemana.getFullYear(),
        inicioSemana.getMonth(),
        inicioSemana.getDate() + 6
      );

      return data >= inicioSemana && data <= fimSemana;
    }

    if (periodo === "mensal") {
      return (
        data.getFullYear() === hoje.getFullYear() &&
        data.getMonth() === hoje.getMonth()
      );
    }

    if (periodo === "anual") {
      return data.getFullYear() === hoje.getFullYear();
    }

    return true;
  }

  // Filtra as movimentações de acordo com o período
  const receitasFiltradas = receitas.filter((receita) =>
    pertenceAoPeriodo(receita.data)
  );

  const despesasFiltradas = despesas.filter((despesa) =>
    pertenceAoPeriodo(despesa.data)
  );

  // Calcula o total de receitas
  const totalReceitas = receitasFiltradas.reduce(
    (total, receita) =>
      total + Number(receita.valor || 0),
    0
  );

  // Calcula o total de despesas
  const totalDespesas = despesasFiltradas.reduce(
    (total, despesa) =>
      total + Number(despesa.valor || 0),
    0
  );

  // Calcula o saldo
  const saldo = totalReceitas - totalDespesas;

  // Agrupa as despesas por categoria
  const despesasPorCategoria = despesasFiltradas.reduce(
    (categorias, despesa) => {
      const categoria =
        despesa.categoria || "Sem categoria";

      if (!categorias[categoria]) {
        categorias[categoria] = 0;
      }

      categorias[categoria] += Number(despesa.valor || 0);

      return categorias;
    },
    {}
  );

  // Converte o objeto em uma lista
  const categoriasOrdenadas = Object.entries(
    despesasPorCategoria
  ).sort((a, b) => b[1] - a[1]);

  // Nome do período para exibir na tela
  function nomePeriodo() {
    if (periodo === "diario") {
      return "Diário";
    }

    if (periodo === "semanal") {
      return "Semanal";
    }

    if (periodo === "mensal") {
      return "Mensal";
    }

    if (periodo === "anual") {
      return "Anual";
    }

    return "Mensal";
  }

  if (carregando) {
    return (
      <section className="relatorio-financeiro">
        <p>Carregando relatório...</p>
      </section>
    );
  }

  if (erro) {
    return (
      <section className="relatorio-financeiro">
        <p className="erro-relatorio">
          {erro}
        </p>
      </section>
    );
  }

  return (
    <section className="relatorio-financeiro">

      <div className="relatorio-cabecalho">
        <div>
          <h2>Relatório financeiro</h2>

          <p>
            Resumo do período:{" "}
            <strong>{nomePeriodo()}</strong>
          </p>
        </div>
      </div>

      {/* RESUMO */}
      <div className="relatorio-resumo">

        <div className="relatorio-card receita">
          <span>Total de receitas</span>

          <strong>
            R$ {totalReceitas.toFixed(2)}
          </strong>
        </div>

        <div className="relatorio-card despesa">
          <span>Total de despesas</span>

          <strong>
            R$ {totalDespesas.toFixed(2)}
          </strong>
        </div>

        <div className="relatorio-card saldo">
          <span>Saldo</span>

          <strong>
            R$ {saldo.toFixed(2)}
          </strong>
        </div>

      </div>

      {/* GASTOS POR CATEGORIA */}
      <div className="relatorio-categorias">

        <h3>Despesas por categoria</h3>

        {categoriasOrdenadas.length === 0 ? (
          <p className="sem-dados">
            Nenhuma despesa encontrada neste período.
          </p>
        ) : (
          <div className="lista-categorias">

            {categoriasOrdenadas.map(
              ([categoria, valor]) => (
                <div
                  className="categoria-relatorio"
                  key={categoria}
                >
                  <span>
                    {categoria}
                  </span>

                  <strong>
                    R$ {valor.toFixed(2)}
                  </strong>
                </div>
              )
            )}

          </div>
        )}

      </div>

      {/* QUANTIDADE DE MOVIMENTAÇÕES */}
      <div className="relatorio-movimentacoes">

        <div>
          <span>Receitas registradas</span>
          <strong>
            {receitasFiltradas.length}
          </strong>
        </div>

        <div>
          <span>Despesas registradas</span>
          <strong>
            {despesasFiltradas.length}
          </strong>
        </div>

        <div>
          <span>Total de movimentações</span>
          <strong>
            {receitasFiltradas.length +
              despesasFiltradas.length}
          </strong>
        </div>

      </div>

    </section>
  );
}

export default RelatorioFinanceiro;