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


function addIssue(issue) {
  return db('issues as i')
    .insert(issue, 'id')
    .then(ids => {
      console.log(`ADD ISSUE`, ids)
      const [id] = ids;
      return getIssuesById(id)
    })
}


function getIssuesById(id) {
  return db('issues')
    .select('*')
    .where( {id} )
    .first()
}

async function updateIssue(id, changes){
    await db('issues')
      .where({id})
      .update(changes)
    
    return getIssuesById(id)
    
}

async function updateVote(id, changes){
  await db('issues')
    .where({id})
    .update(changes)
      
  return db('issues')
      .select('vote')
      .where({ id })
      .first() 

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