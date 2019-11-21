
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('favorites', function(table) {
      table.string('location');
      table.increments('id').primary();
      table.bigInteger('user_id').unsigned()
      table.foreign('user_id').references('users.id')

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('favorites', function(table) {
      knex.schema.dropTable('favorites')

    })
  ]);
};
