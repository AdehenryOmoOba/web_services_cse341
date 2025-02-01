const ObjectId = require("mongodb").ObjectId;
const mongodb = require("../database/db.js");

const getAllUsers = async (req, res) => {
  //#swagger.tags = ['User']
  const result = await mongodb.getDb().db().collection("user").find();

  result
    .toArray()
    .then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200);
      res.json(users);
    })
    .catch((error) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500);
      res.json({ error: error.message });
      console.log(error.message);
    });
};

const getUser = async (req, res) => {
  //#swagger.tags = ['User']
  try {
    // Check if ID exists
    if (!req.params.id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }

    // Validate ID format before creating ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const userId = req.params.id;

    const result = await mongodb
      .getDb()
      .db()
      .collection("user")
      .find({ _id: new ObjectId(userId) });

    const users = await result.toArray();

    // Check if user exists
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  } catch (error) {
    console.error("Error in getSingle:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  //#swagger.tags = ['User']

  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Email and password fields are required" });
    }

    // verify email format with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if length of username is less than 5 or greater than 20
    if (!req.body.username || req.body.username.length < 5) {
      return res.status(400).json({
        message:
          "Username is required and should be at least 5 characters long",
      });
    }

    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
    };

    // Check if user already exists
    const result = await mongodb
      .getDb()
      .db()
      .collection("user")
      .find({ email: user.email });

    const users = await result.toArray();

    if (users.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const insertResult = await mongodb
      .getDb()
      .db()
      .collection("user")
      .insertOne(user);

    res.setHeader("Content-Type", "application/json");
    res
      .status(201)
      .json({ message: "User created", id: insertResult.insertedId });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const editUser = async (req, res) => {
  //#swagger.tags = ['User']

  try {
    const userId = req.params.id;

    // Check if length of username is less than 5 or greater than 20
    if (req.body.username.length < 5 || req.body.username.length > 20) {
      return res.status(400).json({
        message: "Username should be between 5 and 20 characters",
      });
    }

    const user = {
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
    };

    const updatedUser = {};

    if (user.username) updatedUser.username = user.username;
    if (user.password) updatedUser.password = user.password;
    if (user.firstName) updatedUser.firstName = user.firstName;
    if (user.lastName) updatedUser.lastName = user.lastName;
    if (user.bio) updatedUser.bio = user.bio;

    const result = await mongodb
      .getDb()
      .db()
      .collection("user")
      .updateOne({ _id: new ObjectId(userId) }, { $set: updatedUser });

    // Check if the user with provided ID was modified
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags = ['User']
  try {
    const userId = req.params.id;

    const result = await mongodb
      .getDb()
      .db()
      .collection("user")
      .deleteOne({ _id: new ObjectId(userId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  editUser,
  deleteUser,
};
