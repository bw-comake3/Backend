const express = require('express')

const server = express();

const middleware = require('./middleware');

middleware(server);

server.get('/api', (req, res) => {
  res.status(200).json({ server: "LISTENING" })
})

module.exports = server;