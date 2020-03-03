const db = require('../data/dbConfig.js')

module.exports={
    getIssues,
    getIssuesById,
    addIssue,
    getIssuesFilter,
    updateIssue,
    deleteIssue,
    
}



function getIssues() {
  return db('issues')
    
}

function getIssuesById(id) {
    return db('issues')
      .select('id', 'issue', 'description', 'city', 'vote', 'user_id')
      .where( {id} )
      .first();
  }

function addIssue(issue) {
  return db('issues as i')
    .insert(issue, 'id')
    .then(ids => {
      const [id] = ids;
      return getIssuesById(id)
    })
}

function updateIssue(id, changes){
    return db('issues')
    .where({id})
    .update(changes)
    .then(ids => {
        return db('issues')
        .select('*')
        .where( {id} )
      })
}

function deleteIssue(id) {
  return db('issues')
    .where("id", id)
    .delete()
  
}

function getIssuesFilter(filter){
return db('issues')
  .select(
    'city', 
    'zip', 
    'issue', 
    'description', 
    'user_id')
  .where( 'user_id', filter)
}