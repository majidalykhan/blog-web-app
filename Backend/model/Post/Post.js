const mongoose = require("mongoose");

//Create schema

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Post Description is required"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Post Category is required"],
    },
    numViews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please Author is required"],
    },
    photo: {
      type: String,
      // required: [true, "Post Image is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//Hook
postSchema.pre(/^find/, function (next) {
  //Add views count as virtual field
  postSchema.virtual("viewsCount").get(function () {
    const post = this;
    return post.numViews.length;
  });
  //Add likes count as virtual field
  postSchema.virtual("likesCount").get(function () {
    const post = this;
    return post.likes.length;
  });
  //Add dislikes count as virtual field
  postSchema.virtual("dislikesCount").get(function () {
    const post = this;
    return post.dislikes.length;
  });
  //Check the most liked post in percentage
  postSchema.virtual("likesPercentage").get(function () {
    const post = this;
    const total = +post.likes.length + +post.dislikes.length;
    const percentage = (post.likes.length / total) * 100;
    return `${percentage}%`;
  });
  //Check the most disliked post in percentage
  postSchema.virtual("dislikesPercentage").get(function () {
    const post = this;
    const total = +post.dislikes.length + +post.dislikes.length;
    const percentage = (post.dislikes.length / total) * 100;
    return `${percentage}%`;
  });

  next();
});

//Compile the post model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
