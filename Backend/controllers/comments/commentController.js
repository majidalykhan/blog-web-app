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

//Delete
const commentDeleteController = async (req, res, next) => {
  try {
    //Find the comment
    const comment = await Comment.findById(req.params.id);
    //Check if the comment belongs to user
    if (comment.user.toString() !== req.userAuth.toString()) {
      return next(appErr("You are not allowed to delete this comment", 403));
    }

    //In mongodb, the element is deleted from document but not from reference array
    //Remove comments from array
    await User.findOneAndUpdate(
      { comments: comment._id },
      { $pull: { comments: comment._id } },
      { new: true }
    );

    await Post.findOneAndUpdate(
      { comments: comment._id },
      { $pull: { comments: comment._id } },
      { new: true }
    );

    //Remove the comment
    await Comment.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Comment has been deleted successfully",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//Update
const commentUpdateController = async (req, res, next) => {
  const { description } = req.body;
  try {
    //Find the comment
    const comment = await Comment.findById(req.params.id);
    //Check if the comment belongs to user
    if (comment.user.toString() !== req.userAuth.toString()) {
      return next(appErr("You are not allowed to update this comment", 403));
    }
    await Comment.findByIdAndUpdate(
      req.params.id,
      { description },
      { new: true, runValidators: true }
    );
    res.json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = {
  commentCreateController,
  commentDeleteController,
  commentUpdateController,
};
