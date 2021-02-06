const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");
const PORT = process.env.PORT || 5000;
const Todo = require("./models/Todos");
const paginationMiddleware = require("./routers/paginationMiddleware.js");

const mongooseSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//express middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

//express routers to keep things organized
const editRouter = require("./routers/editRouter");
app.use("/edit", editRouter);

const deleteRouter = require("./routers/deleteRouter");
app.use("/delete", deleteRouter);

const markCompletedRouter = require("./routers/markCompletedRouter");
app.use("/check", markCompletedRouter);

//root directory - GET requests with pagination and sorting
app.get("/", paginationMiddleware(Todo), async (req, res) => {
  try {
    const dataFromDB = await Todo.find()
      .limit(req.headers.limit)
      .skip(req.headers.startIndex)
      .sort({ date: req.headers.sort });

    res.render("index", {
      data: dataFromDB,
      error: "",
      sort: req.headers.sort,
      page: req.headers.page,
      dataCount: req.headers.dataCount,
      limit: req.headers.limit,
      disablePrev: req.headers.disablePrev,
      disableNext: req.headers.disableNext,
    });
  } catch (err) {
    if (err) {
      throw new Error("Opps! Looks like you have an error! " + err);
    }
  }
});

app.post("/", async (req, res) => {
  try {
    const newData = await new Todo({
      name: req.body.task,
    }).save();
    res.redirect("/");
  } catch (err) {
    if (err) {
      res.render("index", { error: err });
    }
  }
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
