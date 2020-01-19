const Dev = require('../models/Dev')
const parseArrayAsString = require('../utils/parseStringAsArray')

module.exports = {
  async index(req, res) {
    // rota de busca

    // console.log(req.query)

    const { latitude, longitude, techs } = req.query

    const techsArray = parseArrayAsString(techs)

    try {
      const devs = await Dev.find({
        techs: {
          $in: techsArray
        },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
            $maxDistance: 10000,
          }
        }
      })

      return res.json({ devs })
    } catch (e) {
      return res.json({ message: 'Error on search!', error: e })
    }
  }
}