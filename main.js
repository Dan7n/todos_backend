const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");
const PORT = process.env.PORT || 5000;
const Todo = require("./models/Todos");
const paginationMiddleware = require("./routers/paginationMiddleware.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const crypto = require("crypto");
const MongoStore = require("connect-mongo").default;

const mongooseSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

//express session middleware to store a unique session ID for each logged in user
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    resave: true,
    maxAge: 36000000,
    store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION }),
    cookie: { secure: false, maxAge: 36000000 }, //secure: true means the cookie will only be set on https requests
  })
);

//express middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); //used to read and handle cookies

app.set("view engine", "ejs");

//express routers to keep things organized
const editRouter = require("./routers/editRouter");
app.use("/edit", editRouter);

const deleteRouter = require("./routers/deleteRouter");
app.use("/delete", deleteRouter);

const markCompletedRouter = require("./routers/markCompletedRouter");
app.use("/check", markCompletedRouter);

const mainApp = require("./routers/renderMainApp.js");
app.use("/main", mainApp);

const loginRouter = require("./routers/loginRouter.js");
app.use("/login", loginRouter);

const signupRouter = require("./routers/signupRouter.js");
app.use("/signup", signupRouter);

const resetPasswordRouter = require("./routers/resetPasswordRouter");
app.use("/reset-password", resetPasswordRouter);

const updateAccountInfo = require("./routers/updateAccountInfo");
app.use("/update-account-info", updateAccountInfo);
//root directory - GET requests with pagination and sorting
app.get("/", (req, res) => {
  res.render("landingPage.ejs", { success: "", err: "" });
});

mongoose.connect(process.env.DB_CONNECTION, mongooseSettings, (err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    app.listen(PORT, () => {
      console.log(`App is now live on port http://localhost:${PORT}/`);
    });
  }
});
