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

router.get('/orders', (req,res) => {
    var transId = req.query.tid;
    var queryString = "SELECT e.id AS id, e.data AS data, ee.status_transp AS transp, SUM(lpe.quantidade * p.preco) AS total \
                        FROM encomenda e, estado_encomenda ee, lista_produtos_encomenda lpe, produto p, transportar_encomendas te \
                        WHERE (te.transportador = 4) AND (te.encomenda = e.id) AND (ee.encomenda = e.id) AND (lpe.encomenda = e.id) AND (p.id = lpe.produto) \
                        GROUP BY e.id";
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [transId], (err, results) => {
            conn.release();

            if (!err) {
                return res.status(200).send({results: results});
            } else {
                console.log("Não foi possível realizar essa operação. output 4");
                return res.status(500).send({message:"fail"});
            }
        });
    });
});

router.get('/cars', (req,res) => {
    var transId = req.query.tid;
    var queryString = "SELECT v.id AS id, v.marca AS marca, v.ano AS ano, v.combustivel AS combustivel, v.caixa AS caixa, v.co2 AS emissao \
                        FROM veiculo v, lista_veiculos lv \
                        WHERE (lv.transportador = 4) AND (lv.veiculo = v.id) \
                        GROUP BY v.id;";
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [transId], (err, results) => {
            conn.release();

            if (!err) {
                return res.status(200).send({results: results});
            } else {
                console.log("Não foi possível realizar essa operação. output 5");
                return res.status(500).send({message:"fail"});
            }
        });
    });
});

//exporta funções/"objetos"
module.exports = router ;