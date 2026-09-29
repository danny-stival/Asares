import { useState } from "react";

function FiltroPeriodo({ onAlterar }) {

    const [periodo, setPeriodo] = useState("mensal");

    function alterarPeriodo(evento) {
        const novoPeriodo = evento.target.value;

        setPeriodo(novoPeriodo);

        if (onAlterar) {
            onAlterar(novoPeriodo);
        }
    }

    return (
        <div
            style={{
                marginBottom: "25px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}
        >

            <label htmlFor="periodo">
                <strong>Período:</strong>
            </label>

            <select
                id="periodo"
                value={periodo}
                onChange={alterarPeriodo}
                style={{
                    padding: "8px 12px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    cursor: "pointer"
                }}
            >
                <option value="diario">
                    Diário
                </option>

                <option value="semanal">
                    Semanal
                </option>

                <option value="mensal">
                    Mensal
                </option>

                <option value="anual">
                    Anual
                </option>
            </select>

        </div>
    );
}

export default FiltroPeriodo;