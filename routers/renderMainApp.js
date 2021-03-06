const express = require("express");
const mainApp = express.Router();
const Todo = require("../models/Todos");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const paginationMiddleware = require("./paginationMiddleware");
const tokenChecker = require("./../middleware/tokenChecker.js");

mainApp.get("/", tokenChecker, paginationMiddleware(Todo), async (req, res) => {
  try {
    /*
    !  I couldv'e dome something like this instead to get the user object, but I wanted to learn more about the express-session middleware, and that's why I went with the req.session way instead
    
    const userObject = jwt.verify(
      req.cookies.validLoginAttempt,
      process.env.PRIVATE_KEY
    );
    */

    const dataFromUserCollection = await User.findOne({
      _id: req.session.user.userId,
    });

    await dataFromUserCollection
      .populate({
        path: "todos",
        options: {
          limit: req.headers.limit,
          skip: req.headers.startIndex,
          sort: { date: req.headers.sort },
        },
      })
      .execPopulate();
    //   const dataFromDB = await Todo.find()

    // console.log(req.session.user.userId);

    res.render("index", {
      data: dataFromUserCollection.todos,
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
    const loggedInUser = req.session.user.userId;

    //create new todo
    const newData = await new Todo({
      name: req.body.task,
      user: loggedInUser,
    }).save();
    //save it in the session object
    req.session.user.newTodoObject = newData;

    //find the spacific user that's logged in and update thier todos array
    const foundUser = await User.findByIdAndUpdate(req.session.user.userId, {
      $push: {
        todos: req.session.user.newTodoObject,
      },
    });

    res.redirect("/main");
  } catch (err) {
    if (err) {
      res.render("index", { error: err });
    }
  }
});

module.exports = mainApp;
