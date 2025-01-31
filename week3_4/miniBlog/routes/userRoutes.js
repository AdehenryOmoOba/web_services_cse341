const router = require("express").Router();
const {
  getAllUsers,
  getUser,
  createUser,
  editUser,
  deleteUser,
} = require("../controllers/userControllers.js");

// GET all users
router.get("/users", getAllUsers);

// GET a single user
router.get("/user/:id", getUser);

// Create a new user
router.post("/user", createUser);

// Edit a user
router.put("/user/:id", editUser);

// Delete a user
router.delete("/user/:id", deleteUser);

module.exports = router;
