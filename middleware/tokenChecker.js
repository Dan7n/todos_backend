const jwt = require("jsonwebtoken");

function tokenChecker(req, res, next) {
  const isTokenExistent = req.cookies["validLoginAttempt"];
  if (!isTokenExistent) {
    res.render("landingPage.ejs", {
      err:
        "You don't have authorization to view this page! Please log in to continue using the app",
      success: "",
    });

    //vertify that the token the client has is an actual valid token
    try {
      const isValidToken = jwt.verify(process.env.PRIVATE_KEY, isTokenExistent);
    } catch (err) {
      if (err)
        res.render("landingPage.ejs", {
          err:
            "You don't have authorization to view this page! Please log in to continue using the app",
          success: "",
        });
    }
  }
  next();
}

module.exports = tokenChecker;
