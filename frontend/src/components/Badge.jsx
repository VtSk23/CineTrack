const ROTULOS = {
    assistido: "Assistido",
    assistindo: "Assistindo",
    quero: "Quero assistir",
};

export default function Badge({status}){
    return <span className={`badge-${status}`}>{ROTULOS[status]}</span>;
}