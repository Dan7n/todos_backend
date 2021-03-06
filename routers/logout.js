const express = require("express");
const logoutRouter = express.Router();

logoutRouter.get("/", (req, res) => {
  res.clearCookie("validLoginAttempt");
  res.clearCookie("connect.sid");
  req.session = null;

  res.render("landingPage", {
    success:
      "You have successfully been logged out! Hope to see you again soon 👋",
    err: "",
  });
});

module.exports = logoutRouter;
