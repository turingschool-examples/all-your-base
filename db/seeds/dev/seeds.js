exports.seed = function(knex) {
  return knex("favorites")
    .del()
    .then(() => knex("users").del())
    .then(() => {
      return Promise.all([
        knex("users")
          .insert(
            {
              name: "Jason Bourne",
              api_key: "1234abcd"
            },
            "id"
          )
          .then(user => {
            return knex("favorites").insert([
              { location: "jacksonville, fl", user_id: user[0] },
              { location: "denver, co", user_id: user[0] }
            ]);
          })
          .then(() => console.log("Seeding complete!"))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
