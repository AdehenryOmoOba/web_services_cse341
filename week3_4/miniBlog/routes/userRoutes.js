const router = require("express").Router();
const userControllers = require("../controllers/userControllers.js");

// GET all users
router.get("/users", userControllers.getAllUsers);

// GET a single user
router.get("/user/:id", userControllers.getUser);

module.exports = router;
