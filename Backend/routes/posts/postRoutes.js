const express = require("express");
const {
  postCreateController,
  postGetController,
  postsGetController,
  postDeleteController,
  postUpdateController,
  toggleLikesPostController,
  toggleDislikesPostController,
} = require("../../controllers/posts/postController");
const isLogin = require("../../middlewares/isLogin");

const postRouter = express.Router();

//POST/api/v1/posts
postRouter.post("/", isLogin, postCreateController);

//GET/api/v1/posts/likes/:id
postRouter.get("/likes/:id", isLogin, toggleLikesPostController);

//GET/api/v1/posts/likes/:id
postRouter.get("/dislikes/:id", isLogin, toggleDislikesPostController);

//GET/api/v1/posts/:id
postRouter.get("/:id", isLogin, postGetController);

//GET/api/v1/posts
postRouter.get("/", isLogin, postsGetController);

postRouter.delete("/:id", postDeleteController);

postRouter.put("/:id", postUpdateController);

module.exports = postRouter;
