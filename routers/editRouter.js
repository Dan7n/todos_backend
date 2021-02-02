const express = require("express");
const editRouter = express.Router();
const Todo = require("../models/Todos");

editRouter.get("/:id", async (req, res) => {
  const elementToBeEdited = await Todo.findOne({
    _id: req.params.id,
  });
  const dataFromDB = await Todo.find();
  res.render("edit", {
    data: dataFromDB,
    elementToBeEdited: elementToBeEdited,
  });
  try {
    editRouter.post("/:id", async (req, res) => {
      const updatedElement = await Todo.updateOne(
        { _id: req.params.id },
        {
          name: req.body.name,
        }
      );
      res.redirect("/");
    });
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});

module.exports = editRouter;
