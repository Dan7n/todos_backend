const express = require("express");
const editRouter = express.Router();
const Todo = require("../models/Todos");
const User = require("../models/User");
const paginationMiddleware = require("./paginationMiddleware");

editRouter.get("/:id", paginationMiddleware(Todo), async (req, res) => {
  const elementToBeEdited = await Todo.findOne({
    _id: req.params.id,
  });

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

  // const dataFromDB = await Todo.find()
  //   .limit(req.headers.limit)
  //   .skip(req.headers.startIndex)
  //   .sort({ date: req.headers.sort });
  res.render("edit", {
    data: dataFromUserCollection.todos,
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
        `/main?page=${req.headers.page}&limit=${req.headers.limit}&sort=${req.headers.sort}`
      );
    });
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});

module.exports = editRouter;
