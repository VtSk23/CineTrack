const STATUS = [
{ valor: "todos", rotulo: "Todos" },
{ valor: "assistido", rotulo: "Assistido" },
{ valor: "assistindo", rotulo: "Assistindo" },
{ valor: "quero", rotulo: "Quero assistir" },
];

export default function Filtros({ ativo, aoMudar}) {
    return (
        <nav>
            {STATUS.map((s) => (
                <button 
                    key={s.valor}className={ativo === s.valor ? "ativo" : ""} 
                    onClick={ () => aoMudar(s.valor)}
                >
                    {s.rotulo}
                </button>
            ))}
        </nav>
    );
}