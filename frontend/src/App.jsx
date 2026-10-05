import { useState } from "react";

import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Menu from "./components/Menu";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";

function App() {
    const [token, setToken] = useState(
    localStorage.getItem("token") || ""
);

    const [mostrarCadastro, setMostrarCadastro] = useState(false);

    const [paginaAtual, setPaginaAtual] = useState("inicio");

    function handleLogout() {
        localStorage.removeItem("token");
        setToken("");
        setMostrarCadastro(false);
        setPaginaAtual("inicio");
    }

    // Usuário não está logado
    if (!token) {

        // Tela de cadastro
        if (mostrarCadastro) {
            return (
                <Cadastro
                    setToken={setToken}
                    onVoltarLogin={() => setMostrarCadastro(false)}
                />
            );
        }

        // Tela de login
        return (
            <Login
                setToken={setToken}
                onCriarConta={() => setMostrarCadastro(true)}
            />
        );
    }

    // Usuário está logado
    return (
        <div>
            <Menu
                paginaAtual={paginaAtual}
                onMudarPagina={setPaginaAtual}
                onLogout={handleLogout}
            />

            {paginaAtual === "inicio" && (
                <Dashboard
                    onLogout={handleLogout}
                />
            )}

            {paginaAtual === "perfil" && (
                <Perfil />
            )}
        </div>
    );
}

export default App;