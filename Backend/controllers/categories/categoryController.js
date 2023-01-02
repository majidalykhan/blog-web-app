//Create
const categoryCreateController = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "category created",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Category get
const categoryGetController = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "category route",
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
  try {
    res.json({
      status: "success",
      data: "update category route",
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
};
