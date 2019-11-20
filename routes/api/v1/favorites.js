var express = require("express");
var router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);

const show = router.get("/", (request, response) => {
  const userApiKey = request.body.api_key;
  database("users")
    .where("api_key", userApiKey)
    .then(user => {
      if (user[0]) {
        database("favorites")
          .where("user_id", user[0].id)
          .then(favorites => {
            response.status(200).json(favorites);
          })
          .catch(error => {
            response.status(401).json({ error });
          });
      } else {
        return response
          .status(401)
          .json({ error: "Please supply a valid API key" });
      }
    });
});

module.exports = {
  show
};
