
import "./css/Menu.css";

function Menu({
    paginaAtual,
    onMudarPagina,
    onLogout,
    tema,
    onAlternarTema
}) {
    return (
        <nav className="menu-principal" aria-label="Menu principal">
            <div className="menu-marca">
                <div className="menu-logo" aria-hidden="true">A</div>

                <div className="menu-marca-texto">
                    <span className="menu-nome">ASARES</span>
                    <span className="menu-subtitulo">
                        Controle financeiro
                    </span>
                </div>
            </div>

            <div className="menu-links">
                <button
                    type="button"
                    className={`menu-botao ${
                        paginaAtual === "inicio" ? "ativo" : ""
                    }`}
                    onClick={() => onMudarPagina("inicio")}
                >
                    Início
                </button>

                <button
                    type="button"
                    className={`menu-botao ${
                        paginaAtual === "perfil" ? "ativo" : ""
                    }`}
                    onClick={() => onMudarPagina("perfil")}
                >
                    Perfil
                </button>

                <button
                    type="button"
                    className="menu-botao menu-botao-tema"
                    onClick={onAlternarTema}
                    aria-label={
                        tema === "claro"
                            ? "Ativar modo escuro"
                            : "Ativar modo claro"
                    }
                    title={
                        tema === "claro"
                            ? "Ativar modo escuro"
                            : "Ativar modo claro"
                    }
                >
                    {tema === "claro" ? "☾ Modo escuro" : "☀ Modo claro"}
                </button>

                <button
                    type="button"
                    className="menu-botao menu-botao-sair"
                    onClick={onLogout}
                >
                    Sair
                </button>
            </div>
        </nav>
    );
}

export default Menu;
