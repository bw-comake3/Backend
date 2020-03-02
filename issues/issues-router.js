const router = require('express').Router();

const issuesData = require('./issues-modules');

router.get('/', (req, res) => {
  issuesData
    .getIssues()
    .then(issues => {
      res.status(200).json(issues)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })    
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  const issue = req.body

  issuesData.addIssue(issue)
  .then(issue => {
    res.status(200).json(issue)
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })  
})

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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