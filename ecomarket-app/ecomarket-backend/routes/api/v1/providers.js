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
    const morada = req.body.morada;
    const cpostal = req.body.cpostal;
    const dist = req.body.dist;
    const conc = req.body.conc;
    const prov = req.body.prov;

    var queryString = "INSERT INTO localizacao (morada, c_postal, distrito, concelho) VALUES (?,?,?,?)";
    conn.query(queryString, [morada, cpostal, dist, conc], (err, result) => {
        if (err) {
            res.status(500);
            res.type('json');
            res.send({"message":"Não foi possível realizar essa operação. outpout 1"});
            return;
        }
    });

    var idloc;
    queryString = "SELECT id FROM localizacao";
    conn.query(queryString, [], (err,results) => {
        if (!err) {
            idloc = results[results.length -1].id; //por verificar
        }
    });

    queryString = "INSERT INTO armazem (localizacao) VALUES (?)";
    conn.query(queryString, [idloc], (err,result) => {
        if (err) {
            res.status(500);
            res.type('json');
            res.send({"message":"Não foi possível realizar essa operação. outpout 1"});
            return;
        }
    });

    var idsto;
    queryString = "SELECT id FROM armazem WHERE localizacao = ?";
    conn.query(queryString, [idloc], (err, result) => {
        if (!err) {
            idsto = result.id //por verificar
        } else {
            res.status(500);
            res.type('json');
            res.send({"message":"Não foi possível realizar essa operação. output 2"});
            return;
        }
    });

    queryString = "INSERT INTO lista_armazens (fornecedor, armazem) VALUES (?,?)";
    conn.query(queryString, [prov, idsto], (err, results) => {
        if (err) {
            res.status(500);
            res.type('json');
            res.send({"message":"Não foi possível realizar essa operação. outpout 1"});
            return;
        } else {
            res.status(200);
            res.type('json');
            res.send({"message":"Registo bem sucessido"});
            return;
        }
    })
});

router.post('/reg_product', (req,res) => {

});

