const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const ARQUIVO = path.join(__dirname, "data", "filmes.json");

function lerFilmes() {
    return JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));
}

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

app.listen(3000, () => console.log("API na porta 3000"));