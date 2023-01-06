const express = require("express");
const storage = require("../../config/cloudinary");
const multer = require("multer");

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

//File upload middleware
const upload = multer({ storage });

//POST/api/v1/posts
postRouter.post("/", isLogin, upload.single("image"), postCreateController);

//GET/api/v1/posts/likes/:id
postRouter.get("/likes/:id", isLogin, toggleLikesPostController);

//GET/api/v1/posts/likes/:id
postRouter.get("/dislikes/:id", isLogin, toggleDislikesPostController);

//GET/api/v1/posts/:id
postRouter.get("/:id", isLogin, postGetController);

//GET/api/v1/posts
postRouter.get("/", isLogin, postsGetController);

//DELETE/api/v1/posts/:id
postRouter.delete("/:id", isLogin, postDeleteController);

//UPDATE/api/v1/posts/:id
postRouter.put("/:id", isLogin, upload.single("image"), postUpdateController);

module.exports = postRouter;
