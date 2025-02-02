const express = require("express");
const dotenv = require("dotenv");
// const morgan = require("morgan");
const bodyParser = require("body-parser");
// const { urlencoded } = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");
const app = express();

const connectDB = require("./server/database/connection");
const errorController = require("./server/controllers/error");

const User = require("./server/models/user");

const authRoutes = require("./server/routers/auth");
const shopRoutes = require("./server/routers/shop");
const adminRoutes = require("./server/routers/admin");

dotenv.config({ path: "config.env" });
const Port = process.env.PORT || 8080;

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

// log request
// app.use(morgan('tiny'));

const super_secret = process.env.SUPER_SECRET || "my super secret";

// MongoDB Connection
connectDB();

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// view engine
app.set("view engine", "ejs");
// app.set("views" , path.resolve(__dirname,"views/ejs"))

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

app.use(
  session({
    secret: super_secret,
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

app.use(adminRoutes);
app.use(authRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(Port, () => {
  console.log(`Server is live at http://localhost:${Port}`);
});
