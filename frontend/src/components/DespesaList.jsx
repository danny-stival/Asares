
import { useEffect, useState } from "react";
import api from "../services/api";
import DespesaItem from "./DespesaItem";
import { useConfirmacao } from "./ConfirmacaoContext";

function DespesaList({ onEditar, onExcluido }) {

  const [despesas, setDespesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const { confirmar } = useConfirmacao();

  // Carrega as despesas do usuário
  const carregarDespesas = () => {

    setLoading(true);
    setErro("");

    api.get("/despesas")
      .then((resposta) => {
        setDespesas(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao carregar despesas:", erro);
        setErro("Erro ao carregar despesas.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarDespesas();
  }, []);

  // Excluir despesa utilizando o modal personalizado
  async function excluirDespesa(id) {

    const despesa = despesas.find((item) => item.id === id);

    if (!despesa) {
      return;
    }

    const confirmou = await confirmar({
      titulo: "Excluir esta despesa?",
      mensagem: "Tem certeza de que deseja excluir esta despesa? Essa ação não poderá ser desfeita.",
      nomeItem: despesa.descricao
    });

    // Se o usuário cancelar, interrompe a exclusão
    if (!confirmou) {
      return;
    }

    try {

      setErro("");

      await api.delete(`/despesas/${id}`);

      // Remove a despesa da lista
      setDespesas((despesasAtuais) =>
        despesasAtuais.filter((despesa) => despesa.id !== id)
      );

      // Avisa o Dashboard que uma despesa foi excluída
      if (onExcluido) {
        onExcluido(id);
      }

    } catch (erro) {

      console.error("Erro ao excluir despesa:", erro);
      setErro("Erro ao excluir despesa.");

    }
  }

  if (loading) {
    return <p>Carregando despesas...</p>;
  }

  if (erro) {
    return <p style={{ color: "red" }}>{erro}</p>;
  }

  if (despesas.length === 0) {
    return <p>Nenhuma despesa cadastrada.</p>;
  }

  return (

    <ul style={{ listStyle: "none", paddingLeft: 0 }}>

      {despesas.map((despesa) => (

        <DespesaItem
          key={despesa.id}
          despesa={despesa}
          onEditar={onEditar}
          onExcluir={excluirDespesa}
        />

      ))}

    </ul>

  );
}

export default DespesaList;
