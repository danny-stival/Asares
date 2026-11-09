
import { useState } from "react";
import api from "../services/api";

function Login({ setToken, onCriarConta, tema, onAlternarTema }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erroLogin, setErroLogin] = useState("");

    function esqueciSenha() {
        alert("A recuperação de senha será implementada futuramente.");
    }

    async function handleLogin(evento) {
        evento.preventDefault();
        setErroLogin("");

        try {
            const resposta = await api.post("/auth/login", {
                email,
                senha
            });

            const jwt = resposta.data.token;

            localStorage.setItem("token", jwt);
            localStorage.setItem("nomeUsuario", resposta.data.nome);
            localStorage.setItem("emailUsuario", resposta.data.email);

            setToken(jwt);
        } catch (erro) {
            console.error("Erro ao fazer login:", erro);
            setErroLogin(
                "Falha na autenticação. Verifique seu e-mail e senha."
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

            <div style={{
                width: "100%",
                maxWidth: "380px",
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
                    Entrar
                </h2>

                {erroLogin && (
                    <p style={{
                        color: "#B93636",
                        background: "#FFF1F0",
                        border: "1px solid #F3C5C2",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "16px",
                        fontSize: "14px"
                    }}>
                        {erroLogin}
                    </p>
                )}

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: "18px" }}>
                        <label
                            htmlFor="email"
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                color: "var(--tema-texto)",
                                fontSize: "14px",
                                fontWeight: "500"
                            }}
                        >
                            E-mail
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(evento) =>
                                setEmail(evento.target.value)
                            }
                            required
                            style={{
                                boxSizing: "border-box",
                                width: "100%",
                                padding: "12px",
                                border: "1px solid var(--tema-borda)",
                                borderRadius: "8px",
                                background: "var(--tema-superficie)",
                                color: "var(--tema-texto)",
                                fontSize: "15px"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "18px" }}>
                        <label
                            htmlFor="senha"
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                color: "var(--tema-texto)",
                                fontSize: "14px",
                                fontWeight: "500"
                            }}
                        >
                            Senha
                        </label>

                        <input
                            id="senha"
                            type="password"
                            value={senha}
                            onChange={(evento) =>
                                setSenha(evento.target.value)
                            }
                            required
                            style={{
                                boxSizing: "border-box",
                                width: "100%",
                                padding: "12px",
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
                        Entrar
                    </button>
                </form>

                <button
                    type="button"
                    onClick={esqueciSenha}
                    style={{
                        display: "block",
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        background: "transparent",
                        color: "var(--tema-texto)",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "14px"
                    }}
                >
                    Esqueci minha senha
                </button>

                <div style={{
                    borderTop: "1px solid var(--tema-borda)",
                    marginTop: "16px",
                    paddingTop: "20px"
                }}>
                    <p style={{
                        textAlign: "center",
                        color: "var(--tema-secundario)",
                        fontSize: "14px",
                        marginBottom: "12px"
                    }}>
                        Ainda não possui uma conta?
                    </p>

                    <button
                        type="button"
                        onClick={onCriarConta}
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
                        Criar conta
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
