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
        const [rows, fields] = await pool.query(queryString);
        return res.status(200).send({results: rows}); 
    } catch (err) {
        return res.status(500).send({message:"fail"});
    }
});

router.get('/concelhos', async (req,res) => {
    const dist = req.query.dist;
    var queryString = "SELECT id, nome FROM concelho WHERE distrito = ?";

    try {
        const [rows, fields] = await pool.query(queryString, [dist]);
        return res.status(200).send({results: rows}); 
    } catch (err) {
        return res.status(500).send({message:"fail"});
    }
});

router.get('/tipos', async (req,res) => {
    var queryString = "SELECT * FROM tipo_produto";

    try {
        const [rows, fields] = await pool.query(queryString);
        return res.status(200).send({results: rows}); 
    } catch (err) {
        return res.status(500).send({message:"fail"});
    }
});

router.get('/subtipos', async (req,res) => {
    var tip = req.query.tipo;
    var queryString = "SELECT subtipo_produto.* FROM tipo_subtipo, subtipo_produto WHERE tipo_subtipo.tipo = ? AND subtipo_produto.id = tipo_subtipo.subtipo";

    try {
        const [rows, fields] = await pool.query(queryString, [tip]);
        return res.status(200).send({results: rows}); 
    } catch (err) {
        return res.status(500).send({message:"fail"});
    }
});


//exporta funções/"objetos"
module.exports = router ;