const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const nodemailer = require('nodemailer');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/static', express.static('static'));

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(flash());

app.use(function(req, res, next){
  console.log('Requested path: %s', req.path);
  next();
})

// Load routing
require('./route/routing')(app);

app.use((err, req, res, next) => {
    res.end('Problem...');
    console.log(err);
});

app.listen(3000, function() {
    console.log('Hello :3000');
});

