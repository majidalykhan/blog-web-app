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
};
