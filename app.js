function rotuloStatus(status){
    if (status == "assistido") return "Assistido";
    if (status == "assistindo") {
        return "Assistindo";
    }
    if (status == "quero") return "Quero Assistir";
    return status;
}

const estrelas = (nota) => {
    let resultado="";
    for (let i = 1; i <= 5; i++){
        resultado += i <= nota ? "★" : "☆";
    }
    return resultado;
}

const badgePrimeiroCard = document.querySelector(".card [class^='badge-']");
if (badgePrimeiroCard){
    badgePrimeiroCard.textContent = rotuloStatus("assistido");
}

const notaPrimeiroCard = document.querySelector(".card p:nth-of-type(2)");
if (notaPrimeiroCard) {
  notaPrimeiroCard.textContent = `Nota: ${estrelas(5)}`;
}

const TOTAL = 6;
const footerSmall = document.querySelector("footer small");
if (footerSmall) {
  footerSmall.textContent = `CineTrack © 2026 • ${TOTAL} filmes cadastrados`;
}
