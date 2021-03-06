const express = require("express");
const resetPasswordRouter = express.Router();
const User = require("../models/User.js");
const sendMail = require("../middleware/sendMail.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

resetPasswordRouter.get("/", (req, res) => {
  res.render("resetPassword.ejs", { err: "" });
});

resetPasswordRouter.post("/", async (req, res) => {
  const userPasswordReset = await User.findOne({
    email: req.body.email,
  });

  if (!userPasswordReset)
    res.render("resetPassword.ejs", {
      err:
        "We couldn't find any users matching that email adress in our database. Are you sure you've entered the correct email adress?",
    });

  //check if the user already has a token, in which case delete it
  if (userPasswordReset.token.length > 0) {
    userPasswordReset.token = [];
    await userPasswordReset.save();
  }

  // const resetToken = crypto.randomBytes(64).toString("hex");
  const resetToken = jwt.sign(
    { userId: userPasswordReset._id },
    process.env.PRIVATE_KEY,
    { expiresIn: "15m" }
  );
  const salt = await bcrypt.genSalt(saltRounds, async (err, salt) => {
    if (err) console.log(err);
    else {
      await bcrypt.hash(resetToken, salt, async (err, hash) => {
        if (err) console.log(err);
        else {
          //encrypt the token and store it in the DB, then send the unencrypted token to the user's email adress
          await userPasswordReset.storeToken(hash, Date.now() + 900000);
          await sendMail(userPasswordReset.email, resetToken);
          res.render("passwordResetSuccess.ejs");
        }
      });
    }
  });
});

module.exports = resetPasswordRouter;
