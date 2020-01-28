const User = require('../models/user')

const index = (request, response) => {
  User.all()
    .then((users) => {
      response.status(200).json(users);
    })
    .catch((error) => {
      response.status(500).json({error});
    })
}

module.exports = {
  index,
}
