var express = require('express');
var router = express.Router();

//Atencao esta route esta muito em pseudo codigo

//feel free para mudares a localizacao 
// do connection.js

//probably very useful: https://www.w3schools.com/nodejs/nodejs_mysql.asp

/* GET users listing. */
router.post('/register', function(req,res,next){

  // esta parte provavelmente n devia estar aqui mas tb n sei onde por agora
  var database = require('./db_lib/connection.js');

  var reqbody = req.body;
  //codigo para transformar o body do request em json

  
  var Statement = "INSERT INTO users VALUES (?,?,?,?)";
  database.conn.query(Statement,);
});

router.get('/:uid', function(req, res, next) {
  var userId = req.params.uid;
  var Statement = "SELECT * FROM users WHERE id=?,...=?,...=?";
  database.conn.query(Statement,id,)
  res.send('respond with a resource');
});


//exporta funções/"objetos"
module.exports = router;
