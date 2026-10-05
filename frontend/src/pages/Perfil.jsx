import "./css/Perfil.css";

function Perfil() {

    // Recupera os dados do usuário salvos no navegador
    const nome = localStorage.getItem("nomeUsuario") || "Usuário";
    const email = localStorage.getItem("emailUsuario") || "E-mail não informado";

    return (
        <div className="perfil-container">

            {/* Cabeçalho do perfil */}
            <div className="perfil-cabecalho">
                <div className="perfil-avatar">
                    {nome.charAt(0).toUpperCase()}
                </div>

                <div>
                    <h1>Meu Perfil</h1>
                    <p>Gerencie suas informações pessoais</p>
                </div>
            </div>


            {/* Informações pessoais */}
            <section className="perfil-card">

                <h2>Informações pessoais</h2>

                <div className="perfil-informacao">
                    <span>Nome</span>
                    <strong>{nome}</strong>
                </div>

                <div className="perfil-informacao">
                    <span>E-mail</span>
                    <strong>{email}</strong>
                </div>

            </section>


            {/* Segurança */}
            <section className="perfil-card">

                <h2>Segurança</h2>

                <div className="perfil-opcao">
                    <div>
                        <strong>Senha</strong>
                        <p>
                            Sua senha está protegida e não é exibida.
                        </p>
                    </div>

                    <button type="button">
                        Alterar senha
                    </button>
                </div>

            </section>

        </div>
    );
}

export default Perfil;