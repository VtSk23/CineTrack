# Documentação da API REST - CineTrack

Base URL: http://localhost:3000
Formato de dados: application/json

Endpoints

1. Listar filmes
- Método e Rota: GET /filmes
- Query Params (opcional): ?status=assistido|assistindo|quero
- Respostas:
 - 200 OK: Retorna um array JSON com os filmes cadastrados (filtrados por status, se informado).

2. Buscar filme por ID
Método e Rota: GET /filmes/:id
- Respostas:
 - 200 OK: Retorna o objeto JSON do filme correspondente ao id
 - 404 Not Found: { "erro": "Filme não encontrado" } quando o id não existe.

3. Criar novo filme
- Método e Rota: POST /filmes
- Corpo da Requisição (JSON):
 ```json
 {
 "titulo": "Interestelar",
 "ano": 2014,
 "genero": "Ficção Científica",
 "poster": "[https://exemplo.com/poster.jpg](https://exemplo.com/poster.jpg)",
 "nota": 5,
 "status": "assistido",
 "comentario": "Excelente trilha sonora."
 }