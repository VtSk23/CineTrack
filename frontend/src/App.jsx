import {  useEffect, useState } from "react";
import { filmesIniciais, gerarId } from "./data/filmes.js";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import ModalFilme from "./components/ModalFilme.jsx";
import { listar } from "./api.js";

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  const [editando, setEditando] = useState(null); 

  useEffect(() => {
    listar()
      .then((dados) => setFilmes(dados))
      .catch((erro) => setErro(erro.message))
      .finally(() => setCarregando(false));
  }, []);

  useEffect(() => {
    document.title = `CineTrack (${filmes.length})`;
  }, [filmes.length]);

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

  let conteudo;
  if (carregando) {
    conteudo = <p>Carregando...</p>;
  } else if (erro) {
    conteudo = <p className="erro">Erro: {erro}</p>;
  } else {
    conteudo = <ListaFilmes filmes={visiveis} aoEditar={setEditando} aoRemover={pedirRemocao} />;
  }

  return (
    <>
      <Header busca={busca} aoBuscar={setBusca} aoAdicionar={() => setEditando({})} />
      <Filtros ativo={status} aoMudar={setStatus} />
      {!carregando && !erro && (
        <p className="contador">Exibindo {visiveis.length} de {filmes.length} filmes</p>
      )}
      <main>
        {conteudo}
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