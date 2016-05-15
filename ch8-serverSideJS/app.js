var express = require("express");

var user = require("./custom_modules/user.js");
var TicketDetail = require("./custom_modules/ticket.js");

var http = require("http");
var cons = require("consolidate"), name = 'swig';
var path = require("path");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose/");
var methodOverride = require("method-override");
var mongodb = require("mongodb");

var app = express();

var port = 8000;

// Use the static assets from the same directory as this server.js file
app.use(express.static(path.resolve("./app")));
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session()); 
app.use(express.static(__dirname + '/public'));
process.env.NODE_ENV = "development";

// check if user is trying to access dashboard directly without being authenticated.
function requireLogin (req, res, next) {
  if (!req.user) {
    res.redirect('login');
  } else {
    next();
  }
};

// MongoDB

//We need to use "MongoClient" interface in order to get connected to a mongodb server.
var MongoClient = mongodb.MongoClient;
mongoose.connect('mongodb://localhost:27017/nodedb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log("db open");
});

// passport config for login

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    user.findOne({
      'username': username, 
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (user.password != password) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
}));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// assign the swig engine to .html files
app.engine('html', cons.swig);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/app');

//express routes

app.get('/', (request, response, next) => {
    response.render('login');
});

app.get('/login', (request, response, next) => {
    response.render('login');
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/loginFailure'
  })
);

app.get('/loginFailure', (request, response, next) => {
   response.render('login', {msg: 'Authentication Failed. Please enter valid user credentials', show: 'alert alert-danger'}) 
});

//server

var server = app.listen(port, () => {
    console.log("Server started, listening on port", port);
});