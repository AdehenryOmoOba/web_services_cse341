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

    if (!post.title) {
      return res.status(400).json({ message: "Post title field is required" });
    }

    if (!post.content) {
      return res
        .status(400)
        .json({ message: "Post content field is required" });
    }

    if (!post.author) {
      return res.status(400).json({ message: "Post author field is required" });
    }

    // Validate post author field is a valid ObjectId
    if (!ObjectId.isValid(post.author)) {
      return res.status(400).json({ message: "Invalid post author" });
    }

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

    // Validate post id is valid ObjectId
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const post = {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
    };

    // If post tags field is present, validate it is not empty array
    if ((post.tags && !Array.isArray(post.tags)) || post.tags.length === 0) {
      return res
        .status(400)
        .json({ message: "Post tags must be a non-empty array" });
    }

    const updatedPost = {};

    if (post.title) updatedPost.title = post.title;
    if (post.content) updatedPost.content = post.content;
    if (post.tags) updatedPost.tags = post.tags;

    const result = await mongodb
      .getDb()
      .db()
      .collection("post")
      .updateOne({ _id: new ObjectId(postId) }, { $set: updatedPost });

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
