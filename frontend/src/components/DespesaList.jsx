import { useEffect, useState } from "react";
import api from "../services/api";
import DespesaItem from "./DespesaItem";

function DespesaList({ onEditar, onExcluido }) {
  const [despesas, setDespesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // Carrega as despesas do usuário
  const carregarDespesas = () => {
    setLoading(true);

    api.get("/despesas")
      .then((resposta) => {
        setDespesas(resposta.data);
        setLoading(false);
      })
      .catch(() => {
        setErro("Erro ao carregar despesas.");
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarDespesas();
  }, []);

  // Excluir despesa
  const excluirDespesa = (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta despesa?"
    );

    if (!confirmar) {
      return;
    }

    api.delete(`/despesas/${id}`)
      .then(() => {

        // Remove a despesa da lista
        setDespesas((despesasAtuais) =>
          despesasAtuais.filter((despesa) => despesa.id !== id)
        );

        // Avisa o Dashboard que a despesa foi excluída
        if (onExcluido) {
          onExcluido(id);
        }
      })
      .catch(() => {
        setErro("Erro ao excluir despesa.");
      });
  };

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