const User = require("../model/User/User");
const appErr = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isAdmin = async (req, res, next) => {
  //Get token from header
  const token = getTokenFromHeader(req);

  //Verify token
  const decodedUser = verifyToken(token);

  //Save the user into req obj
  req.userAuth = decodedUser.id;

  //Find the user in db
  const user = await User.findById(decodedUser.id);

  //Check if admin
  if (user.isAdmin) {
    return next();
  } else {
    return next(appErr("Access denied, Admin Only", 403));
  }
};

module.exports = isAdmin;
