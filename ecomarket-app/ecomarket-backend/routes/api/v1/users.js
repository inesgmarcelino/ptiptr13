var express = require('express');
var router = express.Router();
const multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const axios = require('axios');

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
var pool = require('../svlib/db/getPool');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
/** */

//probably very useful: https://www.w3schools.com/nodejs/nodejs_mysql.asp

// router.get('register', (req,res) =>{
//     res.status(404);
//     res.send({});
// })


router.post('/register', (req,res,next) => {

    console.error(req.body);
    var error = false;
    /** Meter aqui correção dos dados do utilizador */
    const reply = axios.post('https://ecomarket.eu.auth0.com/dbconnections/signup',
        {
            client_id: '8d3hjpCHdNoQWDGJk2g4MNSeGNPZZs5R',
            connection: 'Username-Password-Authentication',
            email: req.body.email,
            password: req.body.pwd,
            name:req.body.nome,
            picture: "https://digimedia.web.ua.pt/wp-content/uploads/2017/05/default-user-image.png",
            user_metadata: { nif:req.body.nif,
                             tlm:req.body.tlm, 
                             morada:req.body.morada}
        }, {
        headers: {
            'content-type': 'application/json'
        }
    }).then(function (response) {
        
        pool.getConnection((err, conn) => {
            if (err) throw err;
            var id = undefined;
            var queryString = "SELECT id FROM utilizador WHERE email = ?";
            conn.query(queryString, [req.body.email], (err,results) => {
                if(err){
                    console.log(err.message);
                    error = true;
                }else {
                    console.log(results);
                    id = results.id;
                    console.log(id);
                }
            });
            console.log(id);
            if (req.body.trans && !error) {
                /** Código pra registo do transportador (como tratar da localização e afins) */
                console.log("would be");
            } else {
                if(req.body.cons && !error){
                    queryString = "INSERT INTO consumidor (utilizador) VALUES (?)";
                    conn.query(queryString, [id], (err,results) => {
                        if(err){
                            console.log(err.message);
                            error = true;
                        } 
                    });
                }
                if (req.body.forn && !error) {
                    queryString = "INSERT INTO fornecedor (utilizador) VALUES (?)";
                    conn.query(queryString, [id], (err,results) => {
                        if(err){
                            console.log(err.message);
                            error = true;
                        } 
                    });
                } 
            }
            conn.release();
        });
        if(error){
            res.status(500).send({message:"fail"});
        } else {
            console.log("Registo bem sucessido");
            res.status(200).send({message:"success"}); 
        }
    }).catch(function (error) {
        res.status(400).send("Malformed Request");
    });
});

/*
router.post('/login', (req, res) => {
    const email = req.body.email;
    const pwd = req.body.pwd;

    const queryString = "SELECT pass_word FROM utilizador WHERE email = ?";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [email], (err, results) => {
            conn.release();

            if (!err) {
                if(results.length > 0){
                    if(results[0].pass_word === pwd){
                        console.log("Utilizador autenticado");
                        return res.status(200).send({message:"success"});
                    } else {
                        console.log("Não foi possível autenticar o utilizador.");
                        return res.status(401).send({message:"fail"});
                    }
                } else {
                    console.log(email + " não se encontra na base de dados.");
                    return res.status(404).send({message:"no email"});
                }
            } else {
                console.log("Não foi possível realizar essa operação. output 5");
                return res.status(500).send({message:"fail"});
            }
        });
    });
  
});*/

router.get('/:uid', (req,res) => {
    var userId = req.params.uid;
    var queryString = "SELECT * FROM utilizador WHERE id = ?";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [userId], (err, rows) =>  {
            conn.release();

            if (!err) {
                if(rows.length > 0){
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

router.delete('/delete/:uid', (req,res) => {
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

router.put('/edit/:uid', (req,res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const tlm = req.body.tlm;
    const morada = req.body.morada;
    const pwd = req.body.pwd;
    
    var queryString = "UPDATE utilizador SET ";
    if (nome !== '') {
        queryString += "nome = '" + nome + "' ";
    }

    if (email !== '') {
        if ('=' in queryString) {
            queryString += "AND email = '" + email + "' ";
        } else {
            queryString += "email = '" + email + "' ";
        }
    }

    if (tlm !== '') {
        if ('=' in queryString) {
            queryString += "AND telemovel = " + tlm + " ";
        } else {
            queryString += "telemovel = " + tlm + " ";
        }
    }

    if (morada !== '') {
        if ('=' in queryString) {
            queryString += "AND morada = '" + morada + "' ";
        } else {
            queryString += "morada = '" + morada + "' ";
        }
    }

    if (pwd !== '') {
        if ('=' in queryString) {
            queryString += "AND pass_word = '" + pwd + "' ";
        } else {
            queryString += "pass_word = '" + pwd + "' ";
        }
    }

    var userId = req.params.uid;
    queryString += "WHERE id = " +  userId;
    
    pool.getConnection((err,conn) => {
        if (err) throw err;

        conn.query(queryString, (err, results) =>  {
            conn.release();

            if (!err) {
                if(results.length > 0){
                    console.log("Utilizador atualizado com sucesso");
                    return res.status(200).send({message:"success"});
                } else {
                    console.log("Utilizador não se encontra na base de dados");
                    return res.status(404).send({message:"fail"});
                }
            } else {
                console.log("Não foi possível realizar essa operação. output 8");
                return res.status(500).send({message:"fail"});
            }
        });
    });
});

router.post('/uploadProfPic', (req,res) => {
    const filename = req.body.filename;
    var queryString = "INSERT INTO image (filename) VALUES (?)";

    pool.getConnection((err,conn) => {
        if (err) throw err;

        conn.query(queryString, (err, results) => {
    
            if (!err) {
                queryString = "SELECT id FROM image";
                conn.query(queryString, (err, results) => {
                    conn.release();

                    if (!err) {
                        console.log("Imagem descarregada com sucesso");
                        return res.status(200).send({message: results[results.size -1].id})
                    }
                })
            } else {
                console.log("Não foi possível realizar essa operação. output 9");
                return res.status(500).send({message:"fail"});
            }
        });
    });
});




// um user que seja só consumidor ou só fornecedor pode se tornar também fornecedor ou consumidor...


//exporta funções/"objetos"
module.exports = router ;
