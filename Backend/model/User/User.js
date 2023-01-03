const mongoose = require("mongoose");
const Post = require("../Post/Post");

//Create schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    profilePhoto: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Editor"],
    },
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // plan: {
    //   type: String,
    //   enum: ["Free", "Premium", "Pro"],
    //   default: "Free",
    // },
    userAward: [
      {
        type: String,
        enum: ["Bronze", "Silver", "Gold"],
        default: "Bronze",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, //to get virtuals in json response from server to client
  }
);

//Hooks
//pre-before record is saved
userSchema.pre("findOne", async function (next) {
  //populate the post
  this.populate({
    path: "posts",
  });
  //Get the user id
  const userId = this._conditions._id;
  //Find the post created by the user
  const posts = await Post.find({ user: userId });
  //Get the last post created by the user
  const lastPost = posts[posts.length - 1];
  //Get the last post date
  const lastPostDate = new Date(lastPost?.createdAt);
  //Get the last post date in string format
  const lastPostDateStr = lastPostDate.toDateString();
  //Add virtuals to the schema
  userSchema.virtual("lastPostDate").get(function () {
    return lastPostDateStr;
  });

  //------------------ Check if a user is inactive for 30 days --------------//

  //Get current date
  const currentDate = new Date();

  //Get the difference between last post and current date
  const diff = currentDate - lastPostDate;

  //Get the difference in days and return less than in days
  const diffInDays = diff / (1000 * 3600 * 24);

  if (diffInDays > 30) {
    //Add virtuals isInActive to schema to check if a user is inactive for 30 days
    userSchema.virtual("isInActive").get(function () {
      return true;
    });
  } else {
    userSchema.virtual("isInActive").get(function () {
      return false;
    });
  }

  next();
});

//Get fullname
userSchema.virtual("fullname").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

//Get initials
userSchema.virtual("initials").get(function () {
  return `${this.firstName[0]}${this.lastName[0]}`;
});

//Get post count
userSchema.virtual("postCounts").get(function () {
  return this.posts.length;
});

//Get followers count
userSchema.virtual("followersCount").get(function () {
  return this.followers.length;
});

//Get following count
userSchema.virtual("followingCount").get(function () {
  return this.following.length;
});

//Get viewers count
userSchema.virtual("viewersCount").get(function () {
  return this.viewers.length;
});

//Get blocked count
userSchema.virtual("blockedCount").get(function () {
  return this.blocked.length;
});

//Compile the user model
const User = mongoose.model("User", userSchema);

module.exports = User;
