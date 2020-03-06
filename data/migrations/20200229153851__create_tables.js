
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.string('username', 128).unique().notNullable();
    tbl.string('password', 256).notNullable();
    tbl.string('user_type');
  })

.createTable('votes', tbl => {
  tbl.primary(['user_id', 'issue_id'])

  tbl.integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT')

  tbl.integer('issue_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('issues')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT')

  tbl.integer('register_vote')
    .defaultTo(0)
})


  .createTable('issues', tbl => {
    tbl.increments();
    tbl.string('issue', 128)
        .notNullable();
    tbl.string('description')
        .notNullable();
    tbl.integer('vote')
        .defaultTo(0);
    tbl.string('city')
        .notNullable();
    tbl.string('zip');
    
    tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('issues')
    .dropTableIfExists('votes')
    .dropTableIfExists('users')
};
