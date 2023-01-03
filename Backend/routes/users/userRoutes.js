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
  followingController,
  unfollowController,
  blockUserController,
  unblockUserController,
  adminBlockUserController,
  adminUnBlockUserController,
  updatePasswordController,
} = require("../../controllers/users/userController");
const isLogin = require("../../middlewares/isLogin");
const multer = require("multer");
const isAdmin = require("../../middlewares/isAdmin");
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
userRouter.put("/", isLogin, userUpdateController);

//DELETE/api/v1/users/:id
userRouter.delete("/:id", userDeleteController);

//GET/api/v1/users/profile-viewers/:id
userRouter.get("/profile-viewers/:id", isLogin, whoViewedMyProfileController);

//GET/api/v1/users/following/:id
userRouter.get("/following/:id", isLogin, followingController);

//GET/api/v1/users/unfollowing/:id
userRouter.get("/unfollowing/:id", isLogin, unfollowController);

//GET/api/v1/users/block/:id
userRouter.get("/block/:id", isLogin, blockUserController);

//GET/api/v1/users/unblock/:id
userRouter.get("/unblock/:id", isLogin, unblockUserController);

//GET/api/v1/users/admin-block/:id
userRouter.put("/admin-block/:id", isLogin, isAdmin, adminBlockUserController);

//GET/api/v1/users/admin-block/:id
userRouter.put(
  "/admin-unblock/:id",
  isLogin,
  isAdmin,
  adminUnBlockUserController
);

//GET/api/v1/users/update-password
userRouter.put("/update-password", isLogin, updatePasswordController);

//POST/api/v1/users/profile-photo-upload
userRouter.post(
  "/profile-photo-upload",
  isLogin,
  upload.single("profile"),
  profilePhotoUploadController
);

module.exports = userRouter;
