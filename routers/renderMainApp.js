const express = require("express");
const mainApp = express.Router();
const Todo = require("../models/Todos");
const User = require("../models/User");

const paginationMiddleware = require("./paginationMiddleware");
const tokenChecker = require("./../middleware/tokenChecker.js");

mainApp.get("/", tokenChecker, paginationMiddleware(Todo), async (req, res) => {
  try {
    const dataFromDB = await Todo.find()
      .limit(req.headers.limit)
      .skip(req.headers.startIndex)
      .sort({ date: req.headers.sort });

    // console.log(req.session);

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

mainApp.post("/", async (req, res) => {
  try {
    const sessionCookie = req.cookies["connect.sid"];
    // const userId = cookieParser.signedCookies(
    //   sessionCookie,
    //   process.env.SESSION_SECRET
    // );

    // const loggedInUser = await User.findOne({
    //   email: req.session.user.userId,
    // });
    const newData = await new Todo({
      name: req.body.task,
    }).save();

    res.redirect("/main");
  } catch (err) {
    if (err) {
      //   res.render("index", { error: err });
      res.send(err);
    }
  }
});

module.exports = mainApp;
