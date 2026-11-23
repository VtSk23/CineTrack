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
    if (!dados.titulo || !dados.ano)
    return res.status(400).json({ erro: "Dados obrigatórios" });
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
    lista[i] = { ...lista[i], ...(req.body ?? {}), id };
    salvarFilmes(lista);
    res.json(lista[i]);
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