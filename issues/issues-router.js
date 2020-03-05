const router = require('express').Router();
const dbUsers = require('../auth/auth-modules');
const dbIssues = require('./issues-modules');
const issuesData = require('./issues-modules');

// gets all issues for all users
router.get('/issues', (req, res) => {
  issuesData
    .getIssues()
    .then(issues => {
      res.status(200).json(issues)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(404).json({ name, message, code, stack })
    })    
});

// gets all issues for single user
router.get('/:id/issues', (req, res) => {

  const { id } = req.params;

  issuesData
    .getIssuesFilter(id)
    .then(issues => {
      res.status(200).json(issues)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })    
});


// gets single issue
router.get('/issues/:id', validateIssue, (req, res) => {
  const { id } = req.params;
  
  issuesData
    .getIssuesById(id)
    .then(issue => {
      res.status(200).json(issue)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })  

})

// adds issue to database with user id
router.post('/:id/issues/', validateUser, (req, res) => {
  
  const { id } = req.params;
  const issue = { ...req.body, user_id: id }

  issuesData
    .addIssue(issue)
    .then(issue => {
      res.status(200).json(issue)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })  
})

// edits single issue
router.put("/issues/:id", validateIssue, (req, res) => {
  const { id } = req.params
  const changes = req.body
  issuesData.updateIssue(id, changes)
  .then(issue => {
    res.status(200).json(issue)
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  }) 
})

// edits votes of isue
router.patch("/issues/:id", validateIssue, (req, res) => {
  
  const { id } = req.params
  const vote = req.body
  issuesData
    .updateVote(id, vote)
  .then(issue => {
    res.status(200).json({ message: `Vote for Issue# ${id} Updated Successfully`, issue})
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  }) 
})

// deletes an issue 
router.delete("/issues/:id", (req, res) => {
  const { id } = req.params
  issuesData.deleteIssue(id)
  .then(issue => {
    res.status(200).json(issue)
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })
})



// Validation MiddleWare

async function validateUser(req, res, next) {
  // validates all POST requests for new ISSUE (not new user)
  const { id } = req.params;
  const issue = { ...req.body, user_id: id} ;  
  console.log(`validate issue:`, issue)

  const userCheck = await dbUsers.getUserById(id)

    !userCheck
    ? res.status(404).json({ message: "User does not exist!" }) 
    : !issue ? 
    res.status(404).json({ message: "Issue does not exist!" }) 
    : !issue.issue || !issue.description
    ? res.status(406).json({ message: "Please make sure the required fields are completed. " })
    : next();
}

async function validateIssue(req, res, next) {
  // validates all POST requests for new ISSUE (not new user)
  const { id } = req.params;
  const issue = req.body;  
  console.log(`validate issue:`, issue)

  const issueCheck = await dbIssues.getIssuesById(id)

    !issueCheck
    ? res.status(404).json({ message: "Issue does not exist!" }) 
    : next();
}



module.exports = router;