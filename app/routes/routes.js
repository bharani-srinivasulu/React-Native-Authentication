module.exports = function(app) {

  var User = require('../controllers/user.controller.js');

  // Create a new User
  app.post('/addname', User.create);

  // Retrieve all User
  app.get('/users', User.findAll);

  // Retrieve a single User with userId
  app.get('/users/:userId', User.findOne);

  // Update a User with userId
  app.put('/users/:userId', User.update);

  // Delete a User with userId
  app.delete('/users/:userId', User.delete);
}
