exports.seed = function(knex) {
  return knex('favorites').del()
  .then(() => knex('users').del()) // delete all users

    .then(() => {
      return Promise.all([


        knex('users').insert([
          { id: 1, api_key: '878uahfa8y89aydf89yas98fyas9h'},
          { id: 2, api_key: '982q38uq9ur09quwnf0q45vw45vu0'}
        ])
        .then(user => {
          return knex('favorites').insert([
            { city: 'orlando,fl', user_id: 1 },
            { city: 'seattle,wa', user_id: 2 },
            { city: 'santa fe,nm', user_id: 1 }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
