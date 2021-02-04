const express = require("express");
const editRouter = express.Router();
const Todo = require("../models/Todos");
const paginationMiddleware = require("./paginationMiddleware");

editRouter.get("/:id", paginationMiddleware(Todo), async (req, res) => {
  const elementToBeEdited = await Todo.findOne({
    _id: req.params.id,
  });
  const dataFromDB = await Todo.find()
    .limit(req.headers.limit)
    .skip(req.headers.startIndex)
    .sort({ date: req.headers.sort });
  res.render("edit", {
    data: dataFromDB,
    elementToBeEdited: elementToBeEdited,
    sort: req.headers.sort,
    page: req.headers.page,
    limit: req.headers.limit,
  });

  try {
    editRouter.post("/:id", paginationMiddleware(Todo), async (req, res) => {
      const updatedElement = await Todo.updateOne(
        { _id: req.params.id },
        {
          name: req.body.name,
        }
      );
      res.redirect(
        `/?page=${req.headers.page}&limit=${req.headers.limit}&sort=${req.headers.sort}`
      );
    });
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});

module.exports = editRouter;
