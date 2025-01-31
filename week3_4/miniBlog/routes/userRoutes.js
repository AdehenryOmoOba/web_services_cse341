const router = require("express").Router();
const userControllers = require("../controllers/userControllers.js");

// GET all users
router.get("/users", userControllers.getAllUsers);

// GET a single user
router.get("/user/:id", userControllers.getUser);

// Create a new user
router.post("/user", userControllers.createUser);

// Edit a user
router.put("/user/:id", userControllers.editUser);

// Delete a user
router.delete("/user/:id", userControllers.deleteUser);

module.exports = router;
