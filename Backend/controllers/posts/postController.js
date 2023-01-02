//Create
const postCreateController = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "post created",
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
