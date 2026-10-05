import { useEffect, useState } from "react";
import api from "../services/api";
import "./css/ReceitaForm.css";

function ReceitaForm({ receitaEditando, onSalvo, onCancelar }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");
  const [outraCategoria, setOutraCategoria] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const categorias = [
    "Salário",
    "Freelance",
    "Investimentos",
    "Benefícios",
    "Vendas",
    "Outros",
  ];

  // Preenche o formulário quando estiver editando
  useEffect(() => {
    if (receitaEditando) {
      setDescricao(receitaEditando.descricao || "");
      setValor(receitaEditando.valor || "");
      setData(receitaEditando.data || "");

      const categoriaSalva = receitaEditando.categoria || "";

      if (categorias.includes(categoriaSalva)) {
        setCategoria(categoriaSalva);
        setOutraCategoria("");
      } else if (categoriaSalva) {
        setCategoria("Outros");
        setOutraCategoria(categoriaSalva);
      } else {
        setCategoria("");
        setOutraCategoria("");
      }
    } else {
      limparFormulario();
    }
  }, [receitaEditando]);

  // Limpa o formulário
  const limparFormulario = () => {
    setDescricao("");
    setValor("");
    setData("");
    setCategoria("");
    setOutraCategoria("");
    setErro("");
  };

  // Cadastra ou edita a receita
  const salvar = async (evento) => {
    evento.preventDefault();

    setErro("");

    if (!categoria) {
      setErro("Selecione uma categoria.");
      return;
    }

    if (categoria === "Outros" && !outraCategoria.trim()) {
      setErro("Informe qual é a categoria da receita.");
      return;
    }

    setSalvando(true);

    const categoriaFinal =
      categoria === "Outros"
        ? outraCategoria.trim()
        : categoria;

    const dados = {
      descricao: descricao.trim(),
      valor: Number(valor),
      data,
      categoria: categoriaFinal,
    };

    try {
      let resposta;

      if (receitaEditando) {
        resposta = await api.put(
          `/receitas/${receitaEditando.id}`,
          dados
        );
      } else {
        resposta = await api.post("/receitas", dados);
      }

      onSalvo(resposta.data);

      limparFormulario();
    } catch (erro) {
      console.error("Erro ao salvar receita:", erro);

      setErro(
        receitaEditando
          ? "Erro ao editar receita."
          : "Erro ao cadastrar receita."
      );
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form className="receita-form" onSubmit={salvar}>
      <h2>
        {receitaEditando
          ? "Editar receita"
          : "Cadastrar receita"}
      </h2>

      {erro && (
        <p className="erro-receita">
          {erro}
        </p>
      )}

      {/* DESCRIÇÃO */}
      <div className="campo-receita">
        <label htmlFor="descricao-receita">
          Descrição
        </label>

        <input
          id="descricao-receita"
          type="text"
          value={descricao}
          onChange={(evento) =>
            setDescricao(evento.target.value)
          }
          placeholder="Ex.: Salário"
          required
        />
      </div>

      {/* VALOR */}
      <div className="campo-receita">
        <label htmlFor="valor-receita">
          Valor
        </label>

        <input
          id="valor-receita"
          type="number"
          step="0.01"
          min="0"
          value={valor}
          onChange={(evento) =>
            setValor(evento.target.value)
          }
          placeholder="0,00"
          required
        />
      </div>

      {/* DATA */}
      <div className="campo-receita">
        <label htmlFor="data-receita">
          Data
        </label>

        <input
          id="data-receita"
          type="date"
          value={data}
          onChange={(evento) =>
            setData(evento.target.value)
          }
          required
        />
      </div>

      {/* CATEGORIA */}
      <div className="campo-receita">
        <label htmlFor="categoria-receita">
          Categoria
        </label>

        <select
          id="categoria-receita"
          value={categoria}
          onChange={(evento) => {
            setCategoria(evento.target.value);

            if (evento.target.value !== "Outros") {
              setOutraCategoria("");
            }
          }}
          required
        >
          <option value="">
            Selecione uma categoria
          </option>

          {categorias.map((categoriaItem) => (
            <option
              key={categoriaItem}
              value={categoriaItem}
            >
              {categoriaItem}
            </option>
          ))}
        </select>
      </div>

      {/* OUTRA CATEGORIA */}
      {categoria === "Outros" && (
        <div className="campo-receita">
          <label htmlFor="outra-categoria-receita">
            Qual é a categoria?
          </label>

          <input
            id="outra-categoria-receita"
            type="text"
            value={outraCategoria}
            onChange={(evento) =>
              setOutraCategoria(evento.target.value)
            }
            placeholder="Ex.: Presente recebido"
            required
          />
        </div>
      )}

      {/* BOTÕES */}
      <div className="botoes-receita">
        <button
          type="submit"
          className="botao-salvar-receita"
          disabled={salvando}
        >
          {salvando
            ? "Salvando..."
            : receitaEditando
            ? "Salvar alterações"
            : "Cadastrar receita"}
        </button>

        {receitaEditando && (
          <button
            type="button"
            className="botao-cancelar-receita"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default ReceitaForm;