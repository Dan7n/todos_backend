const express = require("express");
const mainApp = express.Router();
const Todo = require("../models/Todos");
const paginationMiddleware = require("./paginationMiddleware");

mainApp.get("/", paginationMiddleware(Todo), async (req, res) => {
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

mainApp.post("/", async (req, res) => {
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

module.exports = mainApp;
