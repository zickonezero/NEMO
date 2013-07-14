#!/bin/env node

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs')

var app = express();

var port = process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || 8080;  
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP;  

http.createServer(app).listen(port, ipaddr, function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// MongoDB
app.use(express.bodyParser());
var MongoClient = require('mongodb').MongoClient;

app.get('/', function(req, res){
  MongoClient.connect("mongodb://localhost:27017/nemo", function(err, db) {
    if(!err) {
      console.log("We are connected");
    }
    db.collection("surfers", function(err, collection) {
      collection.find().toArray(function(err, result) {
        var surfers = [];
        if (err) {
          throw err;
        } else {
          for (i=0; i<result.length; i++) {
            surfers[i] = result[i];
          }
          // surfers.reverse();
          res.render('index.html', {surfers: surfers});
        }
      });
    });
  });
});

app.post('/', function (req, res) {
  MongoClient.connect("mongodb://localhost:27017/nemo", function(err, db) {
    db.collection("surfers", function(err, collection) {
      collection.insert(
            {
              number: parseInt(req.body.custNum),
              firstName: req.body.firstName,
              lastName: req.body.lastName
            }, function (err, results, fields) {
          if (err) throw err;
          else res.send('success');
      });
    });
  });
});
// /MongoDB

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.set('views', __dirname + '/views');

app.get('/', routes.index);
app.get('/users', user.list);
