const express = require("express");
const updateAccountInfo = express.Router();
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

updateAccountInfo.get("/:resetToken", async (req, res) => {
  try {
    const resetToken = req.params.resetToken;
    const tokenVertifier = jwt.verify(resetToken, process.env.PRIVATE_KEY);
    const userId = tokenVertifier.userId;
    const userFinder = await User.findOne({
      _id: userId,
    });

    res.render("newPassword", { userId: userId, resetToken: resetToken });
  } catch (err) {
    if (err) {
      res.render("resetPassword.ejs", {
        err:
          "Opps! Looks like your reset token has expired! Please try to reset your password one more time :)",
      });
    }
  }
});

//------------ POST request, update password in DB

updateAccountInfo.post("/", async (req, res) => {
  const resetToken = req.body.resetToken;
  console.log(resetToken);
  const tokenVertifier = jwt.verify(resetToken, process.env.PRIVATE_KEY);
  const userId = tokenVertifier.userId;
  const newPasswordInPlainText = req.body.password;

  if (!tokenVertifier)
    res.render("resetPassword.ejs", {
      err:
        "Opps! Looks like your reset token has expired! Please try to reset your password one more time :)",
    });

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(newPasswordInPlainText, salt);

  try {
    const user = await User.findOne({ _id: userId });
    user.password = hashedPassword;
    await user.save();

    res.render("landingPage.ejs", {
      success:
        "Your password has sucessfully been changed! You can now go ahead and log into your account with your shiny, brand new password! :)",
      err: "",
    });
  } catch (err) {
    if (err) {
      console.log(err);
      res.render("landingPage.ejs", {
        err:
          "There has been an error, please try to reset your password again!",
        success: "",
      });
    }
  }
});

module.exports = updateAccountInfo;
