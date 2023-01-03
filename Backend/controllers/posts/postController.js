const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");

//Create
const postCreateController = async (req, res) => {
  const { title, description } = req.body;
  try {
    //FInd the user
    const author = await User.findById(req.userAuth);
    //Create the post
    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
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
    res.json(error.message);
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
    res.json({
      status: "success",
      data: "all posts route",
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
