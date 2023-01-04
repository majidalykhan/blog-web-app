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
const categoriesGetController = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//Category get
const categoryGetController = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//Delete
const categoryDeleteController = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Category deleted successfully",
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//Update
const categoryUpdateController = async (req, res, next) => {
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
    return next(appErr(error.message));
  }
};

module.exports = {
  categoryCreateController,
  categoryGetController,
  categoryDeleteController,
  categoryUpdateController,
  categoriesGetController,
};
