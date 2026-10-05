import { useEffect, useState } from "react";
import api from "../services/api";
import "./css/DespesaForm.css";

function DespesaForm({ despesaEditando, onSalvo, onCancelar }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");
  const [outraCategoria, setOutraCategoria] = useState("");
  const [paga, setPaga] = useState(false);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  // Categorias disponíveis para as despesas
  const categorias = [
    "Alimentação",
    "Transporte",
    "Moradia",
    "Contas",
    "Compras",
    "Saúde",
    "Educação",
    "Lazer",
    "Outros",
  ];

  // Preenche o formulário quando estamos editando
  useEffect(() => {
    if (despesaEditando) {
      setDescricao(despesaEditando.descricao || "");
      setValor(despesaEditando.valor || "");
      setData(despesaEditando.data || "");
      setPaga(despesaEditando.paga || false);

      const categoriaSalva = despesaEditando.categoria || "";

      // Verifica se a categoria salva é uma das categorias padrão
      if (categorias.includes(categoriaSalva)) {
        setCategoria(categoriaSalva);
        setOutraCategoria("");
      } else if (categoriaSalva) {
        // Caso seja uma categoria personalizada
        setCategoria("Outros");
        setOutraCategoria(categoriaSalva);
      } else {
        setCategoria("");
        setOutraCategoria("");
      }
    } else {
      limparFormulario();
    }
  }, [despesaEditando]);

  // Limpa todos os campos do formulário
  const limparFormulario = () => {
    setDescricao("");
    setValor("");
    setData("");
    setCategoria("");
    setOutraCategoria("");
    setPaga(false);
    setErro("");
  };

  // Cadastra ou edita uma despesa
  const salvar = async (evento) => {
    evento.preventDefault();

    setErro("");

    // Verifica se uma categoria foi selecionada
    if (!categoria) {
      setErro("Selecione uma categoria.");
      return;
    }

    // Verifica se o usuário informou a categoria personalizada
    if (categoria === "Outros" && !outraCategoria.trim()) {
      setErro("Informe qual é a categoria da despesa.");
      return;
    }

    setSalvando(true);

    // Define a categoria que será enviada para o backend
    const categoriaFinal =
      categoria === "Outros"
        ? outraCategoria.trim()
        : categoria;

    const dados = {
      descricao: descricao.trim(),
      valor: Number(valor),
      data,
      categoria: categoriaFinal,
      paga,
    };

    try {
      let resposta;

      if (despesaEditando) {
        // Edita uma despesa existente
        resposta = await api.put(
          `/despesas/${despesaEditando.id}`,
          dados
        );
      } else {
        // Cadastra uma nova despesa
        resposta = await api.post("/despesas", dados);
      }

      // Informa ao componente pai que a operação terminou
      onSalvo(resposta.data);

      // Limpa o formulário
      limparFormulario();
    } catch (erro) {
      console.error("Erro ao salvar despesa:", erro);

      setErro(
        despesaEditando
          ? "Erro ao editar despesa."
          : "Erro ao cadastrar despesa."
      );
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form className="despesa-form" onSubmit={salvar}>
      <h2>
        {despesaEditando
          ? "Editar despesa"
          : "Cadastrar despesa"}
      </h2>

      {/* Mensagem de erro */}
      {erro && (
        <p className="erro-despesa">
          {erro}
        </p>
      )}

      {/* DESCRIÇÃO */}
      <div className="campo-despesa">
        <label htmlFor="descricao">
          Descrição
        </label>

        <input
          id="descricao"
          type="text"
          value={descricao}
          onChange={(evento) =>
            setDescricao(evento.target.value)
          }
          placeholder="Ex.: Mercado"
          required
        />
      </div>

      {/* VALOR */}
      <div className="campo-despesa">
        <label htmlFor="valor">
          Valor
        </label>

        <input
          id="valor"
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
      <div className="campo-despesa">
        <label htmlFor="data">
          Data
        </label>

        <input
          id="data"
          type="date"
          value={data}
          onChange={(evento) =>
            setData(evento.target.value)
          }
          required
        />
      </div>

      {/* CATEGORIA */}
      <div className="campo-despesa">
        <label htmlFor="categoria">
          Categoria
        </label>

        <select
          id="categoria"
          value={categoria}
          onChange={(evento) => {
            setCategoria(evento.target.value);

            // Se não for "Outros", limpa a categoria personalizada
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

      {/* CATEGORIA PERSONALIZADA */}
      {categoria === "Outros" && (
        <div className="campo-despesa">
          <label htmlFor="outraCategoria">
            Qual é a categoria?
          </label>

          <input
            id="outraCategoria"
            type="text"
            value={outraCategoria}
            onChange={(evento) =>
              setOutraCategoria(evento.target.value)
            }
            placeholder="Ex.: Presente de aniversário"
            required
          />
        </div>
      )}

      {/* DESPESA PAGA */}
      <div className="checkbox-despesa">
        <input
          id="paga"
          type="checkbox"
          checked={paga}
          onChange={(evento) =>
            setPaga(evento.target.checked)
          }
        />

        <label htmlFor="paga">
          Despesa paga
        </label>
      </div>

      {/* BOTÕES */}
      <div className="botoes-despesa">
        <button
          type="submit"
          className="botao-salvar-despesa"
          disabled={salvando}
        >
          {salvando
            ? "Salvando..."
            : despesaEditando
            ? "Salvar alterações"
            : "Cadastrar despesa"}
        </button>

        {despesaEditando && (
          <button
            type="button"
            className="botao-cancelar-despesa"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default DespesaForm;