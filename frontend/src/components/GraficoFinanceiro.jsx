
import { useEffect, useState } from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";

import api from "../services/api";

function GraficoFinanceiro({ atualizar, periodo }) {

    // Guarda os dados utilizados nos gráficos
    const [dados, setDados] = useState([]);

    // Controla o carregamento e os erros
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    // Define qual tipo de gráfico será exibido
    const [tipoGrafico, setTipoGrafico] = useState("barras");

    useEffect(() => {

        async function carregarDados() {

            try {

                setCarregando(true);
                setErro("");

                // Busca receitas e despesas no backend
                const [respostaReceitas, respostaDespesas] =
                    await Promise.all([
                        api.get("/receitas"),
                        api.get("/despesas")
                    ]);

                const receitas = respostaReceitas.data;
                const despesas = respostaDespesas.data;

                const hoje = new Date();

                // Converte a data para evitar problemas de fuso horário
                function criarData(dataString) {

                    const [ano, mes, dia] = dataString
                        .split("-")
                        .map(Number);

                    return new Date(ano, mes - 1, dia);
                }

                // Soma movimentações dentro de um intervalo
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

    // Calcula o total de receitas e despesas do período
    const totalReceitas = dados.reduce(
        (total, item) => total + item.receitas,
        0
    );

    const totalDespesas = dados.reduce(
        (total, item) => total + item.despesas,
        0
    );

    // Dados utilizados no gráfico de pizza
    const dadosPizza = [
        {
            nome: "Receitas",
            valor: totalReceitas
        },
        {
            nome: "Despesas",
            valor: totalDespesas
        }
    ].filter((item) => item.valor > 0);

    // Cores dos gráficos
    const cores = ["#28a745", "#dc3545"];

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
                minHeight: "400px",
                marginTop: "30px"
            }}
        >

            <h2>Receitas x Despesas</h2>

            {/* Botões para alternar entre os gráficos */}
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px",
                    flexWrap: "wrap"
                }}
            >

                <button
                    onClick={() => setTipoGrafico("barras")}
                    style={{
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        background:
                            tipoGrafico === "barras"
                                ? "#2563eb"
                                : "#e5e7eb",
                        color:
                            tipoGrafico === "barras"
                                ? "#ffffff"
                                : "#333333",
                        fontWeight: "bold"
                    }}
                >
                    Gráfico de barras
                </button>

                <button
                    onClick={() => setTipoGrafico("pizza")}
                    style={{
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        background:
                            tipoGrafico === "pizza"
                                ? "#2563eb"
                                : "#e5e7eb",
                        color:
                            tipoGrafico === "pizza"
                                ? "#ffffff"
                                : "#333333",
                        fontWeight: "bold"
                    }}
                >
                    Gráfico de pizza
                </button>

            </div>

            {/* Exibe o gráfico de barras */}
            {tipoGrafico === "barras" && (

                <div style={{ width: "100%", height: "350px" }}>

                    <ResponsiveContainer width="100%" height="100%">

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

            )}

            {/* Exibe o gráfico de pizza */}
            {tipoGrafico === "pizza" && (

                <div
                    style={{
                        width: "100%",
                        height: "350px"
                    }}
                >

                    {dadosPizza.length === 0 ? (

                        <p>
                            Não existem movimentações financeiras
                            para exibir neste período.
                        </p>

                    ) : (

                        <ResponsiveContainer width="100%" height="100%">

                            <PieChart>

                                <Pie
                                    data={dadosPizza}
                                    dataKey="valor"
                                    nameKey="nome"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    label={({ nome, percent }) =>
                                        `${nome} ${(percent * 100).toFixed(1)}%`
                                    }
                                >

                                    {dadosPizza.map((entrada, index) => (

                                        <Cell
                                            key={entrada.nome}
                                            fill={cores[index]}
                                        />

                                    ))}

                                </Pie>

                                <Tooltip
                                    formatter={(valor) =>
                                        `R$ ${Number(valor).toFixed(2)}`
                                    }
                                />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    )}

                </div>

            )}

        </div>
    );
}

export default GraficoFinanceiro;
