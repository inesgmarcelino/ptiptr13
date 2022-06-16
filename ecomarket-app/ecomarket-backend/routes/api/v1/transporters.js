var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
// var pool = require('../svlib/db/getPool');
var pool = require('../svlib/db/connection');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
const { query } = require('../svlib/db/getPool');
const { response } = require('express');

router.post('/reg_car', (req,res) => {
    const transp = req.body.trasnp;
    const cond = req.body.cond;

    var queryString = "INSERT INTO veiculo (condicoes) VALUES (?)";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [cond], (err, result) => {
            if (err) {
                conn.release();

                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 1"});
                return;
            }
        });
    
        var idveic;
        queryString = "SELECT id FROM veiculo";
        conn.query(queryString, [], (err,results) => {
            if (!err) {
                idveic = results[results.length -1].id; //por verificar
            } else {
                conn.release();
                
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 2"});
                return;
            }
        });
    
        queryString = "INSERT INTO lista_veiculos (transportador, veiculo) VALUES (?)";
        conn.query(queryString, [transp, idveic], (err, result) => {
            if (err) {
                conn.release();
                
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 3"});
                return;
            } else {
                res.status(200);
                res.type('json');
                res.send({"message":"Registo bem sucessido"});
                return;
            }
        });
    });
});

router.get('/orders/:tid', (req,res) => {
    var transId = req.params.tid;
    var queryString = "SELECT encomenda FROM transportar_encomendas WHERE transportador = ?";
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [transId], (err, results) =>{ 
            if (!err) {
                results.forEach(enc => {
                    queryString = ""; //por acabar
                });
            } else {
                conn.release();

                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 4"});
            }
        });
    });
});