const bcrypt = require('bcryptjs');

exports.seed = function(knex) {

  return knex('users').truncate()
    .then(function () {

      const userSeed = [
          { username: 'Nic', password: bcrypt.hashSync('Test123!', 12), user_type: 'user' },
          { username: 'Ammon', password: bcrypt.hashSync('Test123!', 12), user_type: 'user' },
          { username: 'Thomas', password: bcrypt.hashSync('Test123!', 12), user_type: 'user' },
          { username: 'Michael', password: bcrypt.hashSync('Test123!', 12), user_type: 'user' },
          { username: 'Devoughn', password: bcrypt.hashSync('Test123!', 12), user_type: 'user' }
        ]
      
      return knex('users').insert(userSeed);
    });
};
