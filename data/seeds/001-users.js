
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {

      const userSeed = 
        [
          { username: 'Nic', password: 'Test123', user_type: 'citizen' },
          { username: 'Ammon', password: 'Test123', user_type: 'citizen' },
          { username: 'Thomas', password: 'Test123', user_type: 'citizen' }
        ]
      
      // Inserts seed entries
      return knex('users').insert(userSeed);
    });
};
