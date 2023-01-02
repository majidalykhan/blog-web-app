const express = require("express");
const {
  postCreateController,
  postGetController,
  postsGetController,
  postDeleteController,
  postUpdateController,
} = require("../../controllers/posts/postController");

const postRouter = express.Router();

//POST/api/v1/posts
postRouter.post("/", postCreateController);

//GET/api/v1/posts/:id
postRouter.get("/:id", postGetController);

//GET/api/v1/posts
postRouter.get("/", postsGetController);

postRouter.delete("/:id", postDeleteController);

postRouter.put("/:id", postUpdateController);

module.exports = postRouter;