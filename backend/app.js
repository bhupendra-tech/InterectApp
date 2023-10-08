require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
// routes

app.use(cookieParser());
// home page route
const homePage = require("./routes/home");
app.use("/", homePage);
// authentication route : route for sign-in signup
const loginRegisterRoute = require("./routes/auth");
app.use("/api/v1/auth", loginRegisterRoute);

// authenticated route  : rout that only authorized people can use
const authentication = require("./middlewares/authentication");
// dPRoute is dashboard player route
const dPRoute = require("./routes/user");
app.use("/api/v1/user", authentication, dPRoute);
//error handler
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// server and database
let PORT = 5000 || process.env.PORT;
const connectDB = require("./db/connect");
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`server is listening ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
