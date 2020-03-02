const express = require('express');

const middlewareConfig = require('./middleware-config.js');
const authRouter = require('../auth/auth-router.js');
const issuesRouter = require('../issues/issues-router.js');

const restricted = require('../auth/auth-middleware');

const server = express();
middlewareConfig(server);


server.get('/', (req, res) => {
  res.status(200).json({ test: "LISTENING" })
})




server.use('/api/auth', authRouter)
server.use('/api/issues', restricted, issuesRouter)

module.exports = server;