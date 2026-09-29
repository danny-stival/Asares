function DespesaItem({ despesa, onEditar, onExcluir }) {
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
      {/* Informações da despesa */}
      <div>
        <strong>{despesa.descricao}</strong> — R${" "}
        {Number(despesa.valor).toFixed(2)} |{" "}
        <span style={{ color: "#666" }}>
          {despesa.categoria}
        </span>{" "}
        | Data: {despesa.data} |{" "}
        <span>
          {despesa.paga ? "✅ Paga" : "⏳ Pendente"}
        </span>
      </div>

      {/* Botões */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          onClick={() => onEditar(despesa)}
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => onExcluir(despesa.id)}
        >
          Excluir
        </button>
      </div>
    </li>
  );
}

export default DespesaItem;
