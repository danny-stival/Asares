function ReceitaItem({ receita, onEditar, onExcluir }) {
  return (
    <li
      style={{
        padding: "12px 0",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* Informações da receita */}
      <div>
        <strong>{receita.descricao}</strong> — R${" "}
        {Number(receita.valor).toFixed(2)} |{" "}
        <span style={{ color: "#666" }}>{receita.categoria}</span> | Data:{" "}
        {receita.data}
      </div>

      {/* Botões */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          onClick={() => onEditar(receita)}
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => onExcluir(receita.id)}
        >
          Excluir
        </button>
      </div>
    </li>
  );
}

export default ReceitaItem;
