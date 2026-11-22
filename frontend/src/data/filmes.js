export const filmesIniciais = [
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

export function gerarId(lista) {
    return Math.max(0, ...lista.map((f) => f.id)) + 1;
}