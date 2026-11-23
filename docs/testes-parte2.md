Testes executados na API via PowerShell/Invoke-RestMethod e na integração com o frontend React:

Relatório de Testes — Parte 2

Testes de Endpoints e Persistência


Caso de Teste   
 Listar todos os filmes
Método / Rota 
 GET/filmes
Entrada  
-
Status Esperado / Obtido 
200 OK
Resultado
Lista certa JSON retornada 


Caso de Teste     
filtrar por status 
Método / Rota 
GET /filmes?status=assistido
Entrada  
query `status
Status Esperado / Obtido 
200 OK
Resultado
apenas filmes com status de assistido retornados

Caso de Teste        
buscar ID existente 
Método / Rota 
GET /filmes/1
Entrada  
ID 1
Status Esperado / Obtido 
200 OK
Resultado
Objeto do filme retornado


Caso de Teste        
buscar ID inexistente 
Método / Rota 
GET /filmes/99
Entrada  
ID 99
Status Esperado / Obtido 
404 Not Found
Resultado
Retornou erro de não encontrado:  {"erro":"Filme não encontrado"}

Caso de Teste      
 Criar filme válido
Método / Rota 
POST /filmes
Entrada  
json válido com título, ano, nota e status
Status Esperado / Obtido 
201 Created
Resultado
o filme criado com ID e salvo em `data/filmes.json


Caso de Teste        
Criar filme inválido 
Método / Rota 
POST /filmes
Entrada  
 Título vazio / ano inválido / nota fora de 1–5
Status Esperado / Obtido 
400 Bad Request
Resultado
Array erros retornado sem gravar no arquivo : ["nota deve estar entre 1 e 5","status deve ser assistido, assistindo ou quero"]
 

Caso de Teste    
Atualizar filme válido 

Método / Rota 
PUT /filmes/1
Entrada  
{ "nota": 3 }
Status Esperado / Obtido 
`200 OK
Resultado
a nota foi atualizada no ID original 

id         : 1
titulo     : A Origem
ano        : 2010
genero     : Ficção científica
nota       : 3
status     : assistido
comentario : Revejo sempre.
poster     : /img/origem.jpg



Caso de Teste     
Atualizar ID inexistente
Método / Rota 
PUT /filmes/99
Entrada  
{ "nota": 3 }
Status Esperado / Obtido 
404 Not Found
Resultado
Erro retornado


Caso de Teste       
Remover filme existente 
Método / Rota 
 DELETE /filmes/1
Entrada  
ID 1
Status Esperado / Obtido 
204 No Content
Resultado
o filme removido e arquivo JSON foi atualizado 



Caso de Teste     
Persistência após reinício 
Método / Rota 
Reiniciar servidor Node 
Entrada  
GET /filmes
Status Esperado / Obtido 
200 OK
Resultado
alterações foram mantidas depois de reiniciar o backend 




Testes de Integração

Carregamento inicial: ao abrir http://localhost:5173, a interface exibe o estado de carregamento e popula a lista vinda de GET /filmes

Busca e filtros: filtro por texto no título e filtro por status (Todos, Assistido, Assistindo, Quero assistir) atualizam a lista e o contador sem recarregar a página.

Adição e Edição: o modal valida título e ano no frontend antes do envio, aguarda a resposta da API POST/PUT e atualiza o estado sem mutação. Filmes sem URL de pôster exibem fallback visual sem erro no console

Remoção: solicita confirmação window.confirm antes de chamar DELETE /filmes/:id e remove o card após resposta 204

Tratamento de falhas:com o servidor backend desligado ou retorno 4xx/5xx, a interface exibe a mensagem de erro visível ao usuário sem travar a aplicação.