const express = require("express");

const postRouter = express.Router();

//POST/api/v1/posts
postRouter.post("/", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "post created",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET/api/v1/posts/:id
postRouter.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "single post route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET/api/v1/posts
postRouter.get("/", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "all posts route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

postRouter.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete post route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

postRouter.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update post route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = postRouter;
