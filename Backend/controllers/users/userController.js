const bcrypt = require("bcrypt");
const User = require("../../model/User/User");
const appErr = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");

//Register
const userRegisterController = async (req, res, next) => {
  const { firstName, lastName, profilePhoto, email, password } = req.body;
  try {
    //Check if email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("User already exist"));
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create the user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(new Error(error.message));
  }
};

//Login
const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  //Check if email exist
  const userFound = await User.findOne({ email });

  if (!userFound) {
    return res.json({
      msg: "Invalid credentials",
    });
  }

  //Verify password
  const isPasswordMatched = await bcrypt.compare(password, userFound.password);

  if (!isPasswordMatched) {
    return res.json({
      msg: "Invalid credentials",
    });
  }

  try {
    res.json({
      status: "success",
      data: {
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
      },
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Who view my profile
const whoViewedMyProfileController = async (req, res, next) => {
  try {
    //1. Find the original
    const user = await User.findById(req.params.id);

    //2. Find the user who viewed the original user
    const userWhoViewed = await User.findById(req.userAuth);

    //3. Check if original user and who viewed are found
    if (user && userWhoViewed) {
      //4. Check if user who viewed is already in users viewers array
      const isUserALreadyViewed = user.viewers.find(
        (viewer) => viewer.toString() === userWhoViewed._id.toJSON()
      );
      if (isUserALreadyViewed) {
        return next(appErr("You already viewed this profile"));
      } else {
        //5. Push the userWhoViewed to user's viewers array
        user.viewers.push(userWhoViewed._id);
        //6. Save the user
        await user.save();
        res.json({
          status: "success",
          data: "You have successfully viewed this profile",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

//Following
const followingController = async (req, res, next) => {
  try {
    //1. Find the user to follow
    const userToFollow = await User.findById(req.params.id);

    //2. Find the user who is following
    const userWhoFollowed = await User.findById(req.userAuth);

    //3. Check if user and userWhoFollowed are found
    if (userToFollow && userWhoFollowed) {
      //4. Check if userWhoFollowed is already in users followers array
      const isUserAlreadyFollowed = userToFollow.following.find(
        (follower) => follower.toString() === userWhoFollowed._id.toString()
      );
      if (isUserAlreadyFollowed) {
        return next(appErr("You already followed this user"));
      } else {
        //5. Push the userWhoFOlloed to user's followers array
        userToFollow.followers.push(userWhoFollowed._id);
        //6. Push the userToFollow to userWhoFollowed's following array
        userWhoFollowed.following.push(userToFollow._id);
        //6. Save the users
        await userWhoFollowed.save();
        await userToFollow.save();
        res.json({
          status: "success",
          data: "You have successfully followed this user",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

//Get users
const usersController = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "all users route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//User profile
const userProfileController = async (req, res) => {
  try {
    const user = await User.findById(req.userAuth);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Update
const userUpdateController = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update user route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Delete
const userDeleteController = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete user route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Profile photo upload
const profilePhotoUploadController = async (req, res, next) => {
  try {
    //1. Find the user to be updated
    const userToUpdate = await User.findById(req.userAuth);

    //2. check if user is found
    if (!userToUpdate) {
      return next(appErr("User not found", 403));
    }

    //3. check if user is blocked
    if (userToUpdate.isBlocked) {
      return next(appErr("Action not allowed, Your account is blocked", 403));
    }

    //4. check if user is uploading their photo
    if (req.file) {
      //5. update profile photo
      await User.findByIdAndUpdate(
        req.userAuth,
        {
          $set: {
            profilePhoto: req.file.path,
          },
        },
        {
          new: true,
        }
      );
      res.json({
        status: "success",
        data: "Profile photo updated successfully",
      });
    }
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  userRegisterController,
  userLoginController,
  usersController,
  userProfileController,
  userUpdateController,
  userDeleteController,
  profilePhotoUploadController,
  whoViewedMyProfileController,
  followingController,
};
