const express = require('express');

const middlewareConfig = require('./middleware-config.js');
const authRouter = require('../auth/auth-router.js');
const server = express();
middlewareConfig(server);


server.get('/', (req, res) => {
  res.status(200).json({ test: "LISTENING" })
})

server.use('/api/auth', authRouter)

module.exports = server;