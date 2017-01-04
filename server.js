var express = require('express');
var bodyParser = require('body-parser');
var mainCtrl = require('./mainCtrl.js')

var app = express();
app.use(bodyParser.json());

// GET //
//1,2,11//
app.get('/api/users', mainCtrl.getUsers)
//3,4//
app.get('/api/users/:id', mainCtrl.getUserByParams)

// POST //
//5//
app.post('/api/users', mainCtrl.createUser)
//6//
app.post('/api/users/:priv', mainCtrl.createNewAdminUser)
//7//
app.post('/api/users/language/:id', mainCtrl.changeLanguage)
//8//
app.post('/api/users/forums/:id', mainCtrl.addToForum)

// DELETE //
//9//
app.delete('/api/users/forums/:id', mainCtrl.removeFaveForum)
//10//
app.delete('/api/users/:id', mainCtrl.removeUser)

// PUT //
//12//
app.put('/api/users/:id', mainCtrl.updateUser)



var port = 3000;
app.listen(port, function(){
  console.log('listening on ' + port);
})
