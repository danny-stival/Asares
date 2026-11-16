
import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Menu from "./components/Menu";

import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import Receitas from "./pages/Receitas";
import Despesas from "./pages/Despesas";
import Metas from "./pages/Metas";
import RedefinirSenha from "./pages/RedefinirSenha";

import "./tema.css";

function App() {
    // Identifica a rota atual
    const location = useLocation();

    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );

    const [mostrarCadastro, setMostrarCadastro] = useState(false);

    const [tema, setTema] = useState(
        localStorage.getItem("temaAsares") || "claro"
    );

    // Alterna entre o modo claro e o modo escuro
    function alternarTema() {
        const novoTema = tema === "claro" ? "escuro" : "claro";

        setTema(novoTema);
        localStorage.setItem("temaAsares", novoTema);
    }

    // Encerra a sessão do usuário
    function handleLogout() {
        localStorage.removeItem("token");
        setToken("");
        setMostrarCadastro(false);
    }

    // Permite acessar a redefinição de senha sem estar logado
    if (location.pathname === "/redefinir-senha") {
        return (
            <div className="app-logado" data-theme={tema}>
                <RedefinirSenha
                    tema={tema}
                    onAlternarTema={alternarTema}
                />
            </div>
        );
    }

    // Tela de login e cadastro
    if (!token) {
        return (
            <div className="app-logado" data-theme={tema}>
                {mostrarCadastro ? (
                    <Cadastro
                        setToken={setToken}
                        onVoltarLogin={() => setMostrarCadastro(false)}
                        tema={tema}
                        onAlternarTema={alternarTema}
                    />
                ) : (
                    <Login
                        setToken={setToken}
                        onCriarConta={() => setMostrarCadastro(true)}
                        tema={tema}
                        onAlternarTema={alternarTema}
                    />
                )}
            </div>
        );
    }

    // Área principal do sistema após o login
    return (
        <div className="app-logado" data-theme={tema}>

            <Menu
                onLogout={handleLogout}
                tema={tema}
                onAlternarTema={alternarTema}
            />

            {/* Rotas das páginas do sistema */}
            <Routes>

                <Route
                    path="/"
                    element={<Dashboard onLogout={handleLogout} />}
                />

                <Route
                    path="/perfil"
                    element={<Perfil />}
                />

                {/* Página de receitas */}
                <Route
                    path="/receitas"
                    element={<Receitas />}
                />

                {/* Página de despesas */}
                <Route
                    path="/despesas"
                    element={<Despesas />}
                />

                {/* Página de metas financeiras */}
                <Route
                    path="/metas"
                    element={<Metas />}
                />

                {/* Redireciona endereços inexistentes para o início */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>

        </div>
    );
}

export default App;
