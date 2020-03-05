const db = require('../data/dbConfig.js')

module.exports={
    getIssues,
    getIssuesById,
    addIssue,
    getIssuesFilter,
    updateIssue,
    deleteIssue,
    updateVote
    
}



function getIssues() {
  return db('issues')
    
}

function getIssuesById(id) {
    return db('issues')
      .select('*')
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
      const [id] = ids;
      return getIssuesById(id); 
    })
}

function updateVote(id, changes){
  return db('issues')
  .where({id})
  .update(changes)
  .then(() => {
      return db('issues')
      .select('vote')
      .first() 
      .where({ id })
    })
}




function deleteIssue(id) {
  return db('issues')
    .where("id", id)
    .delete()
  
}

function getIssuesFilter(filter){
return db('issues')
  .select('*')
  .where( 'user_id', filter)
}