var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
var pool = require('../svlib/db/getPool');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
const { query } = require('../svlib/db/getPool');
const { response } = require('express');

router.post('/reg_car', async (req,res) => {
    var trans = req.body.trans;
    var marca = req.body.marca;
    var ano = req.body.ano;
    var comb = req.body.combustivel;
    var caixa = req.body.caixa;
    var consumo = req.body.consumo;
    var un = req.body.unidade;
    var matricula = req.body.matricula;

   try {
    const insert = await pool.query("INSERT INTO consumos_veiculo (unidade, quantidade) VALUES (?,?)", 
        [un, consumo]);
    const select = await pool.query("SELECT id FROM consumos_veiculo ORDER BY id DESC");
    const insert2 = await pool.query("INSERT INTO veiculo (transp, marca, ano, fuel, consumo, plate) VALUES (?,?,?,?,?,?)",
        [trans, marca, ano, comb, select[0][0].id, matricula]);
    res.status(200).send({message: "success"});
   } catch(err) {
    console.error(err);
    res.status(500).send({message: "fail"});
   }
});

// OPERACIONAL
router.get('/orders', async (req,res) => {
    var transId = req.query.tid;
    var queryString = "SELECT enc.id AS id, u1.nome AS cons, enc.tpurchase AS data, d.vehic AS car, ed.descr AS estado, enc.total AS total \
                        FROM encomenda enc, utilizador u1, despacho d, estado_despacho ed \
                        WHERE (d.transp = ?) AND (d.encom = enc.id) AND (enc.cons = u1.id) AND (d.estado = ed.id) \
                        GROUP BY enc.id, u1.nome, ed.descr, d.vehic \
                        ORDER BY enc.id ASC"

    try {
        const [result,fields] = await pool.query(queryString, [transId]);
        return res.status(200).send({results: result}); 
    } catch (err) {
        console.log(err);
        return res.status(500).send({message:"fail"});
    }
});

router.get('/cars', async (req,res) => {
    var transId = req.query.tid;
    var queryString = "SELECT v.id AS id, v.marca AS marca, v.ano AS ano, v.fuel AS combustivel, c.quantidade AS quantidade, c.unidade AS unidade, v.plate AS matricula \
                        FROM veiculo v, consumos_veiculo c \
                        WHERE (v.transp = ?) AND (v.consumo = c.id) \
                        GROUP BY v.id, v.marca \
                        ORDER BY v.id ASC";
    
    try {
        const [results, fields] = await pool.query(queryString, [transId]);
        return res.status(200).send({results: results}); 
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:"fail"});
    }
});

router.get('/add_car', async (req, res) => {
    try {
        const order = req.query.id;
        const car = req.query.car;
        const update = await pool.query("UPDATE despacho SET vehic = ? WHERE encom = ?", [car, order]);
        const update2 = await pool.query("UPDATE despacho SET estado = 3 WHERE encom = ?", [order]);
        return res.redirect("https://ecomarket.works/transporter"); // por mudar
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:"fail"});
    }
});

//exporta funções/"objetos"
module.exports = router ;