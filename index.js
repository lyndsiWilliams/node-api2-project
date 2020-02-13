const express = require('express');

const apiRouter = require('./api/api-router.js');

const server = express();

server.use(express.json());

// For all endpoints beginning with /api
server.use('/api', apiRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Posts and Comments</h>
    <p>Welcome to Posts and Comments</p>
  `);
});

const port = 5000;
server.listen(port, () => {
  console.log(`\n*** Server running on http://localhost:${port} ***\n`);
});