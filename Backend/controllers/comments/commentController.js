const Comment = require("../../model/Comment/Comment");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const appErr = require("../../utils/appErr");

//Create
const commentCreateController = async (req, res, next) => {
  const { description } = req.body;
  try {
    //Find the post
    const post = await Post.findById(req.params.id);
    //Create the comment
    const comment = await Comment.create({
      post: post._id,
      description,
      user: req.userAuth,
    });
    //Push the comment to post
    post.comments.push(comment._id);
    //Find the user
    const user = await User.findById(req.userAuth);
    //Push to user
    user.comments.push(comment._id);
    //Save
    //Disable validation
    post.save({ validateBeforeSave: false });
    user.save({ validateBeforeSave: false });

    res.json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//Comment get
const commentGetController = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Delete
const commentDeleteController = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete comment route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Update
const commentUpdateController = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update comment route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  commentCreateController,
  commentGetController,
  commentDeleteController,
  commentUpdateController,
};
