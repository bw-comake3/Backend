const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const router = require('express').Router();
const usersData = require('./auth-modules.js')
;
const jsSecret = require('../config/secrets.js')

router.get('/users', (req, res) => {
  usersData
    .getUsers()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(404).json({message: "users not found"})
    })
})


router.post('/register', (req, res) => {
  const newUser = req.body
  const hash = bcrypt.hashSync(newUser.password, 12)
  
  newUser.password = hash

  usersData
    .registerUser(newUser)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })    
})

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  console.log(`THIS IS REQ.BODY 1`, req.body)

  usersData
    .userLogin({ username })
    .first()
    .then(user => {
      console.log(`THIS IS USER 2`, user)
        if (user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user)
            res.status(200).json({ message: `Welcome ${user.username}`, token})
        } else {
            res.status(401).json({ message: "Invalid Credentials"})
        }
    })
    .catch(({ name, message, code, stack }) => {
          res.status(500).json({ name, message, code, stack })
        })  
})

function generateToken(user){
    const payload={
        subject: user.id, 
        username: user.username
    }
    const secret = jsSecret.jwtSecret
    const options = { 
        expiresIn: '1h'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router