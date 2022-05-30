var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
// var pool = require('../svlib/db/getPool');
var conn = require('../svlib/db/connect-ines');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
const { query } = require('../svlib/db/getPool');
const { response } = require('express');

router.post('/reg_storage', (req,res) => {
    const loc = req.body.loc;

    var queryString = "INSERT INTO armazem (localizacao) VALUES (?)";
    conn.query(queryString, [loc], (err,result) => {
        if (err) {
            res.status(500);
            res.type('json');
            res.send({"message":"Não foi possível realizar essa operação. outpout 1"});
            return;
        } else {
            res.status(200);
            res.type('json');
            res.send({"message":"Registado com sucesso"})
        }
    })
});

router.post('/reg_product', (req,res) => {

});

