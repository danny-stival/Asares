import { useEffect, useState } from "react";
import api from "../services/api";

function ResumoFinanceiro({ atualizar, periodo }) {

    const [totalReceitas, setTotalReceitas] = useState(0);
    const [totalDespesas, setTotalDespesas] = useState(0);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {

        async function carregarResumo() {

            try {

                setCarregando(true);
                setErro("");

                const [respostaReceitas, respostaDespesas] =
                    await Promise.all([
                        api.get("/receitas"),
                        api.get("/despesas")
                    ]);

                const receitas = respostaReceitas.data;
                const despesas = respostaDespesas.data;

                const hoje = new Date();

                function verificarPeriodo(dataString) {

                    const data = new Date(dataString);

                    // PERÍODO DIÁRIO
                    if (periodo === "diario") {

                        return (
                            data.getFullYear() === hoje.getFullYear() &&
                            data.getMonth() === hoje.getMonth() &&
                            data.getDate() === hoje.getDate()
                        );
                    }

                    // PERÍODO SEMANAL
                    if (periodo === "semanal") {

                        const inicioSemana = new Date(hoje);

                        const diaSemana = hoje.getDay();

                        inicioSemana.setDate(
                            hoje.getDate() - diaSemana
                        );

                        inicioSemana.setHours(0, 0, 0, 0);

                        const fimSemana = new Date(inicioSemana);

                        fimSemana.setDate(
                            inicioSemana.getDate() + 6
                        );

                        fimSemana.setHours(23, 59, 59, 999);

                        return (
                            data >= inicioSemana &&
                            data <= fimSemana
                        );
                    }

                    // PERÍODO MENSAL
                    if (periodo === "mensal") {

                        return (
                            data.getFullYear() === hoje.getFullYear() &&
                            data.getMonth() === hoje.getMonth()
                        );
                    }

                    // PERÍODO ANUAL
                    if (periodo === "anual") {

                        return (
                            data.getFullYear() === hoje.getFullYear()
                        );
                    }

                    return true;
                }

                const receitasFiltradas = receitas.filter(
                    (receita) =>
                        verificarPeriodo(receita.data)
                );

                const despesasFiltradas = despesas.filter(
                    (despesa) =>
                        verificarPeriodo(despesa.data)
                );

                const somaReceitas = receitasFiltradas.reduce(
                    (total, receita) =>
                        total + Number(receita.valor),
                    0
                );

                const somaDespesas = despesasFiltradas.reduce(
                    (total, despesa) =>
                        total + Number(despesa.valor),
                    0
                );

                setTotalReceitas(somaReceitas);
                setTotalDespesas(somaDespesas);

            } catch (erro) {

                console.error(
                    "Erro ao carregar resumo financeiro:",
                    erro
                );

                setErro(
                    "Não foi possível carregar o resumo financeiro."
                );

            } finally {

                setCarregando(false);

            }
        }

        carregarResumo();

    }, [atualizar, periodo]);

    const saldo = totalReceitas - totalDespesas;

    if (carregando) {
        return <p>Carregando resumo financeiro...</p>;
    }

    if (erro) {
        return (
            <p style={{ color: "red" }}>
                {erro}
            </p>
        );
    }

    return (
        <section
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginBottom: "30px"
            }}
        >

            {/* TOTAL DE RECEITAS */}

            <div
                style={{
                    padding: "20px",
                    borderRadius: "10px",
                    background: "#e8f5e9",
                    border: "1px solid #c8e6c9"
                }}
            >
                <h3>Total de receitas</h3>

                <p
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#28a745"
                    }}
                >
                    R$ {totalReceitas.toFixed(2)}
                </p>
            </div>

            {/* TOTAL DE DESPESAS */}

            <div
                style={{
                    padding: "20px",
                    borderRadius: "10px",
                    background: "#ffebee",
                    border: "1px solid #ffcdd2"
                }}
            >
                <h3>Total de despesas</h3>

                <p
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#dc3545"
                    }}
                >
                    R$ {totalDespesas.toFixed(2)}
                </p>
            </div>

            {/* SALDO */}

            <div
                style={{
                    padding: "20px",
                    borderRadius: "10px",
                    background: "#f5f5f5",
                    border: "1px solid #ddd"
                }}
            >
                <h3>Saldo</h3>

                <p
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: saldo >= 0 ? "#28a745" : "#dc3545"
                    }}
                >
                    R$ {saldo.toFixed(2)}
                </p>
            </div>

        </section>
    );
}

export default ResumoFinanceiro;