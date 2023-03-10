const express = require("express");
const globalErrHandler = require("./middlewares/globalErrHandler");
const categoryRouter = require("./routes/categories/categoryRoutes");
const commentRouter = require("./routes/comments/commentRoutes");
const postRouter = require("./routes/posts/postRoutes");
const userRouter = require("./routes/users/userRoutes");
require("dotenv").config();

require("./config/dbConnect");

const app = express();

//---------------------------------------------------

//Middlewares
app.use(express.json()); //Pass incoming payload

//---------------------------------------------------

//Routes

//users route
app.use("/api/v1/users/", userRouter);
//posts route
app.use("/api/v1/posts/", postRouter);
//comments route
app.use("/api/v1/comments/", commentRouter);
//categories route
app.use("/api/v1/categories/", categoryRouter);

//--------------------------------------------------

//Error handling middlewares
app.use(globalErrHandler);

//404 error
app.use("*", (req, res) => {
  res.status(404).json({
    message: `${req.originalUrl} - Not found`,
  });
});

//---------------------------------------------------

//Listen to server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is up and running on ${PORT}`));
