import "./css/ConfirmacaoModal.css";

import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";



// Contexto compartilhado para confirmação de exclusões
const ConfirmacaoContext = createContext(null);

export function ConfirmacaoProvider({ children }) {

    const [modal, setModal] = useState(null);
    const resolverRef = useRef(null);

    // Abre o modal e aguarda a resposta do usuário
    function confirmar({
        titulo = "Confirmar exclusão?",
        mensagem = "Tem certeza de que deseja excluir este registro?",
        nomeItem = ""
    } = {}) {

        // Impede abrir várias confirmações ao mesmo tempo
        if (resolverRef.current) {
            return Promise.resolve(false);
        }

        return new Promise((resolve) => {

            resolverRef.current = resolve;

            setModal({
                titulo,
                mensagem,
                nomeItem
            });

        });
    }

    // Fecha o modal e retorna a resposta
    function responder(resposta) {

        if (resolverRef.current) {
            resolverRef.current(resposta);
            resolverRef.current = null;
        }

        setModal(null);
    }

    // Permite fechar o modal usando a tecla ESC
    useEffect(() => {

        function pressionarTecla(evento) {
            if (evento.key === "Escape" && modal) {
                responder(false);
            }
        }

        window.addEventListener("keydown", pressionarTecla);

        return () => {
            window.removeEventListener("keydown", pressionarTecla);
        };

    }, [modal]);

    return (
        <ConfirmacaoContext.Provider value={{ confirmar }}>

            {children}

            {modal && (
                <div
                    className="confirmacao-overlay"
                    onMouseDown={(evento) => {
                        if (evento.target === evento.currentTarget) {
                            responder(false);
                        }
                    }}
                >

                    <section
                        className="confirmacao-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="confirmacao-titulo"
                    >

                        <div className="confirmacao-icone">
                            <span>!</span>
                        </div>

                        <h2 id="confirmacao-titulo">
                            {modal.titulo}
                        </h2>

                        <p className="confirmacao-mensagem">
                            {modal.mensagem}
                        </p>

                        {modal.nomeItem && (
                            <div className="confirmacao-item">
                                {modal.nomeItem}
                            </div>
                        )}

                        <div className="confirmacao-acoes">

                            <button
                                type="button"
                                className="confirmacao-botao-cancelar"
                                onClick={() => responder(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className="confirmacao-botao-excluir"
                                onClick={() => responder(true)}
                            >
                                Excluir
                            </button>

                        </div>

                    </section>

                </div>
            )}

        </ConfirmacaoContext.Provider>
    );
}

// Hook utilizado pelas páginas e componentes
export function useConfirmacao() {

    const contexto = useContext(ConfirmacaoContext);

    if (!contexto) {
        throw new Error(
            "useConfirmacao deve ser utilizado dentro de ConfirmacaoProvider."
        );
    }

    return contexto;
}
