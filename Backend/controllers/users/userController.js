const bcrypt = require("bcrypt");
const User = require("../../model/User/User");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");

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
  const token = getTokenFromHeader(req);
  console.log(token);
  const { id } = req.params;
  try {
    const user = await User.findById(id);
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

module.exports = {
  userRegisterController,
  userLoginController,
  usersController,
  userProfileController,
  userUpdateController,
  userDeleteController,
};
