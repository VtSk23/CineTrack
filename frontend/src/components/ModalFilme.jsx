import { useState } from "react";

const VAZIO = {
 titulo: "", ano: "", genero: "", poster: "",
 status: "quero", nota: 3, comentario: "",
};

function validarFilme(d) {
    const erros = [];
    if (!d.titulo.trim()) erros.push("Informe o título.");
        const ano = Number(d.ano);
    if (!Number.isInteger(ano) || ano < 1888 || ano > new Date().getFullYear() + 5)
        erros.push("Informe um ano válido.");
    return erros;
}

export default function ModalFilme({ filme, aoSalvar, aoFechar }) {
    const [dados, setDados] = useState({ ...VAZIO, ...filme });
    const [erros, setErros] = useState([]);
    const [enviando, setEnviando] = useState(false);

    function atualizar(campo, valor) {
        setDados((anteriores) => ({ ...anteriores, [campo]: valor }));
    }

    async function submeter(evento) {
        evento.preventDefault();
        const problemas = validarFilme(dados);
        setErros(problemas);
        if (problemas.length > 0) return;

    setEnviando(true);
        try {
            await aoSalvar({ ...dados, ano: Number(dados.ano), nota: Number(dados.nota) });
        } catch (e) {
            setErros([e.message]);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <div id="modal">
            <div className="modal-conteudo">
            <h2>{filme.id ? "Editar filme" : "Adicionar filme"}</h2>
            <form onSubmit={submeter}>
                <label>Título
                    <input value={dados.titulo} onChange={(e) => atualizar("titulo", e.target.value)} />
                </label>
                <label>Ano
                    <input type="number" value={dados.ano} onChange={(e) => atualizar("ano", e.target.value)} />
                </label>
                <label>Gênero
                    <input value={dados.genero} onChange={(e) => atualizar("genero", e.target.value)} />
                </label>
                <label>Pôster (URL)
                    <input value={dados.poster} onChange={(e) => atualizar("poster", e.target.value)} />
                </label>
                <label>Status
                    <select value={dados.status} onChange={(e) => atualizar("status", e.target.value)}>
                        <option value="assistido">Assistido</option>
                        <option value="assistindo">Assistindo</option>
                        <option value="quero">Quero assistir</option>
                    </select>
                </label>
                <label>Nota
                    <select value={dados.nota} onChange={(e) => atualizar("nota", e.target.value)}>
                        {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                </label>
                <label>Comentário
                    <textarea value={dados.comentario} onChange={(e) => atualizar("comentario", e.target.value)} />
                </label>

                {erros.length > 0 && (
                    <ul className="erro" role="alert">
                        {erros.map((m) => <li key={m}>{m}</li>)}
                    </ul>
                    )}

                    <button type="button" onClick={aoFechar}>Cancelar</button>
                    <button type="submit" disabled={enviando}>Salvar</button>
                </form>
            </div>
        </div>
    );
}