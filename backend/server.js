const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const ARQUIVO = path.join(__dirname, "data", "filmes.json");

const STATUS = ["assistido", "assistindo", "quero"];

function validarFilme(f) {
  const erros = [];
  if (typeof f.titulo !== "string" || !f.titulo.trim()) erros.push("título é obrigatório");
  if (!Number.isInteger(f.ano) || f.ano < 1888 || f.ano > 2030)
    erros.push("ano deve estar entre 1888 e 2030");
  if (!Number.isInteger(f.nota) || f.nota < 1 || f.nota > 5)
    erros.push("nota deve estar entre 1 e 5");
  if (!STATUS.includes(f.status))
    erros.push("status deve ser assistido, assistindo ou quero");
  return erros;
}

function lerFilmes() {
    return JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));
}

function salvarFilmes(lista) {
    fs.writeFileSync(ARQUIVO, JSON.stringify(lista, null, 2));
}

function gerarId(lista) {
    return Math.max(0, ...lista.map((f) => f.id)) + 1;
}

app.post("/filmes", (req, res) => {
  const dados = req.body ?? {};
  const erros = validarFilme(dados);
  if (erros.length) return res.status(400).json({ erros });
  const lista = lerFilmes();
  const novo = { ...dados, id: gerarId(lista) };
  lista.push(novo);
  salvarFilmes(lista);
  res.status(201).json(novo);
});

app.put("/filmes/:id", (req, res) => {
  const id = Number(req.params.id);
  const lista = lerFilmes();
  const i = lista.findIndex((f) => f.id === id);
  if (i === -1) return res.status(404).json({ erro: "Filme não encontrado" });
  const atualizado = { ...lista[i], ...(req.body ?? {}), id };
  const erros = validarFilme(atualizado);       
  if (erros.length) return res.status(400).json({ erros });
  lista[i] = atualizado;
  salvarFilmes(lista);
  res.json(atualizado);
});

app.delete("/filmes/:id", (req, res) => {
    const id = Number(req.params.id);
    const lista = lerFilmes();
    if (!lista.some((f) => f.id === id))
    return res.status(404).json({ erro: "Filme não encontrado" });
    salvarFilmes(lista.filter((f) => f.id !== id));
    res.sendStatus(204);
});

app.get("/filmes", (req, res) => {
    const { q, status } = req.query;
    let lista = lerFilmes();
    if (q) {
        const termo = String(q).toLowerCase();
        lista = lista.filter((f) => f.titulo.toLowerCase().includes(termo));
    }
    if (status) lista = lista.filter((f) => f.status === status);
    res.json(lista);
});

app.get("/stats", (req, res) => {
    const lista = lerFilmes();
    const porStatus = lista.reduce((acc, f) => {
        acc[f.status] = (acc[f.status] || 0) + 1;
        return acc;
    }, {});
    const soma = lista.reduce((acc, f) => acc + f.nota, 0);
    res.json({
        total: lista.length,
        porStatus,
        mediaNotas: lista.length ? Number((soma / lista.length).toFixed(1)) : 0,
    });
});

const porta = process.env.PORT || 3000;
app.listen(porta, () => console.log(`API na porta ${porta}`));