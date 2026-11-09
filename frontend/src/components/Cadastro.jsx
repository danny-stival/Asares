
import { useState } from "react";
import api from "../services/api.js";

function Cadastro({ onVoltarLogin, setToken, tema, onAlternarTema }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [erroCadastro, setErroCadastro] = useState("");
    const [sucessoCadastro, setSucessoCadastro] = useState("");

    async function handleCadastro(e) {
        e.preventDefault();

        setErroCadastro("");
        setSucessoCadastro("");

        try {
            const resposta = await api.post("/auth/cadastro", {
                nome,
                email,
                senha
            });

            const jwt = resposta.data.token;

            // Salva o token de autenticação
            localStorage.setItem("token", jwt);

            // Salva os dados do usuário
            localStorage.setItem("nomeUsuario", resposta.data.nome);
            localStorage.setItem("emailUsuario", resposta.data.email);

            // Entra automaticamente no sistema
            setToken(jwt);

        } catch (err) {
            console.log("ERRO NO CADASTRO:", err);
            console.log("RESPOSTA DO BACKEND:", err.response);

            setErroCadastro(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Não foi possível criar o usuário."
            );
        }
    }

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            boxSizing: "border-box",
            background: "var(--tema-fundo)",
            color: "var(--tema-texto)",
            fontFamily: 'system-ui, "Segoe UI", sans-serif',
            position: "relative",
            transition: "background 0.3s, color 0.3s"
        }}>

            {/* Botão para alternar o tema */}
            <button
                type="button"
                onClick={onAlternarTema}
                style={{
                    position: "absolute",
                    top: "24px",
                    right: "24px",
                    padding: "10px 16px",
                    background: "var(--tema-cartao)",
                    color: "var(--tema-texto)",
                    border: "1px solid var(--tema-borda)",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer"
                }}
            >
                {tema === "claro" ? "🌙 Modo escuro" : "☀️ Modo claro"}
            </button>

            {/* Cartão de cadastro */}
            <div style={{
                width: "100%",
                maxWidth: "400px",
                boxSizing: "border-box",
                padding: "32px",
                border: "1px solid var(--tema-borda)",
                borderRadius: "18px",
                background: "var(--tema-cartao)",
                color: "var(--tema-texto)",
                boxShadow: "0 8px 30px rgba(22, 53, 43, 0.08)"
            }}>

                <h1 style={{
                    textAlign: "center",
                    color: "var(--tema-texto)",
                    fontSize: "32px",
                    margin: "0 0 8px"
                }}>
                    ASARES
                </h1>

                <p style={{
                    textAlign: "center",
                    color: "var(--tema-secundario)",
                    fontSize: "14px",
                    marginBottom: "28px"
                }}>
                    Controle financeiro pessoal
                </p>

                <h2 style={{
                    color: "var(--tema-texto)",
                    fontSize: "24px",
                    marginBottom: "22px"
                }}>
                    Criar conta
                </h2>

                {erroCadastro && (
                    <p style={{
                        color: "#B93636",
                        background: tema === "escuro" ? "#402523" : "#FFF1F0",
                        border: "1px solid #B93636",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "16px",
                        fontSize: "14px"
                    }}>
                        {erroCadastro}
                    </p>
                )}

                {sucessoCadastro && (
                    <p style={{
                        color: "#16A36A",
                        background: "var(--tema-superficie)",
                        border: "1px solid var(--tema-borda)",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "16px",
                        fontSize: "14px"
                    }}>
                        {sucessoCadastro}
                    </p>
                )}

                <form onSubmit={handleCadastro} autoComplete="off">

                    <div style={{ marginBottom: "18px" }}>
                        <label style={{
                            display: "block",
                            marginBottom: "8px",
                            color: "var(--tema-texto)",
                            fontSize: "14px",
                            fontWeight: "500"
                        }}>
                            Nome:
                        </label>

                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            autoComplete="off"
                            required
                            style={{
                                width: "100%",
                                padding: "12px",
                                boxSizing: "border-box",
                                border: "1px solid var(--tema-borda)",
                                borderRadius: "8px",
                                background: "var(--tema-superficie)",
                                color: "var(--tema-texto)",
                                fontSize: "15px"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "18px" }}>
                        <label style={{
                            display: "block",
                            marginBottom: "8px",
                            color: "var(--tema-texto)",
                            fontSize: "14px",
                            fontWeight: "500"
                        }}>
                            E-mail:
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                            required
                            style={{
                                width: "100%",
                                padding: "12px",
                                boxSizing: "border-box",
                                border: "1px solid var(--tema-borda)",
                                borderRadius: "8px",
                                background: "var(--tema-superficie)",
                                color: "var(--tema-texto)",
                                fontSize: "15px"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "22px" }}>
                        <label style={{
                            display: "block",
                            marginBottom: "8px",
                            color: "var(--tema-texto)",
                            fontSize: "14px",
                            fontWeight: "500"
                        }}>
                            Senha:
                        </label>

                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            autoComplete="new-password"
                            required
                            style={{
                                width: "100%",
                                padding: "12px",
                                boxSizing: "border-box",
                                border: "1px solid var(--tema-borda)",
                                borderRadius: "8px",
                                background: "var(--tema-superficie)",
                                color: "var(--tema-texto)",
                                fontSize: "15px"
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "13px",
                            background: "#16A36A",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "15px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}
                    >
                        Cadastrar
                    </button>

                </form>

                <div style={{
                    borderTop: "1px solid var(--tema-borda)",
                    marginTop: "20px",
                    paddingTop: "20px"
                }}>
                    <button
                        type="button"
                        onClick={onVoltarLogin}
                        style={{
                            width: "100%",
                            padding: "12px",
                            background: "var(--tema-superficie)",
                            color: "var(--tema-texto)",
                            border: "1px solid var(--tema-borda)",
                            borderRadius: "8px",
                            fontSize: "15px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}
                    >
                        Voltar para o login
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Cadastro;
