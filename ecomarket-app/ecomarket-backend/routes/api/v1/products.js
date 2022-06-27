var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
var pool = require('../svlib/db/getPool');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
const { response } = require('express');


router.get('/get', (req,res) => {
    console.log(req.query);
    var tipo = req.query.tipo;
    var subtipo = req.query.subtipo;

    var queryString;
    if (tipo !== null && subtipo !== null) {
        queryString = "SELECT p.*, u.nome FROM produto p, utilizador u WHERE (p.tipo = ?) AND (p.subtipo = ?) AND (u.id = p.fornecedor)";
    } else if (tipo !== null) {
        queryString = "SELECT p.*, u.nome FROM produto p, utilizador u WHERE (p.tipo = ?) AND (u.id = p.fornecedor)";
    } else {
        queryString = "SELECT p.*, u.nome FROM produto WHERE (u.id = p.fornecedor)";
    }

    console.log(tipo, subtipo, queryString)
    pool.getConnection((err, conn) => {
        if (err) throw err;
        console.log("estou aqui")
        conn.query(queryString, [tipo, subtipo], (err,results) => {
            conn.release();

            if (!err) {
                return res.status(200).send({results: results});
            } else {
                console.log("Não foi possível realizar essa operação. output 2");
                return res.status(500).send({message:"fail"});
            }
        });
    });
});

router.get('/order', (req,res) => {
    var order = req.query.order;
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
                console.log("Não foi possível realizar essa operação. output 1");
                return res.status(500).send({message:"fail"});
            }
        });
    });
});


// router.get('/:cid', (req,res) => {
//     console.log("Uh oh wrong place wrong time mr freeman");
//     const cid = req.params.cid;
//     var queryString = "SELECT * FROM produto WHERE tipo = ?";

//     pool.getConnection((err, conn) => {
//         if (err) throw err;

//         conn.query(queryString, [cid], (err, rows) => {
//             conn.release();

//             if (err) {
//                 res.status(500);
//                 res.type('json');
//                 res.send({"message":"Não foi possível realizar essa operação. output 1"});
//                 return;
//             } else {
//                 // por acabar
//             }
//         });
//     });
// });

// router.get('/:pid', (req,res) => {
//     const pid = req.params.pid;
//     var queryString = "SELECT * FROM produto WHERE id = ?";

//     pool.getConnection((err, conn) => {
//         if (err) throw err;

//         conn.query(queryString, [pid], (err, rows) => {
//             conn.release();

//             if (err) {
//                 res.status(500);
//                 res.type('json');
//                 res.send({"message":"Não foi possível realizar essa operação. output 2"});
//                 return;
//             } else {
//                 // por acabar
//             }
//         });
//     });
// });

// router.get('/:pname', (req,res) => {
//     const pname = req.params.pname;
//     var queryString = "SELECT * FROM produto WHERE nome = '%?%'";

//     pool.getConnection((err, conn) => {
//         if (err) throw err;

//         conn.query(queryString, [pname], (err, rows) => {
//             conn.release();
            
//             if (err) {
//                 res.status(500);
//                 res.type('json');
//                 res.send({"message":"Não foi possível realizar essa operação. output 3"});
//                 return;
//             } else {
//                 // por acabar
//             }
//         });
//     });
// });

//exporta funções/"objetos"
module.exports = router ;