import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import api from "../services/api";

function GraficoFinanceiro({ atualizar, periodo }) {

    const [dados, setDados] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {

        async function carregarDados() {

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

                function criarData(dataString) {
                    const [ano, mes, dia] = dataString
                        .split("-")
                        .map(Number);

                    return new Date(ano, mes - 1, dia);
                }

                function somarMovimentacoes(
                    movimentacoes,
                    dataInicial,
                    dataFinal
                ) {
                    return movimentacoes
                        .filter((movimentacao) => {

                            const data = criarData(
                                movimentacao.data
                            );

                            return (
                                data >= dataInicial &&
                                data <= dataFinal
                            );
                        })
                        .reduce(
                            (total, movimentacao) =>
                                total + Number(movimentacao.valor),
                            0
                        );
                }

                const dadosGrafico = [];

                /*
                 * DIÁRIO
                 */

                if (periodo === "diario") {

                    const inicio = new Date(
                        hoje.getFullYear(),
                        hoje.getMonth(),
                        hoje.getDate()
                    );

                    const fim = new Date(
                        hoje.getFullYear(),
                        hoje.getMonth(),
                        hoje.getDate(),
                        23,
                        59,
                        59
                    );

                    dadosGrafico.push({
                        periodo: "Hoje",
                        receitas: somarMovimentacoes(
                            receitas,
                            inicio,
                            fim
                        ),
                        despesas: somarMovimentacoes(
                            despesas,
                            inicio,
                            fim
                        )
                    });
                }

                /*
                 * SEMANAL
                 */

                else if (periodo === "semanal") {

                    const nomesDias = [
                        "Dom",
                        "Seg",
                        "Ter",
                        "Qua",
                        "Qui",
                        "Sex",
                        "Sáb"
                    ];

                    const diaSemana = hoje.getDay();

                    const inicioSemana = new Date(
                        hoje.getFullYear(),
                        hoje.getMonth(),
                        hoje.getDate() - diaSemana
                    );

                    for (let i = 0; i < 7; i++) {

                        const inicio = new Date(
                            inicioSemana
                        );

                        inicio.setDate(
                            inicioSemana.getDate() + i
                        );

                        const fim = new Date(inicio);

                        fim.setHours(
                            23,
                            59,
                            59
                        );

                        dadosGrafico.push({
                            periodo: nomesDias[i],
                            receitas: somarMovimentacoes(
                                receitas,
                                inicio,
                                fim
                            ),
                            despesas: somarMovimentacoes(
                                despesas,
                                inicio,
                                fim
                            )
                        });
                    }
                }

                /*
                 * MENSAL
                 */

                else if (periodo === "mensal") {

                    const quantidadeDias = new Date(
                        hoje.getFullYear(),
                        hoje.getMonth() + 1,
                        0
                    ).getDate();

                    for (
                        let dia = 1;
                        dia <= quantidadeDias;
                        dia++
                    ) {

                        const inicio = new Date(
                            hoje.getFullYear(),
                            hoje.getMonth(),
                            dia
                        );

                        const fim = new Date(
                            hoje.getFullYear(),
                            hoje.getMonth(),
                            dia,
                            23,
                            59,
                            59
                        );

                        dadosGrafico.push({
                            periodo: String(dia),
                            receitas: somarMovimentacoes(
                                receitas,
                                inicio,
                                fim
                            ),
                            despesas: somarMovimentacoes(
                                despesas,
                                inicio,
                                fim
                            )
                        });
                    }
                }

                /*
                 * ANUAL
                 */

                else if (periodo === "anual") {

                    const meses = [
                        "Jan",
                        "Fev",
                        "Mar",
                        "Abr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Ago",
                        "Set",
                        "Out",
                        "Nov",
                        "Dez"
                    ];

                    for (let mes = 0; mes < 12; mes++) {

                        const inicio = new Date(
                            hoje.getFullYear(),
                            mes,
                            1
                        );

                        const fim = new Date(
                            hoje.getFullYear(),
                            mes + 1,
                            0,
                            23,
                            59,
                            59
                        );

                        dadosGrafico.push({
                            periodo: meses[mes],
                            receitas: somarMovimentacoes(
                                receitas,
                                inicio,
                                fim
                            ),
                            despesas: somarMovimentacoes(
                                despesas,
                                inicio,
                                fim
                            )
                        });
                    }
                }

                setDados(dadosGrafico);

            } catch (erro) {

                console.error(
                    "Erro ao carregar dados do gráfico:",
                    erro
                );

                setErro(
                    "Não foi possível carregar o gráfico."
                );

            } finally {

                setCarregando(false);

            }
        }

        carregarDados();

    }, [atualizar, periodo]);

    if (carregando) {
        return <p>Carregando gráfico...</p>;
    }

    if (erro) {
        return (
            <p style={{ color: "red" }}>
                {erro}
            </p>
        );
    }

    return (
        <div
            style={{
                width: "100%",
                height: "400px",
                marginTop: "30px"
            }}
        >

            <h2>Receitas x Despesas</h2>

            <ResponsiveContainer
                width="100%"
                height="90%"
            >

                <BarChart data={dados}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="periodo"
                    />

                    <YAxis />

                    <Tooltip
                        formatter={(valor) =>
                            `R$ ${Number(valor).toFixed(2)}`
                        }
                    />

                    <Legend />

                    <Bar
                        dataKey="receitas"
                        name="Receitas"
                        fill="#28a745"
                    />

                    <Bar
                        dataKey="despesas"
                        name="Despesas"
                        fill="#dc3545"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default GraficoFinanceiro;