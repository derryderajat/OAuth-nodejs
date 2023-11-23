const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const { createFromOauth } = require("../repository/user.repository");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await createFromOauth(
          profile.emails[0].value,
          profile.id,
          profile.displayName
        );
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;
