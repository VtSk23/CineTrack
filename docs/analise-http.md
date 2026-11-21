# Análise de tráfego HTTP

## 1. Primeira requisição
- Método: GET
- URL: https://developer.mozilla.org/pt-BR/
- Status: 304 Not Modified

## 2. Recursos estáticos 

Tipo      
   
CSS    
URL https://developer.mozilla.org/static/client/styles-global.4540cb6e7aa44d50.css
Status 200 OK (from memory cache)
Content-Type text/css


JS    
URL  https://developer.mozilla.org/static/client/runtime.3d668166e9036abe.js
Status 200 OK (from memory cache)
Content-Type  text/javascript

Imagem 
URL   https://developer.mozilla.org/static/client/menu.74ccd9bb64dbf543.svg
Status 200 OK (from memory cache)
Content-Type image/svg+xml


## 3. Erro 404
- URL testada: https://developer.mozilla.org/pt-BR/nao-existe
- Status: 404 Not Found
- O que mudou em relação ao 200: 
page not found
content-type text/html


## 4. Requisição de API (Fetch/XHR)
- Site: youtube
- Método / caminho / status: POST/ https://m.youtube.com/youtubei/v1/guide?prettyPrint=false /200 OK
- Relação com a tabela ação × método × rota do docs/requisitos.md: 
A busca do YouTube equivale à ação "listar/buscar filmes" da minha tabela
(GET /filmes). Em comum: as duas leem uma coleção de itens e devolvem uma
lista em JSON. Diferenças: o YouTube usa POST e envia o termo buscado no
corpo da requisição, enquanto no CineTrack a leitura usa GET e o filtro
iria na URL (por exemplo, /filmes?status=quero), porque ler não altera
dados. O caminho do YouTube também inclui versão (/v1), algo que a minha
rota não tem.

## 5. Conclusão
Para listar filmes na Parte 2, o CineTrack usará `GET /filmes`. A URL
identifica o recurso (a coleção de filmes) e o método expressa a operação
(ler). A resposta deve ser 200 OK com um array JSON de filmes no corpo.