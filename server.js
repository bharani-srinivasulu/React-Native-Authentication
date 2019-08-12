var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose')
  bodyParser = require('body-parser');

var url =  'mongodb://localhost:27017/UserRecords';
var UserRecords = require('./app/models/userRecords')

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(url, {
  useMongoClient: true
});

mongoose.connection.on('error', function() {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

mongoose.connection.once('open', function() {
  console.log("Successfully connected to the database");
})

mongoose.connection.on('open', function(){
  mongoose.connection.db.listCollections(function(error, names) {
    if (error) {
      throw new Error(error);
    } else {
      names.map(function(cname) {
        console.log(cname.name);
      });
    }
  });
});

// define a simple route
app.get('/', function(req, res){
  // res.send("Welcome to Express. Board it!");
  res.sendFile(__dirname + "/example.html");
});

// listen for requests
app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});

// Require User routes
require('./app/routes/routes.js')(app);
