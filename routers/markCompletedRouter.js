const express = require("express");
const markCompletedRouter = express.Router();
const Todo = require("../models/Todos");

markCompletedRouter.get("/:id", async (req, res) => {
  const checkedElement = await Todo.findOne({ _id: req.params.id });
  if (checkedElement.checked === false) {
    await Todo.updateOne({ _id: req.params.id }, { checked: "true" });
  } else {
    await Todo.updateOne({ _id: req.params.id }, { checked: "false" });
  }
  res.redirect("/");
});

module.exports = markCompletedRouter;
