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
  
    var queryString = "INSERT INTO utilizador (nome, email, nif, telemovel, pass_word, morada) VALUES (?,?,?,?,?,?)";

    pool.getConnection((err, conn) => {
        if (err) throw err;
        
        conn.query(queryString, [nome, email, nif, tlm, pwd, morada], (err, result) => {
            if (err) {
                conn.release();
                console.log("Não foi possível realizar essa operação. output 1");
                return res.status(500).send({message:"fail"});
            }
        });

        queryString = "SELECT id FROM utilizador WHERE email = ?";
        conn.query(queryString, [email], (err,results) => {
            if(err){
                conn.release();
                console.log("Não foi possível realizar essa operação. output 2");
                return res.status(500).send({message:"fail"});
            } else {
                var id = results[0].id;

                if(cons){
                    queryString = "INSERT INTO consumidor (utilizador) VALUES (?)";
                    conn.query(queryString, [id], (err,results) => {
                        conn.release();
        
                        if(err){
                            console.log("Não foi possível realizar essa operação. output 3");
                            return res.status(500).send({message:"fail"});
                        }
                        console.log("Registo bem sucessido");
                        return res.status(200).send({message:"success"});
                    });
            
                } else {
                    if (trans){
                        queryString = "INSERT INTO transportador (utilizador) VALUES (?)";
                    } else if (forn) {
                        queryString = "INSERT INTO fornecedor (utilizador) VALUES (?)";
                    } else {
                        conn.release();
        
                        console.log("Bad Request");
                        return res.status(400).send({message:"fail"});
                    }
            
                    conn.query(queryString, [id], (err,results) => {
                        conn.release();
        
                        if(!err){
                            console.log("Registo bem sucessido");
                            return res.status(200).send({message:"success"});
                        } else {
                            console.log("Não foi possível realizar essa operação. output 4");
                            return res.status(500).send({message:"fail"});
                        }
                    });
                }
            }
        });
    });
  });


router.post('/login', (req, res) => {
    console.log(req);
    const email = req.body.email;
    const pwd = req.body.pwd;

    console.log(email, pwd);
    const queryString = "SELECT pass_word FROM utilizador WHERE email = ?";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [email], (err, results) => {
            conn.release();

            if (!err) {
                // console.log(results[0].pass_word);
                // if(Object.keys(results).length > 0){
                //     if(results[0].pass_word === pwd){
                //         console.log("Utilizador autenticado");
                //         return res.status(200).send({message:"success"});
                //     } else {
                //         console.log("Não foi possível autenticar o utilizador.");
                //         return res.status(401).send({message:"fail"});
                //     }
                // } else {
                //     console.log("Utilizador não se encontra na base de dados");
                //     return res.status(404).send({message:"no email"});
                // }
            } else {
                console.log("Não foi possível realizar essa operação. output 5");
                return res.status(500).send({message:"fail"});
            }
        });
    });
  
});

router.get('/:uid', (req,res) => {
    var userId = req.params.uid;
    var queryString = "SELECT * FROM utilizador WHERE id = ?";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [userId], (err, rows) =>  {
            conn.release();

            if (!err) {
                if(results.length > 0){
                    return res.status(200).send({message:"success", results: rows});
                } else {
                    console.log("Utilizador não se encontra na base de dados");
                    return res.status(404).send({message:"no email"});
                }
            } else {
                console.log("Não foi possível realizar essa operação. output 6");
                return res.status(500).send({message:"fail"});
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
                    console.log("Utilizador removido com sucesso");
                    return res.status(200).send({message:"success"});
                } else {
                    console.log("Utilizador não se encontra na base de dados");
                    return res.status(404).send({message:"fail"});
                }
            } else {
                console.log("Não foi possível realizar essa operação. output 7");
                return res.status(500).send({message:"fail"});
            }
        });
    });
});


// um user que seja só consumidor ou só fornecedor pode se tornar também fornecedor ou consumidor...


//exporta funções/"objetos"
module.exports = router ;
