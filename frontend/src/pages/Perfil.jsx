
import { useState } from "react";
import "./css/Perfil.css";

function Perfil() {
    const [nome, setNome] = useState(
        localStorage.getItem("nomeUsuario") || "Usuário"
    );

    const [email, setEmail] = useState(
        localStorage.getItem("emailUsuario") || ""
    );

    const [editando, setEditando] = useState(false);
    const [nomeEditado, setNomeEditado] = useState(nome);
    const [emailEditado, setEmailEditado] = useState(email);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("sucesso");
    const [mostrarAvisoSenha, setMostrarAvisoSenha] = useState(false);

    function iniciarEdicao() {
        setNomeEditado(nome);
        setEmailEditado(email);
        setMensagem("");
        setEditando(true);
    }

    function salvarPerfil(event) {
        event.preventDefault();

        const nomeLimpo = nomeEditado.trim();
        const emailLimpo = emailEditado.trim();

        if (!nomeLimpo || !emailLimpo) {
            setTipoMensagem("erro");
            setMensagem("Preencha o nome e o e-mail.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo)) {
            setTipoMensagem("erro");
            setMensagem("Digite um endereço de e-mail válido.");
            return;
        }

        // Os dados são salvos somente neste navegador.
        localStorage.setItem("nomeUsuario", nomeLimpo);
        localStorage.setItem("emailUsuario", emailLimpo);

        setNome(nomeLimpo);
        setEmail(emailLimpo);
        setEditando(false);
        setTipoMensagem("sucesso");
        setMensagem("Informações atualizadas neste navegador.");
    }

    function cancelarEdicao() {
        setNomeEditado(nome);
        setEmailEditado(email);
        setEditando(false);
        setMensagem("");
    }

    return (
        <main className="perfil-container">
            <header className="perfil-cabecalho">
                <div className="perfil-avatar" aria-hidden="true">
                    {nome.charAt(0).toUpperCase()}
                </div>

                <div className="perfil-titulo">
                    <span className="perfil-etiqueta">MINHA CONTA</span>
                    <h1>Meu perfil</h1>
                    <p>
                        Gerencie suas informações pessoais e segurança.
                    </p>
                </div>
            </header>

            {mensagem && (
                <div
                    className={`perfil-mensagem perfil-mensagem-${tipoMensagem}`}
                    role="status"
                    aria-live="polite"
                >
                    {mensagem}
                </div>
            )}

            <section className="perfil-card">
                <div className="perfil-card-cabecalho">
                    <div>
                        <span className="perfil-numero-secao">01</span>
                        <h2>Informações pessoais</h2>
                        <p>Seus dados de identificação.</p>
                    </div>

                    {!editando && (
                        <button
                            type="button"
                            className="perfil-botao perfil-botao-secundario"
                            onClick={iniciarEdicao}
                        >
                            Editar dados
                        </button>
                    )}
                </div>

                {editando ? (
                    <form
                        className="perfil-formulario"
                        onSubmit={salvarPerfil}
                    >
                        <label htmlFor="perfil-nome">Nome</label>
                        <input
                            id="perfil-nome"
                            type="text"
                            value={nomeEditado}
                            onChange={(event) =>
                                setNomeEditado(event.target.value)
                            }
                            maxLength={100}
                            autoComplete="name"
                            required
                        />

                        <label htmlFor="perfil-email">E-mail</label>
                        <input
                            id="perfil-email"
                            type="email"
                            value={emailEditado}
                            onChange={(event) =>
                                setEmailEditado(event.target.value)
                            }
                            maxLength={254}
                            autoComplete="email"
                            required
                        />

                        <p className="perfil-nota">
                            As alterações são salvas apenas neste navegador.
                        </p>

                        <div className="perfil-acoes">
                            <button
                                type="button"
                                className="perfil-botao perfil-botao-secundario"
                                onClick={cancelarEdicao}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="perfil-botao perfil-botao-principal"
                            >
                                Salvar alterações
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="perfil-dados">
                        <div className="perfil-informacao">
                            <span>Nome completo</span>
                            <strong>{nome}</strong>
                        </div>

                        <div className="perfil-informacao">
                            <span>Endereço de e-mail</span>
                            <strong>
                                {email || "E-mail não informado"}
                            </strong>
                        </div>
                    </div>
                )}
            </section>

            <section className="perfil-card">
                <div className="perfil-card-cabecalho">
                    <div>
                        <span className="perfil-numero-secao">02</span>
                        <h2>Segurança da conta</h2>
                        <p>Proteção das suas informações de acesso.</p>
                    </div>

                    <span className="perfil-selo-seguranca">
                        <span aria-hidden="true">●</span>
                        Área de segurança
                    </span>
                </div>

                <div className="perfil-opcao">
                    <div
                        className="perfil-icone-seguranca"
                        aria-hidden="true"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect
                                x="4"
                                y="10"
                                width="16"
                                height="11"
                                rx="2"
                            />
                            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                            <path d="M12 14v3" />
                        </svg>
                    </div>

                    <div className="perfil-opcao-texto">
                        <strong>Senha de acesso</strong>
                        <p>Sua senha não é exibida nesta página.</p>
                    </div>

                    <button
                        type="button"
                        className="perfil-botao perfil-botao-secundario"
                        onClick={() => setMostrarAvisoSenha(true)}
                    >
                        Alterar senha
                    </button>
                </div>
            </section>

            <footer className="perfil-rodape">
                <span className="perfil-rodape-ponto" />
                <p>Asares · Controle financeiro pessoal</p>
            </footer>

            {mostrarAvisoSenha && (
                <div
                    className="perfil-modal-fundo"
                    onClick={() => setMostrarAvisoSenha(false)}
                >
                    <section
                        className="perfil-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="perfil-modal-titulo"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div
                            className="perfil-modal-icone"
                            aria-hidden="true"
                        >
                            !
                        </div>

                        <h2 id="perfil-modal-titulo">
                            Alteração de senha
                        </h2>

                        <p>
                            Essa função ainda precisa ser conectada ao
                            backend para verificar sua senha atual e
                            salvar uma nova com segurança.
                        </p>

                        <button
                            type="button"
                            className="perfil-botao perfil-botao-principal"
                            onClick={() => setMostrarAvisoSenha(false)}
                        >
                            Entendi
                        </button>
                    </section>
                </div>
            )}
        </main>
    );
}

export default Perfil;
