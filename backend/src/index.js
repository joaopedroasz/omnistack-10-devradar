const express = require('express'); // Importando express.
const mongoose = require('mongoose'); // Importando mongoose.
const cors = require('cors');

const routes = require('./routes');

const app = express(); // Criando servidor. Pegando as funcionalidades do express.

mongoose.connect('mongodb://localhost:27017/omnistack10', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors()); // Liberando acesso para todas aplicações externas consumirem a API.
app.use(express.json()); // Fazendo com que requisições JSON sejam entendidas pela aplicação.
app.use(routes); // Fazendo com que o servidor utilize as rotas.

app.listen(8000); // Servidor rodando na porta 8000.