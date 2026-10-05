import { useEffect, useState } from "react";
import api from "../services/api";
import ReceitaItem from "./ReceitaItem";

function ReceitaList({ onEditar, onExcluido }) {
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // Carrega as receitas do usuário
  const carregarReceitas = () => {
    setLoading(true);
    setErro("");

    api.get("/receitas")
      .then((resposta) => {
        setReceitas(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao carregar receitas:", erro);
        setErro("Erro ao carregar receitas.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarReceitas();
  }, []);

  // Excluir receita
  function excluirReceita(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta receita?"
    );

    if (!confirmar) {
      return;
    }

    api.delete(`/receitas/${id}`)
      .then(() => {
        // Remove a receita da lista
        setReceitas((receitasAtuais) =>
          receitasAtuais.filter((receita) => receita.id !== id)
        );

        // Avisa o Dashboard
        if (onExcluido) {
          onExcluido(id);
        }
      })
      .catch((erro) => {
        console.error("Erro ao excluir receita:", erro);
        setErro("Erro ao excluir receita.");
      });
  }

  if (loading) {
    return <p>Carregando receitas...</p>;
  }

  if (erro) {
    return <p style={{ color: "red" }}>{erro}</p>;
  }

  if (receitas.length === 0) {
    return <p>Nenhuma receita cadastrada.</p>;
  }

  return (
    <ul
      style={{
        listStyle: "none",
        paddingLeft: 0,
      }}
    >
      {receitas.map((receita) => (
        <ReceitaItem
          key={receita.id}
          receita={receita}
          onEditar={onEditar}
          onExcluir={excluirReceita}
        />
      ))}
    </ul>
  );
}

export default ReceitaList;