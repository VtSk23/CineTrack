import { filmesIniciais } from "./data/filmes.js";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";

function App() {
  return (
    <>
      <Header />
      <Filtros />
      <main>
        <ListaFilmes filmes={filmesIniciais} />
      </main>
    </>
  );
}

export default App;