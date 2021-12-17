//  imports
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const path = require('path');
const app = express();

dotenv.config({path:'config.env'}) 
const Port = process.env.PORT || 8080


// log request
app.use(morgan('tiny'));

// bodyParser
app.use(bodyParser.urlencoded({extended:true}));

// view engine
app.set("view engine", "ejs");
// app.set("views" , path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))


app.get('/', (req, res) =>{
    res.render('index',{pageTitle:'HOME'});
})

app.get('/login', (req, res)=>{
    res.render('login',{pageTitle:'Login'});
})

app.get('/signup', (req, res)=>{
    res.render('signup',{pageTitle:'signup'});
})





app.listen(Port,()=>{
    console.log(`Server is live at http://localhost:${Port}`);
})