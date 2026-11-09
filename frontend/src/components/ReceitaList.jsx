
import { useEffect, useState } from "react";
import api from "../services/api";
import ReceitaItem from "./ReceitaItem";
import { useConfirmacao } from "./ConfirmacaoContext";

function ReceitaList({ onEditar, onExcluido }) {

  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const { confirmar } = useConfirmacao();

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

  // Excluir receita utilizando o modal personalizado
  async function excluirReceita(id) {

    const receita = receitas.find((item) => item.id === id);

    if (!receita) {
      return;
    }

    const confirmou = await confirmar({
      titulo: "Excluir esta receita?",
      mensagem: "Tem certeza de que deseja excluir esta receita? Essa ação não poderá ser desfeita.",
      nomeItem: receita.descricao
    });

    // Se o usuário cancelar, interrompe a exclusão
    if (!confirmou) {
      return;
    }

    try {

      setErro("");

      await api.delete(`/receitas/${id}`);

      // Remove a receita da lista
      setReceitas((receitasAtuais) =>
        receitasAtuais.filter((receita) => receita.id !== id)
      );

      // Avisa o Dashboard que uma receita foi excluída
      if (onExcluido) {
        onExcluido(id);
      }

    } catch (erro) {

      console.error("Erro ao excluir receita:", erro);
      setErro("Erro ao excluir receita.");

    }
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

    <ul style={{ listStyle: "none", paddingLeft: 0 }}>

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
