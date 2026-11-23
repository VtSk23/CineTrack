RA: 138905 Vitor Akihiro Shiki

CineTrack
cinetrack é um gerenciador pessoal de filmes o projeto será desenvolvido na disciplina de programação web com commits frequentes para acompanhar o desenvolvimento do projeto

terá operações CRUD: adicionar filme, editar informações e remover filme

Interface com busca por título, filtros de status, lista de filmes e formulário de cadastro.

Estrutura do Repositório
parte1/ — Versão inicial estática (HTML, CSS e JavaScript puro), preservada conforme a tag v1.0
backend/ — API REST em Node.js + Express/mini-Express com persistência em arquivo JSON data/filmes.json
frontend/ — Interface reescrita em React + Vite organizada em componentes reutilizáveis
docs/ — Documentação da API api.md e relatório de testes testes-parte2.md


Funcionalidades

- Listar filmes em cards (pôster, título, ano, gênero, nota em estrelas, status e comentário)
- Adicionar, editar e remover filmes por um modal
- Filtrar por status (Todos, Assistidos, Assistindo, Quero assistir)
- Buscar por título em tempo real, combinada com o filtro de status
- Validação dos dados no formulário
- Persistência no navegador: localStorage, chave cinetrack:filmes
- Layout responsivo e tema claro/escuro

Tecnologias

HTML5, CSS3 e JavaScript

Como executar

1. Clone o repositório: git clone <url-do-repositorio>
2. Abra a pasta parte1/
3. Abra index.html no navegador ou use a extensão Live Server do VS Code

Acessibilidade

Lighthouse: 100

Práticas adotadas: textos alternativos nas imagens, rótulos nos campos,
foco visível nos botões, contraste de cores, lang="pt-BR".


Versão

v1.0 — Marco 1



Como rodar o backend
cd backend
npm install
cp .env.example .env 
npm run seed
npm run dev 


Em outro terminal:
rode o frontend
cd frontend
npm install
npm run dev