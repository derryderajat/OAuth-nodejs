const { urlencoded } = require("body-parser");
const express = require("express");
const session = require("express-session");
const env = require("dotenv");
env.config();
const passport = require("./src/libs/passport");
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: false }));
// Initialize Passport before defining routes
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("OAWKOKWOKAW");
});

const route = require("./src/routes/auth.routes");
app.use("/", route);
const PORT = process.env.PORT || 3000;
if (process.env.NODE_MD !== "test") {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`listening, live and well at port ${PORT}`);
  });
}
