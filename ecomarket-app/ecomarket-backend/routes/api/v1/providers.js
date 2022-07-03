const Axios = require('axios');
var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
var pool = require('../svlib/db/getPool');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
const { query } = require('../svlib/db/getPool');
const { response } = require('express');

router.post('/reg_storage', async (req,res) => {
    try {
        const address = encodeURIComponent(req.body.morada)
        const link = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAo6Nzo6UBDA2oEHjWeCAFfVqfEq-2-0S4&language=pt";
        console.log(link);
        const loc = await Axios.post(link).then(async (response) => {
            var location = response.data;

            if (location.status !== 'OK') throw new Error("Location Invalid");
            var components = location.results[0].address_components;
            var coords = location.results[0].geometry.location;
            console.log(coords);
            var parts = {};

            components.forEach(element => {

                var key;
                if (element.types.length > 1) {
                    key = element.types[0] === "political" ? element.types[1] : element.types[0];
                } else {
                    key = element.types[0];
                }

                parts[key] = element.long_name;
            });

            console.log(parts);
            const [concelho,fields] = await pool.query("SELECT id, distrito FROM concelho WHERE nome=?",[parts.locality]);
            if (concelho.length == 0) throw new Error("concelho not found");
            console.log(concelho);
            const insert = await pool.query("INSERT INTO morada(id, userId, prefix, sufix, street, dist, conc, lat, lng) VALUES (?,?,?,?,?,?,?,?,?)",
                [1, req.body.prov, parts.postal_code.substring(0,4), parts.postal_code.substring(5), parts.route, concelho[0].distrito, concelho[0].id, coords.lat, coords.lng]);
            const [morada, fieds] = await pool.query("SELECT id FROM morada WHERE street = ? AND userId = ?", [parts.route, req.body.prov]);
            const storage = await pool.query("INSERT INTO armazem (userId, morada) VALUES (?,?)", [req.body.prov, morada[0].id]);
            
        }).catch ( async (err) => {
            res.status(500).send({message: "fail"});
            throw err.message;
        })

        res.status(200).send({message: "success"});
    } catch (err) {
        console.error(err);
        res.status(500).send({message: "fail"});
    }
})

router.post('/reg_product', async (req,res) => {
    const prov = req.body.prov;
    const nome = req.body.nome;
    const dataprod = req.body.dataprod;
    const preco = req.body.preco;
    const quant = req.body.quant;
    const armazem = req.body.storage;
    const categoria = req.body.cat;
    const subcategoria = req.body.subcat;
    try {
        const insert = await pool.query("INSERT INTO produto (dscp, catg, subcatg) VALUES (?,?,?)", 
            [nome, categoria, subcategoria]);
        const select = await pool.query("SELECT id FROM produto WHERE dscp = ? ORDER BY id DESC", [nome]);
        console.log(select[0][0].id)
        const insert2 = await pool.query("INSERT INTO stock (forn, store, produ, qtty, preco) VALUES (?,?,?,?,?)", 
            [prov, armazem, select[0][0].id, quant, preco]);
        
        res.status(200).send({message: "success"});
    } catch (err) {
        console.error(err);
        res.status(500).send({message: "fail"});
    }
});

// OPERACIONAL
router.get('/products', async (req,res) => {
    var provId = req.query.pid;
    var queryString = "SELECT p.id AS id, p.dscp AS nome, c.nome AS categoria, sc.nome AS subcategoria, s.preco AS preco, m.street AS armazem, s.qtty as quantidade \
                        FROM stock s, produto p, categoria c, subcategoria sc, armazem a, morada m \
                        WHERE (s.forn = ?) AND (s.produ = p.id) AND (s.store = a.id) AND (a.morada = m.id) AND (p.catg = c.id) AND (p.subcatg = sc.id) \
                        GROUP BY p.id, m.street, s.preco, s.qtty \
                        ORDER BY p.dscp ASC";

    try {
        const [results,fields] = await pool.query(queryString, [provId]);
        return res.status(200).send({results: results}); 
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:"fail"});
    }
});


router.get('/orders', async (req,res) => {
    var provId = req.query.pid;
    var queryString = "SELECT e.id AS id, e.data AS data, u1.nome AS transportador, SUM(lpe.quantidade * p.preco) AS total, u2.nome AS consumidor \
                        FROM encomenda e, utilizador u1, lista_produtos_encomenda lpe, produto p, lista_encomendas le, transportar_encomendas te, utilizador u2 \
                        WHERE (le.fornecedor = ?) AND (le.encomenda = e.id) AND (te.encomenda = e.id) AND (te.transportador = u1.id) AND (lpe.encomenda = e.id) \
                            AND (lpe.produto = p.id) AND (le.consumidor = u2.id) \
                        GROUP BY e.id, u1.nome, u2.nome";

    try {
        const [results,fields] = await pool.query(queryString, [provId]);
        return res.status(200).send({results: result}); 
    } catch (err) {
        return res.status(500).send({message:"fail"});
    }
});


router.get('/storages', async (req,res) => {
    var provId = req.query.pid;
    var queryString = "SELECT a.id AS id, m.street AS rua, m.prefix AS postal1, m.sufix AS postal2, d.nome AS distrito, c.nome AS concelho \
                        FROM armazem a, morada m, distrito d, concelho c \
                        WHERE (a.userId = ?) AND (a.morada = m.id) AND (m.dist = d.id) AND (m.conc = c.id)";

    try {
        const [results,fields] = await pool.query(queryString, [provId]);
        return res.status(200).send({results: results}); 
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:"fail"});
    }
});

//exporta funções/"objetos"
module.exports = router ;