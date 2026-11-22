import CardFilme from "./CardFilme.jsx";

export default function ListaFilmes({ filmes, aoEditar, aoRemover }) {
    if (filmes.length === 0) {
        return <p>Nenhum filme encontrado.</p>;
    }
    return (
        <section id="lista" aria-live="polite">
            {filmes.map((f) => (
                <CardFilme key={f.id} filme={f} aoEditar={aoEditar} aoRemover={aoRemover} />
            ))}
        </section>
    );
}