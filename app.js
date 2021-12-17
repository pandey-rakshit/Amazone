const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');
const app = express();

const connectDB = require('./server/database/connection');
const authRoutes = require('./server/routers/auth');
const User = require('./server/models/user');

dotenv.config({path:'config.env'}) 
const Port = process.env.PORT || 8080

const store = new MongoDBStore({
  uri: process.env.Mongo_URI,
  collection: 'sessions'
});

// log request
app.use(morgan('tiny'));

// MongoDB Connection
connectDB();

// bodyParser
app.use(bodyParser.urlencoded({extended:true}));

// view engine
app.set("view engine", "ejs");
// app.set("views" , path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );


  app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });


app.use(authRoutes);
// app.use(errorController.get404);

app.get('/', (req,res)=>{
    res.render('index', {pageTitle:'HOME'});
})


app.listen(Port,()=>{
    console.log(`Server is live at http://localhost:${Port}`);
})