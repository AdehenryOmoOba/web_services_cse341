const ObjectId = require("mongodb").ObjectId;
const userData = require("../../backend/user.json");
const mongodb = require("./db");

const nathanBirchData = (req, res) => {
  res.json(userData);
};

const getAll = async (req, res) => {
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

const getSingle = async (req, res) => {
  try {
    // Check if ID exists
    if (!req.params.id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }

    // Validate ID format before creating ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("user")
      .find({ _id: userId });

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

module.exports = {
  nathanBirchData,
  getAll,
  getSingle,
};
