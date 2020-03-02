const server = require('./api/server.js');

// const express = require('express');

// const server = express()

// server.get('/', (req, res) => {
//     res.status(200).json({ test: "LISTENING" })
//   })
  

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`\n**Server Running on ${PORT}**\n`)
})