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

//Get post
const postGetController = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "single post route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//All posts
const postsGetController = async (req, res) => {
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
    res.json(error.message);
  }
};

//Toggle Like
const toggleLikesPostController = async (req, res) => {
  try {
    //1. Get the post
    const post = await Post.findById(req.params.id);
    //2. Check if the user has already liked the post
    const isLiked = post.likes.includes(req.userAuth);
    //3. If user has already liked the post, unlike it
    if (isLiked) {
      post.likes = post.likes.filter((like) => like.toString() !== req.userAuth.toString());
      await post.save();
    } else {
      //4. If the user has not liked the post, like it
      post.likes.push(req.userAuth);
      await post.save();
    }
    res.json({
      status: "success",
      data: "You have successfully liked the post",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Delete
const postDeleteController = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete post route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Update
const postUpdateController = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update post route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  postCreateController,
  postGetController,
  postsGetController,
  postDeleteController,
  postUpdateController,
  toggleLikesPostController,
};
