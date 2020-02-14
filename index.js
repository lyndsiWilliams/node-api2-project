const express = require('express');

const apiRouter = require('./api/api-router.js');

const server = express();

server.use(express.json());

// For all endpoints beginning with /api
server.use('/api', apiRouter);

server.get("/", (req, res) => {
  res.send(`
    Welcome to Posts and Comments
  `);
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n*** Server running on http://localhost:${port} ***\n`);
});