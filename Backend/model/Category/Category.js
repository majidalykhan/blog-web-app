const mongoose = require("mongoose");

//Create schema

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

//Compile the category model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
