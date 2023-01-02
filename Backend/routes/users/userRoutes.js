const express = require("express");
const storage = require("../../config/cloudinary");
const {
  userRegisterController,
  userLoginController,
  usersController,
  userProfileController,
  userUpdateController,
  userDeleteController,
  profilePhotoUploadController,
  whoViewedMyProfileController,
} = require("../../controllers/users/userController");
const isLogin = require("../../middlewares/isLogin");
const multer = require("multer");

//Instance of multer
const upload = multer({ storage });

const userRouter = express.Router();

//POST/api/v1/users/register
userRouter.post("/register", userRegisterController);

//POST/api/v1/users/login
userRouter.post("/login", userLoginController);

//GET/api/v1/users
userRouter.get("/", usersController);

//GET/api/v1/users/:id
userRouter.get("/profile/", isLogin, userProfileController);

//PUT/api/v1/users/:id
userRouter.put("/:id", userUpdateController);

//GET/api/v1/users/profile-viewers/:id
userRouter.get("/profile-viewers/:id", isLogin, whoViewedMyProfileController);

//DELETE/api/v1/users/:id
userRouter.delete("/:id", userDeleteController);

//POST/api/v1/users/profile-photo-upload
userRouter.post(
  "/profile-photo-upload",
  isLogin,
  upload.single("profile"),
  profilePhotoUploadController
);

module.exports = userRouter;
