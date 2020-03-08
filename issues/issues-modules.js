const db = require('../data/dbConfig.js')

module.exports={
    getIssues,
    getIssuesById,
    addIssue,
    getIssuesFilter,
    updateIssue,
    deleteIssue,
    updateVote,
    getVote,
    deleteVote,
    addVote
}



async function getIssues() {
  
  return db('issues')
          .then(issues => {
            return issues.map(async issue => {
              issue.voteCount = await getVoteCount(issue.id);
              return issue;
            })
          })
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


// Votes

function getVoteCount(issue_id) {
  return db('votes')
    .where({ issue_id })
    .then(votes => {
      return votes.length;
    })
}

function getVote(issue_id, user_id) {
  return db('votes')
    .where({ issue_id, user_id }) 
    .first()
}


function deleteVote(issue_id, user_id) {
  return db('votes')
    .where({ issue_id, user_id })
    .delete();
}

function addVote(issue_id, user_id) {
  return db('votes')
    .insert({ issue_id, user_id })
    .then(() => {
      return getVote(issue_id, user_id) 
    })
}