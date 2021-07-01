const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const user = require("../controllers/users");

router
  .route("/register")
  .get(user.showRegister)
  .post(catchAsync(user.register));

router
  .route("/login")
  .get(user.showLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    user.login
  );

router.get("/logout", user.logout);
module.exports = router;
