const passport = require("../libs/passport");
const router = require("express").Router();
const { oauth2 } = require("../controllers/auth.controllers");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  oauth2
);
module.exports = router;
