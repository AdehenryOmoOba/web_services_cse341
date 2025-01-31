const router = require("express").Router();
const {
  getAllPostsWithComments,
  getPostWithComments,
  createPost,
  editPost,
  deletePost,
} = require("../controllers/postControllers.js");

// GET all posts
router.get("/posts", getAllPostsWithComments);

// GET a single post
router.get("/post/:id", getPostWithComments);

// Create a post
router.post("/post", createPost);

// Edit a post
router.put("/post/:id", editPost);

// Delete a post
router.delete("/post/:id", deletePost);

module.exports = router;
