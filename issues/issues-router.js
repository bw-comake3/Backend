const router = require('express').Router();

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
router.get('/issues/:id', (req, res) => {
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
router.post('/:id/issues/', (req, res) => {
  
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
router.put("/issues/:id", (req, res) => {
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
router.patch("/issues/:id", (req, res) => {
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

module.exports = router;