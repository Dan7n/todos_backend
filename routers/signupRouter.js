const express = require("express");
const signupRouter = new express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User.js");

signupRouter.get("/", (req, res) => {
  res.render("signup", { err: "", success: "" });
});

signupRouter.post("/", async (req, res) => {
  const userInputedPass = req.body.password;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPass = await bcrypt.hash(userInputedPass, salt);

  try {
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    }).save();
  } catch (err) {
    if (err) {
      if (err.message.includes("E11000")) {
        res.render("signup.ejs", {
          err:
            "Looks like there's already a user registered with that email adress! Please go back to the login page and click the 'Forget your password' button to recover your account",
        });
      }
      res.render("signup.ejs", { err: err });
    }
  }
  res.render("landingPage.ejs", {
    success:
      "Your account has been successfully created! Please log in to start using the app",
    err: "",
  });
});

module.exports = signupRouter;
