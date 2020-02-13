const express = require('express');

const Posts = require('../data/db.js');

const router = express.Router();

// handle /api/posts
// router.use('/api', Posts);

// Endpoints

// POST - /api/posts - insert()
router.post('/', (req, res) => {
  const postData = req.body;

  if (!postData.title || !postData.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  } else {
    Posts.insert(postData).then(post => {
      res.status(201).json(post);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error while saving the post to the database" });
    });
  }
})

// POST - /api/posts/:id/comments - insertComment()

// GET - /api/posts - find()
router.get('/', (req, res) => {
  Posts.find().then(posts => {
    res.status(200).json(posts);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  });
})

// GET - /api/posts/:id - findById()
router.get('/:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(404).json({ message: "The post with the specified ID does not exist." })
  } else {
    Posts.findById(id).then(post => {
      res.status(200).json(post);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
  }
})

// GET - /api/posts/:id/comments - findCommentById()

// DELETE - /api/posts/:id - remove()
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(404).json({ message: "The post with the specified ID does not exist." })
  } else {
    Posts.remove(id).then(removed => {
      res.status(200).json(removed);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
  }
})

// PUT - /api/posts/:id - update()

module.exports = router;