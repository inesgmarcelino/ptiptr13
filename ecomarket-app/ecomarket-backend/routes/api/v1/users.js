var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
// var pool = require('../svlib/db/getPool');
var pool = require('../svlib/db/getPool');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
/** */

//probably very useful: https://www.w3schools.com/nodejs/nodejs_mysql.asp

// router.get('register', (req,res) =>{
//     res.status(404);
//     res.send({});
// })

/* GET users listing. */
router.post('/register', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const nif = req.body.nif;
    const tlm = req.body.tlm;
    // const image = req.body.image;
    const morada = req.body.morada;
    const pwd = req.body.pwd;
    const cons = req.body.cons;
    const forn = req.body.forn;
    const trans = req.body.trans;

    // pool.getConnection((err, connection) => {

    // if(err){
    //     res.status(500);
    //     res.type('json');
    //     res.json({"message":"Couldn't register you right now try again later"});
    // }
  
    var queryString = "INSERT INTO utilizador (nome, email, nif, telemovel, pass_word, morada) VALUES (?,?,?,?,?,?)";

    pool.getConnection((err, conn) => {
        if (err) throw err;
        
        conn.query(queryString, [nome, email, nif, tlm, pwd, morada], (err, result) => {
            // conn.release();
            if (err) {
                conn.release();

                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 1"});
                return;
            }
        });

        queryString = "SELECT id FROM utilizador WHERE email = ?";
        conn.query(queryString, [email], (err,results) => {
            if(!err){
                const id = results[0]['id'];
            } else {
                conn.release();
                
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 2"});
                return;
            }
        });

        if(cons){
            queryString = "INSERT INTO consumidor (utilizador) VALUES (?)";
            conn.query(queryString, [id], (err,results) => {
                console.error(err);
                conn.release();

                if(!err){
                    id = results.id;
                } else {
                    res.status(500);
                    res.type('json');
                    res.send({"message":"Não foi possível realizar essa operação. output 3"});
                    return;
                }
            });
    
        } else {
            if (trans){
                queryString = "INSERT INTO transportador (utilizador) VALUES (?)";
            } else if (forn) {
                queryString = "INSERT INTO fornecedor (utilizador) VALUES (?)";
            } else {
                conn.release();

                res.status(400);
                res.type('json');
                res.send({"message":"Bad Request"});
                return;
            }
    
            conn.query(queryString, [id], (err,results) => {
                console.error(err);
                conn.release();

                if(!err){
                    res.status(200);
                    res.type('json');
                    res.send({"message":"Registo bem sucessido"});
                    return;
                } else {
                    res.status(500);
                    res.type('json');
                    res.send({"message":"Não foi possível realizar essa operação. output 4"});
                    return;
                }
            });
        }
    });
    
  });
// });


router.get('/login', (req, res) => {
    const email = req.body.email;
    const pwd = req.body.pwd;
    const queryString = "SELECT pass_word FROM utilizador WHERE email = ?";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [email], (err, results) => {
            conn.release();

            var message;
            if (!err) {
                if(results.length > 0){
                    if(results.password === pwd){
                        res.status(200);
                        message = "Utilizador autenticado";
                    } else {
                        res.status(401);
                        message = "Não foi possível autenticar o utilizador.";
                    }
                } else {
                    res.status(404);
                    message = "Utilizador não se encontra na base de dados";
                }
            } else {
                res.status(500);
                message = "Não foi possível realizar essa operação. output 5";
            }
            res.type('json');
            res.send({"message": message});
        });
    });
  
});

router.get('/:uid', (req,res) => {
    var userId = req.params.uid;
    var queryString = "SELECT * FROM utilizador WHERE id = ?";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [userId], (err, results) =>  {
            conn.release();

            if (!err) {
                if(results.length > 0){
                    res.status(200);
                    res.type('json');
                    res.send(results);
                } else {
                    res.status(404);
                    res.type('json');
                    res.send({"message":"Utilizador não se encontra na base de dados"});
                }
            } else {
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 6"});
            }
        });
    });
});

router.post('/delete/:uid', (req,res) => {
    var userId = req.params.uid;
    var queryString = "DELETE FROM utilizador WHERE id = ?";

    pool.getConnection((err,conn) => {
        if (err) throw err;

        conn.query(queryString, [userId], (err, results) =>  {
            conn.release();

            if (!err) {
                if(results.length > 0){
                    res.status(200);
                    res.type('json');
                    res.send(results);
                } else {
                    res.status(404);
                    res.type('json');
                    res.send({"message":"Utilizador não se encontra na base de dados"});
                }
            } else {
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 7"});
            }
        });
    });
});


// um user que seja só consumidor ou só fornecedor pode se tornar também fornecedor ou consumidor...


//exporta funções/"objetos"
module.exports = router ;
