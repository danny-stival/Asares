import { useState } from "react";
import api from "../services/api.js";

function Cadastro({ onVoltarLogin, setToken }) {
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
            localStorage.setItem(
                "nomeUsuario",
                resposta.data.nome
            );

            localStorage.setItem(
                "emailUsuario",
                resposta.data.email
            );

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
        <div
            style={{
                maxWidth: "400px",
                margin: "50px auto",
                fontFamily: "sans-serif",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px"
            }}
        >
            <h2>Criar usuário</h2>

            {erroCadastro && (
                <p style={{ color: "red" }}>
                    {erroCadastro}
                </p>
            )}

            {sucessoCadastro && (
                <p style={{ color: "green" }}>
                    {sucessoCadastro}
                </p>
            )}

            <form onSubmit={handleCadastro} autoComplete="off">

                <div style={{ marginBottom: "10px" }}>
                    <label>Nome:</label>

                    <input
                        style={{
                            width: "100%",
                            padding: "8px",
                            boxSizing: "border-box"
                        }}
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        autoComplete="off"
                        required
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label>E-mail:</label>

                    <input
                        style={{
                            width: "100%",
                            padding: "8px",
                            boxSizing: "border-box"
                        }}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        required
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Senha:</label>

                    <input
                        style={{
                            width: "100%",
                            padding: "8px",
                            boxSizing: "border-box"
                        }}
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        autoComplete="new-password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Cadastrar
                </button>

            </form>

            <button
                onClick={onVoltarLogin}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "10px",
                    background: "#6c757d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                Voltar para o login
            </button>

        </div>
    );
}

export default Cadastro;