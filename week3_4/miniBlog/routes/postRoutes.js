const router = require("express").Router();
const {
  getAllPostsWithComments,
  getPostWithComments,
  createPost,
  editPost,
  deletePost,
} = require("../controllers/postControllers.js");
const { isAuthenticated } = require("../isAuth.js");

// GET all posts
router.get("/posts", getAllPostsWithComments);

// GET a single post
router.get("/post/:id", getPostWithComments);

// Create a post
router.post("/post", isAuthenticated, createPost);

// Edit a post
router.put("/post/:id", isAuthenticated, editPost);

// Delete a post
router.delete("/post/:id", isAuthenticated, deletePost);

module.exports = router;
