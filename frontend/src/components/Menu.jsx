function Menu({ paginaAtual, onMudarPagina, onLogout }) {
    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 30px",
                background: "#ffffff",
                borderBottom: "1px solid #ddd",
                marginBottom: "20px"
            }}
        >
            <div>
                <strong
                    style={{
                        fontSize: "22px",
                        color: "#333"
                    }}
                >
                    ASARES
                </strong>
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "10px"
                }}
            >
                <button
                    type="button"
                    onClick={() => onMudarPagina("inicio")}
                    style={{
                        padding: "8px 15px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        background:
                            paginaAtual === "inicio"
                                ? "#333"
                                : "#eee",
                        color:
                            paginaAtual === "inicio"
                                ? "#fff"
                                : "#333"
                    }}
                >
                    Início
                </button>

                <button
                    type="button"
                    onClick={() => onMudarPagina("perfil")}
                    style={{
                        padding: "8px 15px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        background:
                            paginaAtual === "perfil"
                                ? "#333"
                                : "#eee",
                        color:
                            paginaAtual === "perfil"
                                ? "#fff"
                                : "#333"
                    }}
                >
                    Perfil
                </button>

                <button
                    type="button"
                    onClick={onLogout}
                    style={{
                        padding: "8px 15px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        background: "#dc3545",
                        color: "#fff"
                    }}
                >
                    Sair
                </button>
            </div>
        </nav>
    );
}

export default Menu;