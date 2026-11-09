import { useState } from "react";
import "./css/FiltroPeriodo.css";

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
        <div className="filtro-periodo">

            <label htmlFor="periodo">
                <strong>Período:</strong>
            </label>

            <select
                id="periodo"
                value={periodo}
                onChange={alterarPeriodo}
            >
                <option value="diario">Diário</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal</option>
                <option value="anual">Anual</option>
            </select>

        </div>
    );
}

export default FiltroPeriodo;