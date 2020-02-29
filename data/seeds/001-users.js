
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {

      const userSeed = 
        [
          { username: 'Nic', password: 'Test123', user_type: 'user' },
          { username: 'Ammon', password: 'Test123', user_type: 'user' },
          { username: 'Thomas', password: 'Test123', user_type: 'user' }
        ]
      
      // Inserts seed entries
      return knex('users').insert(userSeed);
    });
};
