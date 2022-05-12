var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
var db = require('./svlib/db/getPool');


/** auth0 */
var auth = require('./svlib/auth0/tokenlib');
/** */

//feel free para mudares a localizacao 
// do connection.js

//probably very useful: https://www.w3schools.com/nodejs/nodejs_mysql.asp

/* GET users listing. */
router.post('/register', (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const nif = req.body.nif;
  const tlm = req.body.tlm;
  // const image = req.body.image;
  const pwd = req.body.pwd;

  const sqlInsert = "INSERT INTO utilizador (nome, email, nif, telemovel, pass_word) VALUES (?,?,?,?,?)";
  db.query(sqlInsert, [nome, email, nif, tlm, pwd], 
       (err, result) => {
           if (!err) {
              console.log(result);
           } else {
               res.send("fail");
           }
  });

  const cons = req.body.cons;
  const morada = req.body.morada;
  const forn = req.body.forn;
  const trans = req.body.trans;

  const sqlSelect = "SELECT id FROM utilizador WHERE email = ?";
  db.query(sqlSelect, [email], 
          (err, rows) => {
          if (!err) {
              const result = Object.values(JSON.parse(JSON.stringify(rows)));
              var id = result[0].id;

              if (trans) { // criar transportador
                  const sqlInsert = "INSERT INTO transportador (utilizador) VALUES (?)";
                  db.query(sqlInsert, [id], 
                      (err, result) => {
                          if (!err) {
                              console.log(result);
                          } else {
                              res.send("fail");
                          }
                  });
              } else {
                  if (cons) { //criar consumidor
                      const sqlInsert = "INSERT INTO consumidor (utilizador, morada) VALUES (?,?)";
                      db.query(sqlInsert, [id, morada], 
                          (err, result) => {
                              if (!err) {
                                  console.log(result);
                              } else {
                                  res.send("fail");
                              }
                      });
                  }

                  if (forn) { //criar fornecedor
                      const sqlInsert = "INSERT INTO fornecedor (utilizador) VALUES (?)";
                      db.query(sqlInsert, [id], 
                          (err, result) => {
                              if (!err) {
                                  console.log(result);
                              } else {
                                  res.send("fail");
                              }
                      });
                  }
              }
              res.send("success");
          } else {
              res.send("fail");
          }
      });
});;

router.get('/login', (req, res) => {
  const email = req.body.email;
  const pwd = req.body.pwd;
  const sqlInsert = "SELECT pass_word FROM utilizador WHERE email = ?";
  db.query(sqlInsert, [email],
          (err, rows) => {
              if (!err) {
                  const result = Object.values(JSON.parse(JSON.stringify(rows)));
                  if (result.length > 0) {
                      var password = result[0].pass_word;
                      if (pwd === password) {
                          res.status(200);
                          res.send("success");
                      } else {
                          res.status(400);
                          res.send("fail");
                      }
                  } else {
                      res.status(404);
                      res.send("no email")
                  }
              } else {
                  res.status(500);
                  res.send("fail");
              }
          })
});

router.get('/:uid', function(req, res, next) {
  var userId = req.params.uid;
  var Statement = "SELECT * FROM utilizador WHERE id = ?";
  db.query(Statement, [userId], (err,rows) => {
    if (!err) {
      const result = Object.values(JSON.parse(JSON.stringify(rows)));
      if (result.length > 0) {
        res.status(200);
        res.send(result);
      } else {
        res.status(404);
        res.send("fail");
      }
    } else {
        res.status(500);
        res.send("fail");
    }
  })
});


//exporta funções/"objetos"
module.exports = router ;
