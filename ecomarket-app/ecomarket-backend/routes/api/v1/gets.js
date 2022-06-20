var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
var pool = require('../svlib/db/getPool');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
/** */

//probably very useful: https://www.w3schools.com/nodejs/nodejs_mysql.asp

// router.get('register', (req,res) =>{
//     res.status(404);
//     res.send({});
// })

router.get('/profpic/:uid', (req,res) => {

});

router.get('/distritos', (req,res) => {
    var queryString = "SELECT * FROM distrito";
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, (err, results) => {
            conn.release();

            if (!err) {
                return res.status(200).send({results: results});
            } else {
                console.log("Não foi possível realizar essa operação. output 1");
                return res.status(500).send({message:"fail"});
            }
        });
    })
});

router.get('/concelhos', (req,res) => {
    var queryString = "SELECT id, nome FROM concelho WHERE distrito = ?";
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [req.body.dist], (err, results) => {
            conn.release();

            if (!err) {
                return res.status(200).send({results: results});
            } else {
                console.log("Não foi possível realizar essa operação. output 2");
                return res.status(500).send({message:"fail"});
            }
        });
    })
});


//exporta funções/"objetos"
module.exports = router ;