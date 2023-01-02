const express = require("express");
const {
  userRegisterController,
  userLoginController,
  usersController,
  userProfileController,
  userUpdateController,
  userDeleteController,
} = require("../../controllers/users/userController");
const isLogin = require("../../middlewares/isLogin");

const userRouter = express.Router();

//POST/api/v1/users/register
userRouter.post("/register", userRegisterController);

//POST/api/v1/users/login
userRouter.post("/login", userLoginController);

//GET/api/v1/users
userRouter.get("/", usersController);

//GET/api/v1/users/:id
userRouter.get("/profile/:id", isLogin, userProfileController);

//PUT/api/v1/users/:id
userRouter.put("/:id", userUpdateController);

//DELETE/api/v1/users/:id
userRouter.delete("/:id", userDeleteController);

module.exports = userRouter;
