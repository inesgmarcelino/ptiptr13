var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
var pool = require('../svlib/db/getPool');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
const { query } = require('../svlib/db/getPool');
const { response } = require('express');

router.post('/add_prod_shbag', async (req,res) => {
    const cons = req.body.cons;
    const prod = req.body.prod;

    var queryString = "INSERT INTO cesto_compras (consumidor, produto) VALUES (?,?)";
    pool.getConnection((err,conn) => {
        if (err) throw err;

        conn.query(queryString, [cons, prod], (err,result) => {
            conn.release();

            if (err) {
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 1"});
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

router.post('/order', async (req,res) => {
    var queryString = "INSERT INTO encomenda (data) VALUES (" + new Date().toISOString().slice(0, 10) + ")";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [], (err,result) => {
            if (err) {
                conn.release();

                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 2"});
                return;
            }
        });

        var idord;
        queryString = "SELECT id FROM encomenda";
        conn.query(queryString, [], (err,results) => {
            if (!err) {
                idord = results[results.length -1].id; //por verificar
            } else {
                conn.release();

                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 3"});
                return;
            }
        });

        const cons = req.body.cons;
        queryString = "SELECT produto FROM cesto_compras WHERE consumidor = ?";
        conn.query(queryString, [cons], (err, results) => {
            if (!err) {
                results.forEach(prod => {
                    queryString = "INSERT INTO lista_produtos_encomenda (encomenda, produto) VALUES (?,?)";
                    conn.query(queryString, [idord, prod], (err,result) => {
                        if (err) {
                            res.status(500);
                            res.type('json');
                            res.send({"message":"Não foi possível realizar essa operação. output 4"});
                            return;
                        }
                    })
                });
            } else {
                conn.release();

                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 5"});
                return;
            }
        });
        
        const prov = req.body.prov;
        queryString = "INSERT INTO lista_encomendas (consumidor, encomenda, fornecedor) VALUES (?,?,?)";
        conn.query(queryString, [cons, idord, prov], (err,result) => {
            if (err) {
                conn.release();

                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 6"});
                return;
            }
        })
    
        queryString = "INSERT INTO estado_encomenda (encomenda, status_consum, status_fornec, status_transp) VALUES (?,?,?,?)";
        conn.query(queryString, [idord,"YES", "NO", "NO"], (err,result) => {
            conn.release();

            if(!err){
                res.status(200);
                res.type('json');
                res.send({"message":"Registo bem sucessido"});
                return;
            } else {
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 7"});
                return;
            }
        });
    });
});

router.post('/cancel/:oid', async (req,res) => {
    var orderId = req.params.oid;
    var queryString = "DELETE FROM encomenda WHERE id = ?";
    pool.getConnection((err, conn) => {
        if (err) throw err;
        
        conn.query(queryString, [orderId], (err, results) =>  {
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
                conn.release();

                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 8"});
            }
        });
    });
});

// OPERACIONAL
router.get('/orders', async (req,res) => {
    var consId = req.query.cid;
    var queryString = "SELECT e.id AS id, e.data AS data, u1.nome AS fornecedor, u2.nome AS transportador, \
                            SUM(lpe.quantidade * p.preco) AS total, st.status_consum AS cons, st.status_fornec AS forn, st.status_transp AS transp \
                        FROM encomenda e, lista_encomendas le, transportar_encomendas te, utilizador u1, \
                            utilizador u2, lista_produtos_encomenda lpe, produto p, estado_encomenda st \
                        WHERE (le.consumidor = ?) AND (le.encomenda = e.id) AND (le.fornecedor = u1.id) \
                            AND (te.encomenda = e.id) AND (te.transportador = u2.id) AND (lpe.encomenda = e.id) \
                            AND (lpe.produto = p.id) AND (st.encomenda = e.id) \
                        GROUP BY e.id, u1.nome, u2.nome";

    try {
        const [rows, fields] = await pool.query(queryString, [consId]);
        return res.status(200).send({results: rows}); 
    } catch (err) {
        return res.status(500).send({message:"fail"});
    }
});

//exporta funções/"objetos"
module.exports = router ;