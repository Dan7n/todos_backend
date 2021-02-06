const express = require("express");
const markCompletedRouter = express.Router();
const Todo = require("../models/Todos");
const paginationMiddleware = require("./paginationMiddleware");

markCompletedRouter.get(
  "/:id",
  paginationMiddleware(Todo),
  async (req, res) => {
    const checkedElement = await Todo.findOne({ _id: req.params.id });
    if (checkedElement.checked === false) {
      await Todo.updateOne({ _id: req.params.id }, { checked: "true" });
    } else {
      await Todo.updateOne({ _id: req.params.id }, { checked: "false" });
    }
    res.redirect(
      `/?page=${req.headers.page}&limit=${req.headers.limit}&sort=${req.headers.sort}`
    );
  }
);

module.exports = markCompletedRouter;
