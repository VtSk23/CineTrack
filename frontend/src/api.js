import { filmesIniciais } from "./data/filmes.js";

function esperar(ms) {
    return new Promise((ok) => setTimeout(ok, ms));
}

export async function listar() {
    await esperar(500); 
    return filmesIniciais;
}