const Forecast = require('../poos/forecast')

const new = (request, response) => {
  ForecastFacade.new(req.query.location)
    .then((forecast) => {
      response.status(200).json(forecast);
    })
    .catch((error) => {
      response.status(500).json({error});
    })
}

module.exports = {
  new,
}
