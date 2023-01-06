const express = require("express");
const {
  commentCreateController,
  commentDeleteController,
  commentUpdateController,
} = require("../../controllers/comments/commentController");
const isLogin = require("../../middlewares/isLogin");

const commentRouter = express.Router();

//POST/api/v1/comments/:id
commentRouter.post("/:id", isLogin, commentCreateController);

//DELETE/api/v1/comments/:id
commentRouter.delete("/:id", isLogin, commentDeleteController);

//PUT/api/v1/comments/:id
commentRouter.put("/:id", isLogin, commentUpdateController);

module.exports = commentRouter;
