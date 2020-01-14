const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    // Buscar todos os Devs em um raio de 10km.
    // Filtrar esses Devs pela tecnologia que eles trabalham.

    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      // Desenvolvedores que tem as tecnologias que estão dentro de 'techsArray'.
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000 // Procurando desenvolvedores até 100Km da minha localização.
        }
      }
    });

    return res.json({ devs });

  }
};