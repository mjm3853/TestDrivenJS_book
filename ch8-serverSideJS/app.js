var express = require("express");

var user = require("./custom_modules/user");
var TicketDetail = require("./custom_modules/ticket");

var http = require("http");
var cons = require("consolidate"), name = 'swig';
var path = require("path");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose/");
var methodOverride = require("method-override");
var mongodb = require("mongodb");


var port = 8000;

var server = app.listen(port, () => {
    console.log("Server started, listening on port", port);
});

var MongoClient = mongodb.MongoClient;
mongoose.connect('mongodb://localhost:27017/nodedb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error while connecting to the db'));
db.once('open', function (callback) {});