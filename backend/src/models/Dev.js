// Representação da entidade "Dev" da nossa aplicação.
// Ou representação da tabela "Dev" do banco de dados.

const { model, Schema } = require('mongoose');

const PointSchema = require('./utils/PointSchema');

const DevSchema = new Schema({
  // Campos da tabela, juntamente com o tipo de dado do campo.
  name: String,
  github_username: String, // Todas as informações serão buscadas através da API do Github.
  bio: String,
  avatar_url: String,
  techs: [String], // Fazendo com que as techs sejam um vetor de Strings.
  // Passando configurações especiais para esse campo:
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
});

// Primeiro parâmetro: Qual nome a tabela vai ter dentro do banco de dados | Segundo parâmetro: O Schema de referência.
module.exports = model('Developer', DevSchema);