import { useState } from "react";
import api from "../services/api";

function Login({ setToken, onCriarConta }) {

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

            // Salva o token de autenticação
            localStorage.setItem("token", jwt);

            // Salva os dados do usuário
            localStorage.setItem(
                "nomeUsuario",
                resposta.data.nome
            );

            localStorage.setItem(
                "emailUsuario",
                resposta.data.email
            );

            // Atualiza o estado do aplicativo
            setToken(jwt);

        } catch (erro) {

            console.error("Erro ao fazer login:", erro);

            setErroLogin(
                "Falha na autenticação. Verifique seu e-mail e senha."
            );
        }
    }

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "50px auto",
                fontFamily: "sans-serif",
                padding: "20px",
                border: "1px solid #30313a",
                borderRadius: "14px",
                background: "#1c1d24",
                color: "#f5f5f5"
            }}
        >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "5px"
                }}
            >
                ASARES
            </h1>

            <p
                style={{
                    textAlign: "center",
                    color: "#999",
                    marginBottom: "25px"
                }}
            >
                Painel Financeiro
            </p>


            <h2>Entrar</h2>


            {erroLogin && (
                <p
                    style={{
                        color: "#ff6b6b",
                        background: "rgba(229, 72, 77, 0.12)",
                        border: "1px solid rgba(229, 72, 77, 0.3)",
                        borderRadius: "7px",
                        padding: "10px",
                        marginBottom: "15px"
                    }}
                >
                    {erroLogin}
                </p>
            )}


            <form onSubmit={handleLogin}>

                <div style={{ marginBottom: "18px" }}>

                    <label
                        htmlFor="email"
                        style={{
                            display: "block",
                            marginBottom: "7px",
                            color: "#ccc",
                            fontSize: "14px"
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
                            padding: "11px 12px",
                            border: "1px solid #3a3b45",
                            borderRadius: "7px",
                            background: "#121318",
                            color: "white",
                            fontSize: "14px"
                        }}
                    />

                </div>


                <div style={{ marginBottom: "18px" }}>

                    <label
                        htmlFor="senha"
                        style={{
                            display: "block",
                            marginBottom: "7px",
                            color: "#ccc",
                            fontSize: "14px"
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
                            padding: "11px 12px",
                            border: "1px solid #3a3b45",
                            borderRadius: "7px",
                            background: "#121318",
                            color: "white",
                            fontSize: "14px"
                        }}
                    />

                </div>


                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "11px",
                        background: "#5865f2",
                        color: "white",
                        border: "none",
                        borderRadius: "7px",
                        fontSize: "14px",
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
                    width: "100%",
                    padding: "10px",
                    marginTop: "12px",
                    background: "transparent",
                    color: "#aaa",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px"
                }}
            >
                Esqueci minha senha
            </button>


            <div
                style={{
                    borderTop: "1px solid #30313a",
                    marginTop: "15px",
                    paddingTop: "20px"
                }}
            >

                <p
                    style={{
                        textAlign: "center",
                        color: "#999",
                        fontSize: "13px",
                        marginBottom: "10px"
                    }}
                >
                    Ainda não possui uma conta?
                </p>

                <button
                    type="button"
                    onClick={onCriarConta}
                    style={{
                        width: "100%",
                        padding: "11px",
                        background: "#33343d",
                        color: "#ddd",
                        border: "none",
                        borderRadius: "7px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer"
                    }}
                >
                    Criar conta
                </button>

            </div>

        </div>
    );
}

export default Login;