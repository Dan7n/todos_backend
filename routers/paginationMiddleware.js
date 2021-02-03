const express = require("express");
const Todo = require("../models/Todos");

/*
will be using this function as a middleware to paginate and sort results in 
multiple routes so I'm seperating it from the rest of my code for readibility's sake
*/

function paginationMiddleware(model) {
  return async (req, res, next) => {
    const sort = req.query.sort || "";
    const limit = 4;
    const page = Number(req.query.page) || 1;
    const dataCount = await model.find().countDocuments().exec();
    const numberOfPagesInDB = Math.ceil(dataCount / 4);

    const startIndex = Number((page - 1) * limit);

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

    req.headers = {
      limit: limit,
      page: page,
      dataCount: dataCount,
      numberOfPagesInDB: numberOfPagesInDB,
      startIndex: startIndex,
      disablePrev: disablePrev,
      disableNext: disableNext,
      sort: sort,
    };

    next();
  };
}

module.exports = paginationMiddleware;
