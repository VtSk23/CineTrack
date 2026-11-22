import { filmesIniciais } from "./data/filmes.js";
import { use, useState } from "react";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";

function App() {
  const [status, setStatus]= useState("todos");
  const [busca, setBusca] = useState("");

  const visiveis = filmesIniciais
    .filter((f) => status === "todos" || f.status === status)
    .filter((f) => f.titulo.toLowerCase().includes(busca.toLowerCase()));

  return (
    <>
      <Header busca={busca} aoBuscar={setBusca}/>
      <Filtros ativo={status} aoMudar={setStatus}/>
      <p className="contador">
        Exibindo {visiveis.length} de {filmesIniciais.length} filmes
      </p>
      <main>
        <ListaFilmes filmes={visiveis} />
      </main>
    </>
  );
}

export default App;