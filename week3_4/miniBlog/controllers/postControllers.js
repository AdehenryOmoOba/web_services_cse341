const ObjectId = require("mongodb").ObjectId;
const mongodb = require("../database/db.js");

const getAllPostsWithComments = async (req, res) => {
  //#swagger.tags = ['Blog Post']
  try {
    const posts = await mongodb
      .getDb()
      .db()
      .collection("post")
      .aggregate([
        {
          $lookup: {
            from: "comment",
            localField: "_id",
            foreignField: "parentPostId",
            as: "comments",
          },
        },
      ])
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostWithComments = async (req, res) => {
  //#swagger.tags = ['Blog Post']
  try {
    const postId = req.params.id;

    const post = await mongodb
      .getDb()
      .db()
      .collection("post")
      .aggregate([
        { $match: { _id: new ObjectId(postId) } },
        {
          $lookup: {
            from: "comment",
            localField: "_id",
            foreignField: "parentPostId",
            as: "comments",
          },
        },
      ])
      .toArray();

    if (post.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(post[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  //#swagger.tags = ['Blog Post']
  try {
    const post = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      tags: req.body.tags,
      comments: req.body.comments,
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection("post")
      .insertOne(post);

    res.setHeader("Content-Type", "application/json");
    res
      .status(201)
      .json({ message: "Post created successfully", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editPost = async (req, res) => {
  //#swagger.tags = ['Blog Post']
  try {
    const postId = req.params.id;

    const post = {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection("post")
      .updateOne({ _id: new ObjectId(postId) }, { $set: post });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  //#swagger.tags = ['Blog Post']
  try {
    const postId = req.params.id;

    const result = await mongodb
      .getDb()
      .db()
      .collection("post")
      .deleteOne({ _id: new ObjectId(postId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPostsWithComments,
  getPostWithComments,
  createPost,
  editPost,
  deletePost,
};
