var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
var pool = require('../svlib/db/getPool');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
/** */

//probably very useful: https://www.w3schools.com/nodejs/nodejs_mysql.asp

// router.get('register', async (req,res) =>{
//     res.status(404);
//     res.send({});
// })

router.get('/profpic/:uid', async (req,res) => {

});

// OPERACIONAL
router.get('/distritos', async (req,res) => {
    var queryString = "SELECT * FROM distrito";

    try {
        const [result,fields] = await pool.query(queryString);
        return res.status(200).send({results: result}); 
    } catch (err) {
        return res.status(500).send({message:"fail"});
    }
});

router.get('/concelhos', async (req,res) => {
    const dist = req.query.dist;
    var queryString = "SELECT id, nome FROM concelho WHERE distrito = ?";

    try {
        const [result,fields] = await pool.query(queryString, [dist]);
        return res.status(200).send({results: result}); 
    } catch (err) {
        return res.status(500).send({message:"fail"});
    }
});

router.get('/categorias', async (req,res) => {
    var queryString = "SELECT * FROM categoria \
                        ORDER BY nome ASC";

    try {
        const [result,fields] = await pool.query(queryString);
        return res.status(200).send({results: result}); 
    } catch (err) {
        return res.status(500).send({message:"fail"});
    }
});

router.get('/subcategorias', async (req,res) => {
    var cat = req.query.cat;
    var queryString = "SELECT * \
                        FROM subcategoria \
                        WHERE categoria = ? \
                        ORDER BY nome ASC";

    try {
        const [results,fields] = await pool.query(queryString, [cat]);
        return res.status(200).send({results: results}); 
    } catch (err) {
        return res.status(500).send({message:"fail"});
    }
});

router.get('/order', async (req,res) => {
    try {
        const order = req.query.id;
        const [select, fields] = await pool.query("SELECT total FROM encomenda WHERE id = ?", [order]);
        return res.status(200).send({results: select[0].total});
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'fail'});
    }
})


//exporta funções/"objetos"
module.exports = router ;