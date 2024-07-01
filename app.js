const express = require("express");
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const path = require("path");
const errorController = require("./controllers/error");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const User = require("./models/user");
const MONGODB_URI =
  "mongodb+srv://rain77:pyTau8nOTHya4u2E@cluster0.km8ou3n.mongodb.net/test";

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
// const mongoConnect = require("./util/database").mongoConnect;
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", adminRouter);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// const user = new User("roger", "roger@test.com", { items: [] });
// user.save();
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
