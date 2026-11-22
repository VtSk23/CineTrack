export default function Header({ busca, aoBuscar}) {
    return (
        <header>
            <h1>CineTrack</h1>
            <input 
                placeholder="Buscar filme..." 
                value = {busca}
                onChange = {(e) => aoBuscar(e.target.value)}
            />
            <button>+ Adicionar</button>
        </header>
    );
}