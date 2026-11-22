export function mediaNotas(lista) {
  if (lista.length === 0) return 0;
  const soma = lista.reduce((acc, f) => acc + f.nota, 0);
  return Number((soma / lista.length).toFixed(1));
}

export function contagemPorStatus(lista) {
  return lista.reduce((acc, f) => {
    acc[f.status] = (acc[f.status] || 0) + 1;
    return acc;
  }, {});
}

export function ordenarPorNota(lista) {
  return [...lista].sort((a, b) => b.nota - a.nota);
}