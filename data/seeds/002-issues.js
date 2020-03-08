
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('issues').truncate()
    .then(function () {
      const issuesSeed = [
        { issue: "issue1", description: "bla bla bla1", zip: "123456", city: "Miami1", user_id: 1 },
        { issue: "issue2", description: "bla bla bla2", zip: "123456", city: "Miami2", user_id: 2 },
        { issue: "issue3", description: "bla bla bla3", zip: "123456", city: "Miami3", user_id: 3 },
        { issue: "issue4", description: "bla bla bla4", zip: "123456", city: "Miami4", user_id: 4 }    
      ]
      return knex('issues').insert(issuesSeed);
    });
};
