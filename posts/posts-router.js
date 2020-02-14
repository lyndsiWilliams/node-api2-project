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
router.post('/:id/comments', (req, res) => {
  const {text} = req.body;
  const {post_id} = req.params;
  // const commentData = { ...req.body, post_id: id };
  // console.log(postData);

  Posts.insertComment({text, post_id})
    .then(( {id:comment_id} ) => {
      Posts.findCommentById(comment_id)
        .then(comment => {
          console.log(comment);
          if (!comment) {
            res.status(404).json({ message: "error" })
          } else {
            res.status(201).json(comment)
          }
        }).catch(err => console.log(err));
    })
    .catch(err => console.log(err));

  // if (!id) {
  //   res.status(404).json({ message: "The post with the specified ID does not exist." })
  // } else if (!postData.text) {
  //   res.status(400).json({ message: "The post with the specified ID does not exist." });
  // } else {
  //   Posts.insertComment(commentData).then(comment => {
  //     res.status(201).json(comment);
  //   }).catch();
  // }
})

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
router.get('/:id/comments', (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(404).json({ message: "The post with the specified ID does not exist." })
  } else {
    Posts.findCommentById(id).then(comment => {
      res.status(200).json(comment)
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: "The comments information could not be retrieved." });
    });
  }
})

// router.get('/:id/comments', (req, res) => {
//   Posts.findCommentById(req.params.id).then(post => {
//     console.log(post);
//     if (post.length===0) {
//       res.status(404).json({ message: "Post not found" })
//     } else {
//       res.status(200).json(post)
//     }
//   }).catch(err => {
//     console.log(err);
//     res.status(500).json({ error: "The comments information could not be retrieved." })
//   });
// })

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
router.put('/:id', (req, res) => {
  const postData = req.body;
  const id = req.params.id;

  if (!id) {
    res.status(404).json({ message: "The post with the specified ID does not exist." })
  } else if (!postData.title || !postData.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  } else {
    Posts.update(id, postData).then(post => {
      res.status(200).json(post);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
  }
})

module.exports = router;