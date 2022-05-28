var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
var pool = require('../svlib/db/getPool');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
const { query } = require('../svlib/db/getPool');
/** */

//probably very useful: https://www.w3schools.com/nodejs/nodejs_mysql.asp

/* GET users listing. */
router.post('/register', (req, res) => {
console.error(req.body);
  const nome = req.body.nome;
  const email = req.body.email;
  const nif = req.body.nif;
  const tlm = req.body.tlm;
  // const image = req.body.image;
  const pwd = req.body.pwd;
  const cons = req.body.cons;
  const morada = req.body.morada;
  const forn = req.body.forn;
  const trans = req.body.trans;

  pool.getConnection((err, connection) => {

    if(err){
        res.status(500);
        res.type('json');
        res.json({"message":"Couldn't register you right now try again later"});
    }
  
    var queryString = "INSERT INTO utilizador (nome, email, nif, telemovel, pass_word) VALUES (?,?,?,?,?)";

    connection.execute(
        queryString,
        [nome, email, nif, tlm, pwd],
        (err, result) => {
            if (err) {
                res.status(500);
                res.type('json');
                res.send({"message":"Couldn't register you right now try again later"});
                connection.release();
                return;
            }
        });

    queryString = "SELECT id FROM utilizador WHERE email = ?";
    var id;
    connection.execute(
        queryString,
        [email],
        (err,results) => {
            if(!err){
                id = results.id;
                console.error(results);
                console.error(id);
            } else {
                res.status(500);
                res.type('json');
                res.send({"message":"Couldn't register you right now try again later"});
                connection.release();
                return;
            }
        }   
    )
    console.error(id);
    if(cons){
        queryString = "INSERT INTO consumidor (utilizador, morada) VALUES (?,?)";
        connection.execute(
            queryString,
            [id,morada],
            (err,results) => {
                if(!err){
                    id = results.id;
                } else {
                    res.status(500);
                    res.type('json');
                    res.send({"message":"Couldn't register you right now try again later"});
                    connection.release();
                    return;
                }
            }   
        )
    } else {
        if (trans){
            queryString = "INSERT INTO transportador (utilizador) VALUES (?)";
        } else if (forn) {
            queryString = "INSERT INTO fornecedor (utilizador) VALUES (?)";
        } else {
            res.status(400);
            res.type('json');
            res.send({"message":"Bad Request"});
            connection.release();
            return;
        }
        connection.execute(
            queryString,
            [id],
            (err,results) => {
                if(!err){
                    res.status(200);
                    res.type('json');
                    res.send({"message":"Registado com sucesso"});
                    connection.release();
                    return;
                } else {
                    res.status(500);
                    res.type('json');
                    res.send({"message":"Couldn't register you right now try again later"});
                    connection.release();
                    return;
                }
            }   
        )
    }
  });
});


router.get('/login', (req, res) => {
  const email = req.body.email;
  const pwd = req.body.pwd;
  const queryString = "SELECT pass_word FROM utilizador WHERE email = ?";
  pool.getConnection((err, connection) => {
    connection.execute(
        queryString,
        [email],
        (err, results) => {
            if (!err) {
                if(results.length > 0){
                    if(results.password === pwd){
                        res.status(200);
                        res.type('json');
                        res.send({"message":"User authenticated successfully."});
                    } else {
                        res.status(401);
                        res.type('json');
                        res.send({"message":"User didn't authenticate successfully."});
                    }
                } else {
                    res.status(404);
                    res.type('json');
                    res.send({"message":"User wasn't found."});
                }
            } else {
                res.status(500);
                res.type('json');
                res.send({"message":"Error processing this query."});
            }
        })
    connection.release();    
    });
});

router.get('/:uid', function(req, res, next) {
  var userId = req.params.uid;
  var queryString = "SELECT * FROM utilizador WHERE id = ?";
  pool.getConnection((err,connection) => {
    connection.execute(
        queryString,
        [userId],
        (err, results) =>  {
            if (!err) {
                if(results.length > 0){
                    res.status(200);
                    res.type('json');
                    res.send(results);
                } else {
                    res.status(404);
                    res.type('json');
                    res.send({"message":"User wasn't found."});
                }
            } else {
                res.status(500);
                res.type('json');
                res.send({"message":"Error processing this query."});
            }
        })
  });
});


//exporta funções/"objetos"
module.exports = router ;
