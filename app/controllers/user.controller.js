var User = require('../models/user.model.js');
var mongoose = require('mongoose');

exports.create = function(req, res) {
  // Create and Save a new user
  if(!req.body.title) {
    res.status(400).send({message: "user can not be empty"+ req.body.content});
  }
  var user = new User(req.body  );

  user.save(function(err, data) {
    if(err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred while creating the user."});
    } else {
      res.send(data);
    }
  });
};

exports.findAll = function(req, res) {
  // Retrieve and return all users from the database.
  User.find(function(err, users){
    if(err) {
      res.status(500).send({message: "Some error occurred while retrieving users."});
    } else {
      res.send(users);
      
      // Go through each user
      users.map(data => {
        // Initialize a model with user data
        const user = new User(data);
        // and save it into the database
        user.save();
      });
    }
  });
};

exports.findOne = function(req, res) {
  // Find a single user with a userId
  User.findById(req.params.userId, function(err, data) {
    if(err) {
      res.status(500).send({message: "Could not retrieve user with id " + req.params.userId});
    } else {
      res.send(data);
    }
  });
};

exports.update = function(req, res) {
  // Update a user identified by the userId in the request
  User.findById(req.params.userId, function(err, user) {
    if(err) {
      res.status(500).send({message: "Could not find a user with id " + req.params.userId});
    }

    user.title = req.body.title;
    user.content = req.body.content;

    user.save(function(err, data){
      if(err) {
        res.status(500).send({message: "Could not update user with id " + req.params.userId});
      } else {
        res.send(data);
      }
    });
  });
};

exports.delete = function(req, res) {
  // Delete a user with the specified userId in the request
  User.remove({_id: req.params.userId}, function(err, data) {
    if(err) {
      res.status(500).send({message: "Could not delete user with id " + req.params.id});
    } else {
      res.send({message: "user deleted successfully!"})
    }
  });
};
