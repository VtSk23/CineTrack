import { useState } from "react";
import { filmesIniciais, gerarId } from "./data/filmes.js";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import ModalFilme from "./components/ModalFilme.jsx";

export default function App() {
  const [filmes, setFilmes] = useState(filmesIniciais);
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  const [editando, setEditando] = useState(null); 

  function adicionar(novo) {
    setFilmes((ant) => [...ant, { ...novo, id: gerarId(ant) }]);
  }

  function remover(id) {
    setFilmes((ant) => ant.filter((f) => f.id !== id));
  }

  function editar(id, alteracoes) {
    setFilmes((ant) => ant.map((f) => (f.id === id ? { ...f, ...alteracoes } : f)));
  }

  function salvar(dados) {
    if (editando.id) editar(editando.id, dados);
    else adicionar(dados);
    setEditando(null);
  }
  function pedirRemocao(id) {
    const filme = filmes.find((f) => f.id === id);
    if (filme && window.confirm(`Remover "${filme.titulo}"?`)) remover(id);
  }

  const visiveis = filmes
    .filter((f) => status === "todos" || f.status === status)
    .filter((f) => f.titulo.toLowerCase().includes(busca.toLowerCase()));

  return (
    <>
      <Header busca={busca} aoBuscar={setBusca} aoAdicionar={() => setEditando({})} />
      <Filtros ativo={status} aoMudar={setStatus} />
      <p className="contador">Exibindo {visiveis.length} de {filmes.length} filmes</p>
      <main>
        <ListaFilmes filmes={visiveis} aoEditar={setEditando} aoRemover={pedirRemocao} />
      </main>
      {editando !== null && (
        <ModalFilme
          key={editando.id ?? "novo"}
          filme={editando}
          aoSalvar={salvar}
          aoFechar={() => setEditando(null)}
        />
      )}
    </>
  );
}