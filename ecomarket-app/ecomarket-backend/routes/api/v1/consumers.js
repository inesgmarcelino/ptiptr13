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
    try {
        const cons = req.body.cons;
        const prod = req.body.prod;
        const qtty = req.body.qtty;
        const [produto, fields] = await pool.query("SELECT forn FROM produto WHERE id = ?", [prod]);
        const insert = await pool.query("INSERT INTO cesto_compras VALUES (?,?,?,?)", [cons, produto[0].forn, prod, qtty]);
        return res.status(200).send({message: 'success'});
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'fail'});
    }
});

router.post('/order', async (req,res) => {
    try {
        const cons =  req.body.cons;
        const [select, fields] = await pool.query("SELECT cc.qtty, p.preco, p.forn, p.id \
                                                    FROM cesto_compras cc, produto p \
                                                    WHERE (cc.cons = ?) AND (cc.prod = p.id)", [cons]);
        const d = new Date();
        const date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
        var total = 0;
        for (var i = 0; i < select.length; i++) {
            total += select[i].qtty * select[i].preco;
        }
        const insert1 = await pool.query("INSERT INTO encomenda (cons, tpurchase, total) VALUES (?,?,?)", [cons, date, total]);
        const [select2, fields2] = await pool.query("SELECT id FROM encomenda WHERE cons = ? ORDER BY id DESC", [cons]);
        const insert2 = await pool.query("INSERT INTO despacho (encom, forn) VALUES (?,?)", [select2[0].id, select[0].forn]);

        for (var j = 0; j < select.length; j++) {
            const insert3 = await pool.query("INSERT INTO encomenda_prods VALUES (?,?,?,?,?)",[select2[0].id, select[0].forn, select[j].id, select[j].qtty, select[j].preco]);
        }

        const deleting = await pool.query("DELETE FROM cesto_compras WHERE cons = ?", [cons]);
        return res.status(200).send({message: 'success'});
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'fail'});
    }
})

router.delete('/cancel', async (req,res) => {
    try {
        var order = req.query.id;
        const cancel = await pool.query("DELETE FROM encomenda_prods WHERE encom = ?", [order]);
        const cancel2 = await pool.query("DELETE FROM despacho WHERE encom = ?", [order]);
        const cancel3 = await pool.query("DELETE FROM encomenda WHERE id = ?", [order]);
        return res.status(200).send({message: 'success'});
    } catch (err) {
        console.log(err);
        res.status(500).send({message: 'fail'});
    }
});

router.get('/orders', async (req,res) => {
    var consId = req.query.cid;
    console.log(consId);
    var queryString = "SELECT e.id AS id, e.tpurchase AS data, u1.nome AS fornecedor, d.transp AS transportador, ed.descr AS estado, e.total AS total \
                        FROM encomenda e, utilizador u1, estado_despacho ed, despacho d \
                        WHERE (e.cons = ?) AND (e.id = d.encom) AND (d.forn = u1.id) AND (d.estado = ed.id) \
                        GROUP BY e.id, u1.nome, ed.descr, d.transp \
                        ORDER BY e.id ASC";

    try {
        const [result,fields] = await pool.query(queryString, [consId]);
        return res.status(200).send({results: result}); 
    } catch (err) {
        console.log(err);
        return res.status(500).send({message:"fail"});
    }
});

//exporta funções/"objetos"
module.exports = router ;