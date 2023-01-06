const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const appErr = require("../../utils/appErr");

//Create
const postCreateController = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    //FInd the user
    const author = await User.findById(req.userAuth);
    //Check if user is blocked
    if (author.isBlocked) {
      return next(appErr("Access denied, Account is blocked", 403));
    }

    //Create the post
    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
      category,
      photo: req?.file?.path,
    });
    //Associate user to a post - Push post into user posts field
    author.posts.push(postCreated);
    //Save
    await author.save();
    res.json({
      status: "success",
      data: postCreated,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//Single
const postGetController = async (req, res, next) => {
  try {
    //Get the post
    const post = await Post.findById(req.params.id);
    //Number of views
    //Check if user already viewed the post
    const isViewed = post.numViews.includes(req.userAuth);
    if (isViewed) {
      res.json({
        status: "success",
        data: post,
      });
    } else {
      //Push the user into numOfViews
      post.numViews.push(req.userAuth);
      //Save
      post.save();
      res.json({
        status: "success",
        data: post,
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

//All posts
const postsGetController = async (req, res, next) => {
  try {
    //Find all posts
    const posts = await Post.find({})
      .populate("user")
      .populate("category", "title");

    //Check if user is blocked by post owner
    const filteredPosts = posts.filter((post) => {
      //get all blocked users
      const blockedUsers = post.user.blocked;
      const isBlocked = blockedUsers.includes(req.userAuth);

      return isBlocked ? null : post;
    });
    res.json({
      status: "success",
      data: filteredPosts,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//Toggle Like
const toggleLikesPostController = async (req, res, next) => {
  try {
    //1. Get the post
    const post = await Post.findById(req.params.id);
    //2. Check if the user has already liked the post
    const isLiked = post.likes.includes(req.userAuth);
    //3. If user has already liked the post, unlike it
    if (isLiked) {
      post.likes = post.likes.filter(
        (like) => like.toString() !== req.userAuth.toString()
      );
      await post.save();
    } else {
      //4. If the user has not liked the post, like it
      post.likes.push(req.userAuth);
      await post.save();
    }
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//Toggle dislike
const toggleDislikesPostController = async (req, res, next) => {
  try {
    //1. Get the post
    const post = await Post.findById(req.params.id);
    //2. Check if the user has already unliked the post
    const isdisliked = post.dislikes.includes(req.userAuth);
    //3. If user has already disliked the post, like it
    if (isdisliked) {
      post.dislikes = post.dislikes.filter(
        (disLike) => disLike.toString() !== req.userAuth.toString()
      );
      await post.save();
    } else {
      //4. If the user has not liked the post, like it
      post.dislikes.push(req.userAuth);
      await post.save();
    }
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//Delete
const postDeleteController = async (req, res, next) => {
  try {
    //Find the post
    const post = await Post.findById(req.params.id);
    //Check if the post belongs to user
    if (post.user.toString() !== req.userAuth.toString()) {
      return next(appErr("You are not allowed to delete the post", 403));
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Post deleted successfully",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//Update
const postUpdateController = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    //Find the post
    const post = await Post.findById(req.params.id);
    //Check if the post belongs to user
    if (post.user.toString() !== req.userAuth.toString()) {
      return next(appErr("You are not allowed to update this post", 403));
    }
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        photo: req?.file?.path,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = {
  postCreateController,
  postGetController,
  postsGetController,
  postDeleteController,
  postUpdateController,
  toggleLikesPostController,
  toggleDislikesPostController,
};
