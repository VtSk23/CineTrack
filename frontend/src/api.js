const BASE = "http://localhost:3000";

async function pedir(url, opcoes = {}) {
  const res = await fetch(url, opcoes);
  const dados = res.status === 204 ? null : await res.json().catch(() => ({}));

  if (!res.ok) {
    const mensagem = Array.isArray(dados?.erros)
      ? dados.erros.join(" | ")
      : dados?.erro || `Erro HTTP ${res.status}`;
    throw new Error(mensagem);
  }

  return dados;
}

export const listar = () => pedir(`${BASE}/filmes`);
export const criar = (f) =>
  pedir(`${BASE}/filmes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(f),
  });
export const atualizar = (id, f) =>
  pedir(`${BASE}/filmes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(f),
  });
export const remover = (id) => pedir(`${BASE}/filmes/${id}`, { method: "DELETE" });