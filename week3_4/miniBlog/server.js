const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("./database/db.js");
const userRouter = require("./routes/userRoutes.js");
const postRouter = require("./routes/postRoutes.js");
const homeRouter = require("./routes/homeRoute.js");
const nathanRouter = require("./routes/nathanRoute.js");
const swaggerRouter = require("./routes/swagger.js");
const port = process.env.PORT || 8080;
const { isAuthenticated } = require("./isAuth.js");
// Passport Libraries
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;

app
  .use(bodyParser.json())
  .use(
    session({
      secret: "web_services_cse341",
      resave: false,
      saveUninitialized: true,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE",
      "OPTIONS",
      "PATCH",
      "UPDATE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Accept, Z-Key, Origin, X-Requested-With, Authorization"
    );
    next();
  })
  .use(
    cors({
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "UPDATE"],
    })
  )
  .use(cors({ origin: "*" }))
  .use("/", homeRouter, nathanRouter, userRouter, postRouter, swaggerRouter);

// passport authentication

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/profile", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out"
  );
});

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/profile");
  }
);

app.get("/login", passport.authenticate("github"), (req, res) => {});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});
