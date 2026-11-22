export default function Estrelas ({ nota }){
    return (
        <span aria-label={`Nota ${nota} de 5`}>
            {"★".repeat(nota) + "✩".repeat(5 - nota)}
        </span>
    );
}