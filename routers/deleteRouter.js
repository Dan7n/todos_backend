const express = require("express");
const deleteRouter = express.Router();
const Todo = require("../models/Todos");

deleteRouter.get("/:id", async (req, res) => {
  const elementToBeDeleted = await Todo.deleteOne({ _id: req.params.id });
  res.redirect("/main");
});

module.exports = deleteRouter;
