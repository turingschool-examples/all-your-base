
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()

    .then(() => {
      return Promise.all([

        knex('users').insert([
          {id: 1, api_key: '123456789', email: 'whereswaldo123@gmail.com' },
          {id: 2, api_key: '987654321', email: 'carmensandiego456@gmail.com' },
          {id: 3, api_key: '024681357', email: 'harrietthespy789@gmail.com' }
        ])
        .then(() => console.log('Seeding complete'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) //promise
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
