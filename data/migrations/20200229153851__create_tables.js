
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.string('username', 128).unique().notNullable();
    tbl.string('password', 256).notNullable();
    tbl.string('user_type');
  })
  .createTable('issues', tbl => {
    tbl.increments();
    tbl.string('issue', 128)
    .notNullable();
    tbl.string('description')
    .notNullable();
    tbl.integer('vote');
    tbl.string('city').notNullable();
    tbl.string('zip');
    
    tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('issues')
        .dropTableIfExists('users')
};
