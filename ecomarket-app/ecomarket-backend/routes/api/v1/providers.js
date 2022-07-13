const axios = require('axios');
var express = require('express');
var router = express.Router();
const ServerError = require('../svlib/ServError/ServerError');


// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
var pool = require('../svlib/db/getPool');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
const { query } = require('../svlib/db/getPool');
const { response } = require('express');

// router.post('/reg_storage', async (req,res) => {
//     try {
//         const address = encodeURIComponent(req.body.morada)
//         const link = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAo6Nzo6UBDA2oEHjWeCAFfVqfEq-2-0S4&language=pt";
//         console.log(link);
//         const loc = await Axios.post(link).then(async (response) => {
//             var location = response.data;

//             if (location.status !== 'OK') throw new Error("Location Invalid");
//             var components = location.results[0].address_components;
//             var coords = location.results[0].geometry.location;
//             console.log(coords);
//             var parts = {};

//             components.forEach(element => {

//                 var key;
//                 if (element.types.length > 1) {
//                     key = element.types[0] === "political" ? element.types[1] : element.types[0];
//                 } else {
//                     key = element.types[0];
//                 }

//                 parts[key] = element.long_name;
//             });

//             console.log(parts);
//             const [concelho,fields] = await pool.query("SELECT id, distrito FROM concelho WHERE nome=?",[parts.locality]);
//             if (concelho.length == 0) throw new Error("concelho not found");
//             console.log(concelho);
//             const insert = await pool.query("INSERT INTO morada(userId, prefix, sufix, street, dist, conc, lat, lng) VALUES (?,?,?,?,?,?,?,?)",
//                 [req.body.prov, parts.postal_code.substring(0,4), parts.postal_code.substring(5), parts.route, concelho[0].distrito, concelho[0].id, coords.lat, coords.lng]);
//             const [morada, fieds] = await pool.query("SELECT id FROM morada WHERE street = ? AND userId = ?", [parts.route, req.body.prov]);
//             const storage = await pool.query("INSERT INTO armazem (userId, morada) VALUES (?,?)", [req.body.prov, morada[0].id]);
            
//         }).catch ( async (err) => {
//             res.status(500).send({message: "fail"});
//             throw err.message;
//         })

//         res.status(200).send({message: "success"});
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({message: "fail"});
//     }
// })

router.post('/reg_storage', async (req, res) => {
    try {
        const CEP = req.body.prefix + "-" + req.body.sufix;
        var address = req.body.rua + "," + req.body.conc + ' '+ CEP;
        address = encodeURIComponent(address);
        const link = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAo6Nzo6UBDA2oEHjWeCAFfVqfEq-2-0S4&language=pt";
        const reply = await axios.post(link);
        if (reply.data.status !== "OK") throw new ServerError(400,"Morada inválida.");
        const coords = reply.data.results[0].geometry.location;
        const insert = await pool.query("INSERT INTO morada(userId,prefix,sufix,street,dist,conc,lat,lng) VALUES (?,?,?,?,?,?,?,?)",
        [req.body.prov,
        req.body.prefix,
        req.body.sufix,
        req.body.rua,
        req.body.dist,
        req.body.conc,
        coords.lat,
        coords.lng]).catch(err => {
            throw new ServerError(500,"Não foi possível registar a morada do utilizador. Tente mais tarde.")});
        
        const select = await pool.query("SELECT id FROM morada WHERE userId = ? ORDER BY id DESC", [req.body.prov]);
        const insert2 = await pool.query("INSERT INTO armazem(userId, morada) VALUES (?,?)", [req.body.prov, select[0][0].id]);

        return res.status(200).send({message: 'success'});
    } catch(err) {
        console.log(err);
        return res.status(500).send({message: 'fail'});
    }

});

router.post('/reg_product', async (req,res) => {
    const prov = req.body.prov;
    const existe = req.body.existe;
    const quant = req.body.quant;
    const armazem = req.body.storage;

    try {
        if (existe) {
            const prod = req.body.prod;
            const select = await pool.query("SELECT * FROM stock WHERE produ = ? AND store = ?", [prod, armazem]);
            if (select[0].length > 0) {
                const update = await pool.query("UPDATE stock SET qtty = ? WHERE id = ?",[parseInt(select[0][0].qtty) + parseInt(quant), select[0][0].id]);
            } else {
                const insert = await pool.query("INSERT INTO stock (store, produ, qtty) VALUES (?,?,?)", 
                    [armazem, prod, quant]);
            }
    
        } else {
            const prod = req.body.prod; 
            const dataprod = req.body.data;
            const preco = req.body.preco;
            const categoria = req.body.cat;
            const subcategoria = req.body.subcat;
            const insert = await pool.query("INSERT INTO produto (nome, forn, prod, catg, subcatg, preco) VALUES (?,?,?,?,?,?)", 
                [prod, prov, dataprod, categoria, subcategoria, preco]);
            const select = await pool.query("SELECT id FROM produto WHERE nome = ? AND forn = ? ORDER BY id DESC", [prod, prov]);
            const insert2 = await pool.query("INSERT INTO stock (store, produ, qtty) VALUES (?,?,?)", 
                [armazem, select[0][0].id, quant, preco]);

        }

        res.status(200).send({message: "success"});
    } catch (err) {
        console.error(err);
        res.status(500).send({message: "fail"});
    }
});

// OPERACIONAL
router.get('/products', async (req,res) => {
    var provId = req.query.pid;
    var queryString = "SELECT p.id AS id, p.nome AS nome, p.prod AS data, c.nome AS categoria, sc.nome AS subcategoria, p.preco AS preco, m.street AS armazem, s.qtty as quantidade \
                        FROM stock s, produto p, categoria c, subcategoria sc, armazem a, morada m \
                        WHERE (p.forn = ?) AND (s.produ = p.id) AND (s.store = a.id) AND (a.morada = m.id) AND (p.catg = c.id) AND (p.subcatg = sc.id) \
                        GROUP BY p.id, m.street, p.preco, s.qtty \
                        ORDER BY p.id ASC";

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
    var queryString = "SELECT enc.id AS id, u1.nome AS cons, enc.tpurchase AS data, d.transp AS transp, ed.descr AS estado, enc.total AS total \
                        FROM encomenda enc, utilizador u1, utilizador u2, despacho d, estado_despacho ed \
                        WHERE (d.forn = ?) AND (d.encom = enc.id) AND (enc.cons = u1.id) AND (d.estado = ed.id) \
                        GROUP BY enc.id, u1.nome, ed.descr, enc.total \
                        ORDER BY enc.id ASC"

    try {
        const [results,fields] = await pool.query(queryString, [provId]);
        return res.status(200).send({results: results}); 
    } catch (err) {
        console.log(err);
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

router.get('/add_transp', async (req, res) => {
    try {
        const order = req.query.id;
        const transp = req.query.transp;
        const update = await pool.query("UPDATE despacho SET transp = ? WHERE encom = ?", [transp, order]);
        const update2 = await pool.query("UPDATE despacho SET estado = 2 WHERE encom = ?", [order]);
        return res.redirect("https://ecomarket.works/provider");
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:"fail"});
    }
});

//exporta funções/"objetos"
module.exports = router ;