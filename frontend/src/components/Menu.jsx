
import { NavLink, Link } from "react-router-dom";
import "./css/Menu.css";

function Menu({
    onLogout,
    tema,
    onAlternarTema
}) {
    return (
        <nav className="menu-principal" aria-label="Menu principal">

            <Link to="/" className="menu-marca">
                <div className="menu-logo" aria-hidden="true">A</div>

                <div className="menu-marca-texto">
                    <span className="menu-nome">ASARES</span>
                    <span className="menu-subtitulo">Controle financeiro</span>
                </div>
            </Link>

            <div className="menu-links">

                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `menu-botao ${isActive ? "ativo" : ""}`
                    }
                >
                    Início
                </NavLink>

                <NavLink
                    to="/receitas"
                    className={({ isActive }) =>
                        `menu-botao ${isActive ? "ativo" : ""}`
                    }
                >
                    Receitas
                </NavLink>

                <NavLink
                    to="/despesas"
                    className={({ isActive }) =>
                        `menu-botao ${isActive ? "ativo" : ""}`
                    }
                >
                    Despesas
                </NavLink>

                {/* Nova opção de metas */}
                <NavLink
                    to="/metas"
                    className={({ isActive }) =>
                        `menu-botao ${isActive ? "ativo" : ""}`
                    }
                >
                    Metas
                </NavLink>

                <NavLink
                    to="/perfil"
                    className={({ isActive }) =>
                        `menu-botao ${isActive ? "ativo" : ""}`
                    }
                >
                    Perfil
                </NavLink>

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
