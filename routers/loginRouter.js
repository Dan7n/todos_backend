const express = require("express");
const loginRouter = new express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (req, res) => {
  const loginUser = await User.findOne({
    email: req.body.email,
  });
  if (!loginUser)
    res.render("landingPage.ejs", {
      err:
        "No users with this email adress were found in our database. Are you sure you've used a correct email adress?",
      success: "",
    });
  const isCorrectPassword = await bcrypt.compare(
    req.body.password,
    loginUser.password
  );
  if (!isCorrectPassword)
    res.render("landingPage.ejs", {
      err: "Opps! Looks like the password you've entered is incorrect!",
      success: "",
    });
  const correctUser = { name: loginUser };
  const token = jwt.sign(correctUser, process.env.PRIVATE_KEY);
  if (token) {
    const cookie = res.cookie.token;
    //Make sure the client doesn't alreay have a cookie
    if (!cookie) {
      res.cookie("validLoginAttempt", token);
      const session = (req.session.user = {
        userId: loginUser._id,
      });
      req.session.cookie.expires = false;
      res.redirect("/main");
    }
  }
});

module.exports = loginRouter;
