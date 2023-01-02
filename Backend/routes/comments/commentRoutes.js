const express = require("express");
const {
  commentCreateController,
  commentGetController,
  commentDeleteController,
  commentUpdateController,
} = require("../../controllers/comments/commentController");

const commentRouter = express.Router();

//POST/api/v1/comments
commentRouter.post("/", commentCreateController);

//GET/api/v1/comments/:id
commentRouter.get("/:id", commentGetController);

commentRouter.delete("/:id", commentDeleteController);

//PUT/api/v1/comments/:id
commentRouter.put("/:id", commentUpdateController);

module.exports = commentRouter;
