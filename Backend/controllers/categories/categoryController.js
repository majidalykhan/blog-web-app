const Category = require("../../model/Category/Category");
const appErr = require("../../utils/appErr");

//Create
const categoryCreateController = async (req, res, next) => {
  const { title } = req.body;
  try {
    const category = await Category.create({ title, user: req.userAuth });
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//All category get
const categoriesGetController = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Category get
const categoryGetController = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Delete
const categoryDeleteController = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete category route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Update
const categoryUpdateController = async (req, res) => {
  const { title } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true, runValidators: true }
    );
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  categoryCreateController,
  categoryGetController,
  categoryDeleteController,
  categoryUpdateController,
  categoriesGetController,
};
