function rotuloStatus(status){
    if (status === "assistido") return "Assistido";
    if (status === "assistindo") {
        return "Assistindo";
    }
    if (status === "quero") return "Quero Assistir";
    return status;
}

const estrelas = (nota) => {
    let resultado="";
    for (let i = 1; i <= 5; i++){
        resultado += i <= nota ? "★" : "☆";
    }
    return resultado;
}


const filmesIniciais = [
  { id: 1, titulo: "A Origem", ano: 2010, genero: "Ficção científica",
    poster:"../img/origem.jpg",
    nota: 5, status: "assistido", comentario: "Revejo sempre." },
  { id: 2, titulo: "Parasita", ano: 2019, genero: "Suspense",
    poster: "../img/parasita.jpg",
    nota: 4, status: "assistido", comentario: "" },
  { id: 3, titulo: "O Auto da Compadecida", ano: 2000, genero: "Comédia",
    poster: "../img/auto.jpg",
    nota: 5, status: "assistido", comentario: "Clássico nacional." },
  { id: 4, titulo: "Duna: Parte Dois", ano: 2024, genero: "Ficção científica",
    poster: "../img/duna.jpg",
    nota: 4, status: "assistindo", comentario: "" },
  { id: 5, titulo: "Interestelar", ano: 2014, genero: "Ficção científica",
    poster: "../img/interestelar.jpg",
    nota: 5, status: "quero", comentario: "" },
  { id: 6, titulo: "Cidade de Deus", ano: 2002, genero: "Drama",
    poster: "../img/cidadedeDeus.jpg",
    nota: 4, status: "quero", comentario: "" },
];

let filmes = [...filmesIniciais]

const TOTAL = filmesIniciais.length;
const footerSmall = document.querySelector("footer small");
if (footerSmall) {
  footerSmall.textContent = `CineTrack © 2026 • ${TOTAL} filmes cadastrados`;
}

const lista = document.querySelector("#lista");

function renderizarCards(filmes) {
    const cards = filmes.map((f) => {
        
        return `

        <article class="card" data-id="${f.id}">
        <img src= "${f.poster}">
        <h2>${f.titulo}</h2>
        <p>${f.ano} · ${f.genero}</p>  
        <p>Nota: ${estrelas(f.nota)}</p>
        <div class="badge-${f.status}">
            <span>${rotuloStatus(f.status)}</span>
        </div>
        <div class="acoes">
            <button class="btn-editar">Editar</button>
            <button class="btn-remover">Remover</button>
        </div>
        <p>${f.comentario}</p>
        </article>`;}).join("");
    lista.innerHTML = cards;
}

lista.addEventListener("click", (e) => {
  const botao = e.target.closest(".btn-remover");
  if (!botao) return;
  if (!confirm("Remover este filme?")) return;
  const card = botao.closest(".card");
  const id = Number(card.dataset.id);
  filmes = filmes.filter((f) => f.id !== id);
  renderizarCards(filmes);
});

const nav = document.querySelector("nav");

nav.addEventListener("click", (e) => {
  const botao = e.target.closest("button");
  if (!botao) return;
  nav.querySelector(".ativo").classList.remove("ativo");
  botao.classList.add("ativo");
  const status = botao.dataset.status;
  renderizarCards(filmes.filter((f) =>
    status === "todos" || f.status === status));
});

renderizarCards(filmes);