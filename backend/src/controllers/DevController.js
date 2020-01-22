const axios = require('axios');

const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');
const {
  findConnections,
  sendMessage
} = require('../websocket');

// Métodos de um controller:
// index -> Retorna uma lista dos recursos disponíveis. (Nesse caso, todos os Devs cadastrados)
// show -> Retorna um recurso específico. (Nesse caso, apenas um Dev específico)
// store -> Criar um recurso específico. (Nesse caso, criar um Dev)
// update -> Atualizar uma informação de um recurso específico. (Nesse caso, atualizar informações de um Dev)
// destroy -> Deletar um recurso específico. (Nesse caso, deletar um Dev)

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async show(req, res) {
    const {
      name
    } = req.query;

    const dev = await Dev.find({
      name: {
        $regex: name,
        $options: 'i'
      }
    });

    return res.json(dev);
  },

  async store(req, res) {
    const {
      github_username,
      techs,
      latitude,
      longitude
    } = req.body;

    let dev = await Dev.findOne({
      github_username
    }); // Procurando um usuário com base no 'github_username' passado.

    if (!dev) {
      // Chamada a API do github:
      const response = await axios.get(`https://api.github.com/users/${github_username}`);

      const {
        name = login, // Colocando uma valor padrão para 'name'. Se o 'response.data' não retornar 'name' ele vai pegar o 'login'.
        avatar_url,
        bio
      } = response.data;

      // Pegando as tecnologias informadas pelo usuário e dividindo em um array ( techs.split(',') ).
      // Depois, pegando cada elemento e tirando os espaços antes e depois.
      const techsArray = parseStringAsArray(techs);

      // A estrutura é assim pois foi definida assim no 'PointSchema.js'.
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude] // As coordenadas são um array da longitude e latitude.
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      // Filtrar as conexões que estão no máximo 10KM de distância
      // e que o novo dev tenha pelo menos uma das tecnologias pesquisadas.
      const sendSocketMessageTo = findConnections({
        latitude,
        longitude
      }, techsArray);

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return res.json(dev);
  },

  async update(req, res) {
    const {
      _id
    } = req.params;

    const dev = await Dev.findById(_id);

    if (!dev) {
      return res.status(404).json({ error: 'Dev not found' });
    }

    const devUpdated = await Dev.findByIdAndUpdate(_id, req.body, {
      new: true
    });

    return res.json(devUpdated);
  },

  async destroy(req, res) {
    const { _id } = req.params;

    const dev = await Dev.findById(_id);

    if (!dev) {
      return res.status(404).json({ error: 'Dev not found' });
    }

    return res.json({ succeeded: 'Dev deleted' });
  }
};