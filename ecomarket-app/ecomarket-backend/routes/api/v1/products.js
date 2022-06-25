var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
var pool = require('../svlib/db/getPool');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
const { query } = require('../svlib/db/getPool');
const { response } = require('express');

router.get('/:cid', (req,res) => {
    const cid = req.params.cid;
    var queryString = "SELECT * FROM produto WHERE tipo = ?";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [cid], (err, rows) => {
            conn.release();

            if (err) {
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 1"});
                return;
            } else {
                // por acabar
            }
        });
    });
});

router.get('/:pid', (req,res) => {
    const pid = req.params.pid;
    var queryString = "SELECT * FROM produto WHERE id = ?";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [pid], (err, rows) => {
            conn.release();

            if (err) {
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 2"});
                return;
            } else {
                // por acabar
            }
        });
    });
});

router.get('/:pname', (req,res) => {
    const pname = req.params.pname;
    var queryString = "SELECT * FROM produto WHERE nome = '%?%'";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [pname], (err, rows) => {
            conn.release();
            
            if (err) {
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 3"});
                return;
            } else {
                // por acabar
            }
        });
    });
});

router.get('/order', (req,res) => {
    console.error("ping");
    console.log(req);
});

router.get('/order', (req,res) => {
    var order = req.query.order;
    console.log(order);
    var queryString = "SELECT p.id AS id, p.nome AS nome, lpe.quantidade AS quant, SUM(lpe.quantidade * p.preco) AS total \
                        FROM produto p, lista_produtos_encomenda lpe WHERE (lpe.encomenda = ?) AND (lpe.produto = p.id) \
                        GROUP BY p.id, p.nome";
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [order], (err, results) => {
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

//exporta funções/"objetos"
module.exports = router ;