const lista = document.querySelector("#lista");
const modal = document.querySelector("#modal");
const form = document.querySelector("#form-filme");
const gerarId = (lista) => Math.max(0, ...lista.map((f) => f.id)) + 1;
const abrir = () => modal.hidden = false;
const fechar = () => modal.hidden = true;
let editandoId = null;

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

function validarFilme(filme) {
  const erros = [];
  if (!filme.titulo) erros.push("Título obrigatório");
  if (!filme.genero) {
    erros.push("Gênero obrigatório");
  } else if (!/^[\p{L}\s-]+$/u.test(filme.genero)) {
    erros.push("Gênero deve conter apenas letras");
  }
  if (filme.ano < 1888 || filme.ano > 2030) erros.push("Ano inválido");
  return { valido: erros.length === 0, erros };
}

function criarCard(f) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = f.id;

  const img = document.createElement("img");
  img.src = f.poster;
  img.alt = f.titulo;

  const titulo = document.createElement("h2");
  titulo.textContent = f.titulo;

  const info = document.createElement("p");
  info.textContent = `${f.ano} · ${f.genero}`;

  const nota = document.createElement("p");
  nota.textContent = `Nota: ${estrelas(f.nota)}`;

  const badge = document.createElement("div");
  badge.className = `badge-${f.status}`;
  badge.textContent = rotuloStatus(f.status);

  const acoes = document.createElement("div");
  acoes.className = "acoes";
  const btnEditar = document.createElement("button");
  btnEditar.className = "btn-editar";
  btnEditar.textContent = "Editar";
  const btnRemover = document.createElement("button");
  btnRemover.className = "btn-remover";
  btnRemover.textContent = "Remover";
  acoes.append(btnEditar, btnRemover);

  const comentario = document.createElement("p");
  comentario.textContent = f.comentario;

  card.append(img, titulo, info, nota, badge, acoes, comentario);
  return card;
}

function renderizarCards(filmes) {
  const frag = document.createDocumentFragment();
  filmes.forEach((f) => frag.appendChild(criarCard(f)));
  lista.replaceChildren(frag);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(form));
  dados.titulo = dados.titulo.trim();
  dados.ano  = Number(dados.ano);
  dados.genero = dados.genero.trim();
  dados.poster = dados.poster.trim();
  dados.status = dados.status.trim();
  dados.nota = Number(dados.nota);
  dados.comentario = dados.comentario.trim();

  const { valido, erros } = validarFilme(dados);
  if (!valido) { alert(erros.join("\n")); return; }

  if (editandoId !== null) {
    filmes = filmes.map((f) => f.id === editandoId ? { ...f, ...dados } : f);
  } else {
    filmes = [...filmes, { id: gerarId(filmes), ...dados }];
  }
  renderizarCards(filmes);
  atualizarRodape()
  fechar();
});

lista.addEventListener("click", (e) => {
  const botao = e.target.closest(".btn-remover");
  if (!botao) return;
  if (!confirm("Remover este filme?")) return;
  const card = botao.closest(".card");
  const id = Number(card.dataset.id);
  filmes = filmes.filter((f) => f.id !== id);
  renderizarCards(filmes);
  atualizarRodape()
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

document.querySelector("header button")
  .addEventListener("click" , () => {
    editandoId = null;
    form.reset();
    abrir();
  })

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) fechar();
});

document.querySelector("#modal #btn-cancelar")  
  .addEventListener("click", fechar);

lista.addEventListener("click", (e) => {
  const botao = e.target.closest(".btn-editar");
  if (!botao) return;
  const card = botao.closest(".card");
  editandoId = Number(card.dataset.id);
  const f = filmes.find((x) => x.id === editandoId);
  form.elements.titulo.value = f.titulo;
  form.elements.ano.value = f.ano;
  form.elements.genero.value = f.genero;
  form.elements.poster.value = f.poster;
  form.elements.nota.value = f.nota;
  form.elements.status.value = f.status;
  form.elements.comentario.value = f.comentario;
  abrir();
});

function atualizarRodape() {
  const footerSmall = document.querySelector("footer small");
  if (footerSmall) {
    footerSmall.textContent = `CineTrack © 2026 • ${filmes.length} filmes cadastrados`;
  }
}

renderizarCards(filmes);
atualizarRodape()