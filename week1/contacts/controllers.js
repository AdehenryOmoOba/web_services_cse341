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
      console.log(error.message);
    });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("user")
    .find({ _id: userId });

  result
    .toArray()
    .then((user) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200);
      res.json(user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = {
  nathanBirchData,
  getAll,
  getSingle,
};
