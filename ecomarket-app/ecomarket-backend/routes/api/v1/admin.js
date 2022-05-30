var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
// var pool = require('../svlib/db/getPool');
var conn = require('../svlib/db/connect-ines');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
const { query } = require('../svlib/db/getPool');
/** */

//probably very useful: https://www.w3schools.com/nodejs/nodejs_mysql.asp

router.get('/adminlogin', (req, res) => {
    const email = req.body.email;
    const pwd = req.body.pwd;
    const queryString = "SELECT pass_word from utilizador WHERE email = ?";

    conn.query(queryString, [email], (err, results) => {
        var message;
        if (!err) {
            if (results.length > 0) {
                if (results.password === pwd) {
                    res.status(200);
                    message = "Admin autenticado";
                } else {
                    res.send(401);
                    message = "Não foi possível autenticar o admin.";
                }
            } else {
                res.send(404);
                message = "Argumentos inválidos.";
            }
        } else {
            res.status(500);
            message = "Não foi possível realizar essa operação. outpout 1";
        }
        res.type('json');
        res.send({"message": message});
    });
});


router.get('/adminadd', (req, res) => {
    var tab = req.params.tab; //tipo ou subtipo
    var nome = req.params.nome;
    var message;
    if (tab === "tipo") {
        const queryString = "INSERT INTO tipo_produto VALUES (nome) VALUES (?)";
        conn.query(queryString, [nome], (err, result) => {
            if (err) {
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. outpout 2"});
                connection.release();
                return;
            } else {
                res.status(200);
                message = "Novo tipo adicionado.";
            }
        });

    } else if (tab === "subtipo") {
        var mae = req.params.mae; //tipo
        const queryString = "INSERT INTO subtipo_produto VALUES (nome) VALUES (?)";
        conn.query(queryString, [nome], (err,result) => {
            if (err) {
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. outpout 3"});
                connection.release();
                return;
            }
        });

        queryString = "SELECT id from subtipo_produto WHERE nome = ?";
        var id;
        conn.query(queryString, [nome], (err, results) => {
            if (!err) {
                id = results.id;
            } else {
                res.status(500);
                res.type('json');
                res.send({"message":"Subtipo não se encontra na base de dados"});
                return;
            }
        });

        queryString = "INSERT INTO tipo_subtipo VALUES (?,?)";
        conn.query(queryString, [mae, id], (err,result) => {
            if (err) {
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. outpout 4"});
                return;
            } else {
                res.status(200);
                message = "Novo subtipo adicionado."
            }
        });
    }
    res.type('json');
    res.send({"message": message});
});

router.get('/edit/:uid', (req, res, next) => {
    const id = req.params.uid;
    const nome = req.body.nome;
    const email = req.body.email;
    const nif = req.body.nif;
    const tlm = req.body.tlm;
    // const image = req.body.image;
    const pwd = req.body.pwd;
    const morada = req.body.morada;

    const queryString = "UPDATE utilizador SET nome = ?, email = ?, nif = ?, telemovel = ?\
                                                pass_word = ?, morada = ? WHERE id = ?";
    conn.query(queryString, [nome,email,nif,tlm,pwd,morada,id], (err, results) => {
        if (err) {
            res.status(500);
            res.type('json');
            res.send({"message":"Não foi possível realizar essa operação. outpout 5"});
            return;
        } else {
            res.status(200);
            res.type('json');
            res.send({"message":"Alterações guardadas."});
        }
    });
});