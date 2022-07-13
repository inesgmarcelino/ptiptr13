var express = require('express');
var router = express.Router();
var pool = require('../svlib/db/getPool');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
//const { query } = 
const { response } = require('express');

router.get('/', async (req,res) => {
    try {
        const id = req.query.cons;
        const [results, fields] = await pool.query("SELECT p.id AS id, p.nome AS nome, cc.qtty AS quantidade, p.preco AS preco \
                                                    From produto p, cesto_compras cc \
                                                    WHERE (cc.cons = ?) AND (cc.prod = p.id)", [id]);
        return res.status(200).send({results: results});
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'fail'});
    }
});

router.get('/delete/prod', async (req,res) => {
    try {
        const id = req.query.cons;
        const prod = req.query.prod;
        const deleting = await pool.query("DELETE FROM cesto_compras WHERE (cons = ?) AND (prod = ?)", [id,prod]);
        return res.redirect("https://ecomarket.works/cart");
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'fail'});
    }
})


//exporta funções/"objetos"
module.exports = router ;