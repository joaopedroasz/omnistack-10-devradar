// Arquivo de configuração das rotas da aplicação:

// Métodos HTTP para lidar com rotas:
// GET -> Buscando informações do servidor.
// POST -> Criar informações no servidor.
// PUT -> Editar informações do servidor.
// DELETE -> Deletar informações.

// Tipos de parâmetros em uma requisição (request) e resposta (response) a um servidor:
// QUERY -> Informações que são utilizadas com o método GET. Informações que são passadas na URL que definem o tipo de busca que será realizada. EX: "localhost:8000/?search=Joao" => Nesse caso, o 'search' que vai ser o Query Param e 'Joao' vai ser o valor. É possível acessar essas variáveis através de 'request.query'.
// ROUTE -> Informações que são utilizadas com os métodos PUT e DELETE. Informações passadas na URL que podem ser usadas para achar um recurso específico. EX: "localhost:8000/users/buscar/:user_id" => Buscando usuário pelo id. Essa sintaxe de ':user_id' vai definir o Route Param. É possível acessar os Route Params através de 'request.param'
// BODY -> Informações que são utilizadas com os métodos POST e PUT. Informações que serão passadas dentro do corpo da requisição, através de JSON. O corpo ta requisisão pode carregar informações para criação dos mais diversos tipos de dados. É possível acessar o corpo da requisição através do 'request.body'.

const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Rotas dos devs:
routes.get('/devs', DevController.index);
routes.get('/dev', DevController.show);
routes.post('/devs', DevController.store);
routes.put('/dev/:_id', DevController.update);
routes.delete('/dev/:_id', DevController.destroy);

// Rotas de procura de devs:
routes.get('/devs/search', SearchController.index);

// Lidando com rotas: (Request -> Requisição do usuário ao servidor | Response -> Resposta do servidor para o usuário)

module.exports = routes; // Exportando as rotas para que toda aplicação possa usa-las.