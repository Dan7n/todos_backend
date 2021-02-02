const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");
const PORT = process.env.PORT || 5000;
const Todo = require("./models/Todos");

const mongooseSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

//express routers
const editRouter = require("./routers/editRouter");
app.use("/edit", editRouter);

const deleteRouter = require("./routers/deleteRouter");
app.use("/delete", deleteRouter);

const markCompletedRouter = require("./routers/markCompletedRouter");
app.use("/check", markCompletedRouter);

app.get("/", async (req, res) => {
  try {
    //result sorting
    const sort = req.query.sort || "";

    //result pagination ---
    const limit = 4;
    const page = Number(req.query.page) || 1;
    const dataCount = await Todo.find().countDocuments().exec();
    const numberOfPagesInDB = Math.ceil(dataCount / 4);

    const startIndex = (page - 1) * limit;

    //will be used to disable prev/next buttons in EJS file
    let disablePrev;
    let disableNext;

    if (page === 1) {
      disablePrev = true;
      // !Renver something here, like an error.ejs or something
    }

    if (page === numberOfPagesInDB) {
      disableNext = true;
    }

    const dataFromDB = await Todo.find()
      .limit(limit)
      .skip(startIndex)
      .sort(sort);

    res.render("index", {
      data: dataFromDB,
      error: "",
      sort: sort,
      page: page,
      dataCount: dataCount,
      limit: limit,
      disablePrev: disablePrev,
      disableNext: disableNext,
    });
  } catch (err) {
    if (err) {
      throw new Error("Opps! Something went wrong!");
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
    return;
  } else {
    app.listen(PORT, () => {
      console.log(`App is now live on port http://localhost:${PORT}/`);
    });
  }
});
