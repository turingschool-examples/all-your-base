/*jshint esversion: 6 */

exports.seed = function(knex) {
 // Deletes ALL existing entries
 return knex('favorites').del()
   .then(() => knex('users').del())

     .then(() => {
       return Promise.all([
         knex('users').insert({
           api_key: '123456789'
         }, 'id')
         .then(user => {
           return knex('favorites').insert([
             { location: 'Denver,CO', user_id: user[0] },
             { location: 'Orlando,FL', user_id: user[0] }
           ]);
         })
         .then(() => console.log('Seeding Complete!'))
         .catch(error => console.log(`Error seeding data: ${error}`))
       ]);
     })
     .catch(error => console.log(`Error seeding data: ${error}`));
};
