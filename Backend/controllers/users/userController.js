const User = require("../../model/User/User");

//Register
const userRegisterController = async (req, res) => {
  const { firstName, lastName, profilePhoto, email, password } = req.body;
  try {
    //Check if email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.json({
        msg: "User already exist",
      });
    }

    //Hash password

    //Create the user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Login
const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  //Check if email exist
  const userFound = await User.findOne({ email });
  if (!userFound) {
    return res.json({
      msg: "Wrong login credentials",
    });
  }

  //Password validity
  const isPasswordMatched = await User.findOne({ password });
  if (!isPasswordMatched) {
    return res.json({
      msg: "Wrong login credentials",
    });
  }

  try {
    res.json({
      status: "success",
      data: "user login",
    });
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
    res.json({
      status: "success",
      data: "Profile route",
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

module.exports = {
  userRegisterController,
  userLoginController,
  usersController,
  userProfileController,
  userUpdateController,
  userDeleteController,
};
