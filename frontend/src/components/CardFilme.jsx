import Estrelas from "./Estrelas";
import Badge from "./Badge";

export default function CardFilme({ filme , aoEditar, aoRemover}) {
    return (
    <article className="card">
        <img src={filme.poster} alt="" />
        <h2>{filme.titulo}</h2>
        <p>{filme.ano} · {filme.genero}</p>
        <p>Nota: <Estrelas nota={filme.nota}/></p>
        <Badge status={filme.status} />
        {filme.comentario && <p className="comentario">{filme.comentario}</p>}
        <div className="acoes">
            <button onClick={() => aoEditar(filme)}>Editar</button>
            <button onClick={() => aoRemover(filme.id)}>Remover</button>
        </div>
    </article>
    );
}