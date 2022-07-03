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
    const trans = req.body.trans;
    const marca = req.body.marca;
    const ano = req.body.ano;
    const comb = req.body.combustivel;
    const caixa = req.body.caixa;
    const consumo = req.body.consumo;
    const un = req.body.unidade;
    const matricula = req.body.matricula;

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
    var queryString = "SELECT e.id AS id, e.data AS data, ee.status_transp AS transp, SUM(lpe.quantidade * p.preco) AS total, u1.nome AS consumidor \
                        FROM encomenda e, estado_encomenda ee, lista_produtos_encomenda lpe, produto p, transportar_encomendas te, utilizador u1, lista_encomendas le \
                        WHERE (te.transportador = ?) AND (te.encomenda = e.id) AND (ee.encomenda = e.id) AND (lpe.encomenda = e.id) AND (p.id = lpe.produto) \
                            AND (le.encomenda = e.id) AND (le.consumidor = u1.id) \
                        GROUP BY e.id, u1.nome";

    try {
        const [result,fields] = await pool.query(queryString, [transId]);
        return res.status(200).send({results: result}); 
    } catch (err) {
        return res.status(500).send({message:"fail"});
    }
});

router.get('/cars', async (req,res) => {
    var transId = req.query.tid;
    var queryString = "SELECT v.id AS id, v.marca AS marca, v.ano AS ano, v.combustivel AS combustivel, v.caixa AS caixa, v.co2 AS emissao \
                        FROM veiculo v, lista_veiculos lv \
                        WHERE (lv.transportador = 4) AND (lv.veiculo = v.id) \
                        GROUP BY v.id;";

    try {
        const [result,fields] = await pool.query(queryString, [transId]);
        return res.status(200).send({results: result}); 
    } catch (err) {
        return res.status(500).send({message:"fail"});
    }
});

//exporta funções/"objetos"
module.exports = router ;