function estrelas(nota) {
    return "★".repeat(nota) + "✩".repeat(5 - nota);
}

const ROTULOS = {
    assistido: "Assistido",
    assistindo: "Assistindo",
    quero: "Quero assistir",
};

export default function CardFilme({ filme }) {
    return (
    <article className="card">
    <img src={filme.poster} alt="" />
    <h2>{filme.titulo}</h2>
    <p>{filme.ano} · {filme.genero}</p>
    <p>Nota: {estrelas(filme.nota)}</p>
    <span className={`badge-${filme.status}`}>{ROTULOS[filme.status]}</span>
    {filme.comentario && <p className="comentario">{filme.comentario}</p>}
    </article>
    );
}