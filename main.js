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
    }

    if (page === numberOfPagesInDB) {
      disableNext = true;
    }
    if (page == 0 || page > numberOfPagesInDB) {
      console.log(page == 0, page > numberOfPagesInDB);
      // !Render something here, like an error.ejs or something
      res.status(404).send("Page does not exist");
    }
    const dataFromDB = await Todo.find()
      .limit(limit)
      .skip(startIndex)
      .sort({ date: sort });

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
