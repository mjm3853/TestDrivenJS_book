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
var bodyParser = require('body-parser');
var mongodb = require("mongodb");
var session = require('express-session')

// MongoDB
var MongoClient = mongodb.MongoClient;
mongoose.connect('mongodb://localhost:27017/nodedb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("db open");
});

//instantiate express
var app = express();

// Use the static assets from the same directory as this server.js file
app.use(express.static(path.resolve("./app")));
app.use(bodyParser.json()) // parse application/json
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(methodOverride());
app.use(session({
    secret: 'node1234567890NODY',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
process.env.NODE_ENV = "development";

// check if user is trying to access dashboard directly without being authenticated.
function requireLogin(req, res, next) {
  console.log("requireLogin called with", req.user);
  if (!req.user) {
    res.redirect('login');
  } else {
    next();
  }
};

// passport config for login

passport.use(new LocalStrategy(function (username, password, done) {
  console.log("Passport called with", username);
  process.nextTick(function () {
    user.findOne({
      'username': username,
    }, function (err, user) {
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
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
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
  response.render('login', {
    msg: 'Authentication Failed. Please enter valid user credentials',
    show: 'alert alert-danger'
  })
});

// login logic ends

app.post('/addticket', function (req, res) {

  now = new Date();
  dateNow = now;

  var addticket = new TicketDetail({
    user: req.user.name,
    email: req.user.email,
    issuetype: req.body.type,
    department: req.body.department,
    ticketstate: 'open',
    comments: req.body.comments,
    createddate: now
  });

  addticket.save(function (err) {
    if (err) {
      throw err;
			 }
			 else {
      res.render('addticket', {
        msg: 'Your Ticket Submitted Successfully',
        show: 'alert alert-info',
        visibility: 'hidden'
      });
			 }
  });
});

app.get('/addnewticket', function (req, res, next) {
		res.render('addticket', {
    title: 'Add new ticket',
    username: req.user.name,
    email: req.user.email,
    visibility: 'show'
  });
});

app.get('/dashboard', requireLogin, function (req, res) {

  console.log("dashboard view called");

  TicketDetail.find({ email: req.user.email }, function (err, obj) {
    if (err) { throw err; }
    else {
      var tickets = Object.keys(obj).map(function (k) { return obj[k] });
      res.render('dashboard', {
        title: 'HelpDesk Ticket Tracking Tool',
        username: req.user.name,
        email: req.user.email,
        tickets: tickets
      });
      res.status(200);
      console.log(tickets);
    }
  });
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/ping', function (req, res) {
  res.status(200).send("pong!");
});

//server

var port = 8000;

var server = app.listen(port, () => {
  console.log("Server started, listening on port", port);
});