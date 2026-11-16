
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

function RedefinirSenha({ tema, onAlternarTema }) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Recupera o token que veio no link do e-mail
    const token = searchParams.get("token");

    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const [carregando, setCarregando] = useState(false);

    async function handleRedefinirSenha(evento) {
        evento.preventDefault();

        setErro("");

        if (!token) {
            setErro("Link de recuperação inválido ou sem token.");
            return;
        }

        if (novaSenha.length < 8) {
            setErro("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        setCarregando(true);

        try {
            await api.post("/auth/redefinir-senha", {
                token,
                novaSenha
            });

            setSucesso(true);

        } catch (erro) {
            console.error("Erro ao redefinir senha:", erro);

            setErro(
                erro.response?.data?.message ||
                erro.response?.data ||
                "Não foi possível redefinir a senha. O link pode ter expirado ou já ter sido utilizado."
            );

        } finally {
            setCarregando(false);
        }
    }

    const estiloInput = {
        boxSizing: "border-box",
        width: "100%",
        padding: "12px",
        border: "1px solid var(--tema-borda)",
        borderRadius: "8px",
        background: "var(--tema-superficie)",
        color: "var(--tema-texto)",
        fontSize: "15px"
    };

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
            position: "relative"
        }}>

            {/* Alternar tema */}
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
                maxWidth: "400px",
                boxSizing: "border-box",
                padding: "32px",
                border: "1px solid var(--tema-borda)",
                borderRadius: "18px",
                background: "var(--tema-cartao)",
                boxShadow: "0 8px 30px rgba(22, 53, 43, 0.08)"
            }}>

                <h1 style={{
                    textAlign: "center",
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

                {sucesso ? (
                    <>
                        <h2 style={{
                            fontSize: "23px",
                            textAlign: "center",
                            color: "#16A36A"
                        }}>
                            Senha alterada!
                        </h2>

                        <p style={{
                            textAlign: "center",
                            color: "var(--tema-secundario)",
                            lineHeight: "1.5",
                            margin: "20px 0"
                        }}>
                            Sua senha foi redefinida com sucesso.
                            Agora você já pode entrar no ASARES usando
                            sua nova senha.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/", { replace: true })}
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
                            Voltar para o login
                        </button>
                    </>
                ) : (
                    <>
                        <h2 style={{
                            fontSize: "24px",
                            marginBottom: "12px"
                        }}>
                            Criar nova senha
                        </h2>

                        <p style={{
                            color: "var(--tema-secundario)",
                            fontSize: "14px",
                            lineHeight: "1.5",
                            marginBottom: "22px"
                        }}>
                            Digite sua nova senha e confirme para
                            concluir a recuperação.
                        </p>

                        {erro && (
                            <p style={{
                                color: "#B93636",
                                background: "#FFF1F0",
                                border: "1px solid #F3C5C2",
                                borderRadius: "8px",
                                padding: "12px",
                                fontSize: "14px",
                                marginBottom: "16px"
                            }}>
                                {typeof erro === "string"
                                    ? erro
                                    : "Não foi possível redefinir a senha."}
                            </p>
                        )}

                        <form onSubmit={handleRedefinirSenha}>
                            <div style={{ marginBottom: "18px" }}>
                                <label
                                    htmlFor="novaSenha"
                                    style={{
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "14px",
                                        fontWeight: "500"
                                    }}
                                >
                                    Nova senha
                                </label>

                                <input
                                    id="novaSenha"
                                    type="password"
                                    value={novaSenha}
                                    onChange={(evento) =>
                                        setNovaSenha(evento.target.value)
                                    }
                                    minLength={8}
                                    required
                                    placeholder="Mínimo de 8 caracteres"
                                    style={estiloInput}
                                />
                            </div>

                            <div style={{ marginBottom: "22px" }}>
                                <label
                                    htmlFor="confirmarSenha"
                                    style={{
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "14px",
                                        fontWeight: "500"
                                    }}
                                >
                                    Confirmar nova senha
                                </label>

                                <input
                                    id="confirmarSenha"
                                    type="password"
                                    value={confirmarSenha}
                                    onChange={(evento) =>
                                        setConfirmarSenha(evento.target.value)
                                    }
                                    required
                                    placeholder="Digite a senha novamente"
                                    style={estiloInput}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={carregando || !token}
                                style={{
                                    width: "100%",
                                    padding: "13px",
                                    background: "#16A36A",
                                    color: "#FFFFFF",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "15px",
                                    fontWeight: "600",
                                    cursor: carregando ? "wait" : "pointer",
                                    opacity: carregando || !token ? 0.7 : 1
                                }}
                            >
                                {carregando
                                    ? "Salvando..."
                                    : "Redefinir senha"}
                            </button>
                        </form>

                        <button
                            type="button"
                            onClick={() => navigate("/", { replace: true })}
                            style={{
                                display: "block",
                                width: "100%",
                                padding: "12px",
                                marginTop: "10px",
                                background: "transparent",
                                color: "var(--tema-texto)",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "14px"
                            }}
                        >
                            Voltar para o login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default RedefinirSenha;
