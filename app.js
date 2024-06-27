const express = require("express");
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const errorController = require("./controllers/error");

const User = require("./models/user");

const mongoConnect = require("./util/database").mongoConnect;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("667d02e83480557b1263cbbf")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRouter);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  // const user = new User("roger", "roger@test.com", { items: [] });
  // user.save();
  app.listen(3000);
});