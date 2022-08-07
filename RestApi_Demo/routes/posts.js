const express = require("express");
const router = express.Router(); 
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find(); 
    res.json(posts);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.id });
    res.json(removedPost);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.id },
      { 
        $set:{ title: req.body.title }
      }
    );
    res.json(updatedPost);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

module.exports = router;
