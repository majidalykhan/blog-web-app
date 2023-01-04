const express = require("express");

const {
  categoryCreateController,
  categoryGetController,
  categoryDeleteController,
  categoryUpdateController,
  categoriesGetController,
} = require("../../controllers/categories/categoryController");
const isLogin = require("../../middlewares/isLogin");
const categoryRouter = express.Router();

//POST/api/v1/categories
categoryRouter.post("/", isLogin, categoryCreateController);

//GET/api/v1/categories/
categoryRouter.get("/", categoriesGetController);

//GET/api/v1/categories/:id
categoryRouter.get("/:id", categoryGetController);

//DELETE/api/v1/categories/:id
categoryRouter.delete("/:id", isLogin, categoryDeleteController);

//PUT/api/v1/categories/:id
categoryRouter.put("/:id", isLogin, categoryUpdateController);

module.exports = categoryRouter;
