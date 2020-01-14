// Arquivo para configuração de latitude e longitude que serão armazenados junto com o dev.

const { Schema } = require('mongoose');

const PointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'], // Fazendo com que a string passada tenha que ter o valor 'Point'.
    required: true // Fazendo com que seja obrigatório.
  },
  coordinates: {
    type: [Number], // Esse campo vai ser um array de números.
    required: true
  }
});

module.exports = PointSchema;