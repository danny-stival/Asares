
import { useState } from "react";

import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Menu from "./components/Menu";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import "./tema.css";

function App() {
    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );

    const [mostrarCadastro, setMostrarCadastro] = useState(false);
    const [paginaAtual, setPaginaAtual] = useState("inicio");

    const [tema, setTema] = useState(
        localStorage.getItem("temaAsares") || "claro"
    );

    function alternarTema() {
        const novoTema = tema === "claro" ? "escuro" : "claro";

        setTema(novoTema);
        localStorage.setItem("temaAsares", novoTema);
    }

    function handleLogout() {
        localStorage.removeItem("token");
        setToken("");
        setMostrarCadastro(false);
        setPaginaAtual("inicio");
    }

    if (!token) {
        if (mostrarCadastro) {
            return (
                <Cadastro
                    setToken={setToken}
                    onVoltarLogin={() => setMostrarCadastro(false)}
                />
            );
        }

        return (
            <Login
                setToken={setToken}
                onCriarConta={() => setMostrarCadastro(true)}
            />
        );
    }

    return (
        <div className="app-logado" data-theme={tema}>
            <Menu
                paginaAtual={paginaAtual}
                onMudarPagina={setPaginaAtual}
                onLogout={handleLogout}
                tema={tema}
                onAlternarTema={alternarTema}
            />

            {paginaAtual === "inicio" && (
                <Dashboard onLogout={handleLogout} />
            )}

            {paginaAtual === "perfil" && <Perfil />}
        </div>
    );
}

export default App;
