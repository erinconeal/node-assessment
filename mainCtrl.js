var users = require('./users.json');

module.exports = {

  getUsers: function(req, res, next) {
    //if there is a query enter this for loop
    if (req.query) {
      for (var prop in req.query) {
        var userProps = users.filter(function(user) {
          //if prop is number
          if (parseInt(req.query[prop])) {
            return user[prop] == req.query[prop];
          }
          // else if prop is string, convert to lowercase and return
          else {
            return user[prop].toLowerCase() === req.query[prop].toLowerCase();
          }
        })
        return res.status(200).send(userProps)
      }
    }
    //if no query, return all users
    return res.status(200).send(users);
  },

  getUserByParams: function(req, res, next) {
    // if param is a number
    if (Number(req.params.id) > 0 && Number(req.params.id) <= users.length) {
      var userById = users.filter(function(user) {
        return user.id == req.params.id
      })
      res.status(200).send(userById)
    }
    // if param is a string
    else if (req.params.id === 'admin' || req.params.id === 'moderator' || req.params.id === 'user') {
      var userByPriv = users.filter(function(user) {
        return user.type === req.params.id
      })
      res.status(200).send(userByPriv);
    }
    else {
      res.sendStatus(404);
    }
  },

  createUser: function(req, res) {
    var user = req.body;
    user.id = users[users.length - 1].id + 1;
    user.favorites = []; //Collections should be initialized with a defualt array.
    users.push(user);
    res.status(200).send(users);
  },

  createNewAdminUser: function(req, res) {
    var admin = req.body;
    admin.id = users[users.length - 1].id + 1;
    admin.type = req.params.priv;
    admin.favorites = [];
    users.push(admin);
    res.status(200).send(users);
  },

  changeLanguage: function(req, res) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == req.params.id) {
        users[i].language = req.body.language;
        res.status(200).send(users[i]);
      }
    }
  },

  addToForum: function(req, res) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == req.params.id) {
        users[i].favorites.push(req.body.add);
        res.status(200).send(users[i]);
      }
    }
  },

  removeFaveForum: function(req, res) {
    for (var i = 0; i < users.length; i++){
      if (users[i].id == req.params.id) {
        users[i].favorites.splice(users[i].favorites.indexOf(req.query.favorite), 1);
        res.status(200).send(users[i]);
      }
    }
  },

  removeUser: function(req, res) {
    for (var i = 0; i < users.length; i++){
      if (users[i].id == req.params.id) {
        users.splice(i, 1);
        res.status(200).send(users);
      }
    }
  },

  updateUser: function(req, res) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == req.params.id) {
        for (var prop in req.body) {
          users[i][prop] = req.body[prop];
        }
        res.status(200).json(users[i]);
      }
    }
  }
}
