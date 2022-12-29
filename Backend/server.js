const express = require("express");
require("dotenv").config();

require("./config/dbConnect");

const app = express();

//Middlewares

//Routes

//Error handling middlewares

//Listen to server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is up and running on ${PORT}`));
