var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
// var pool = require('../svlib/db/getPool');
var pool = require('../svlib/db/connection');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
const { query } = require('../svlib/db/getPool');
const { response } = require('express');

router.get('/:cid', (req,res) => {
    const cid = req.params.cid;
    var queryString = "SELECT * FROM produto WHERE tipo = ?";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [cid], (err, rows) => {
            conn.release();

            if (err) {
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 1"});
                return;
            } else {
                // por acabar
            }
        });
    });
});

router.get('/:pid', (req,res) => {
    const pid = req.params.pid;
    var queryString = "SELECT * FROM produto WHERE id = ?";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [pid], (err, rows) => {
            conn.release();

            if (err) {
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 2"});
                return;
            } else {
                // por acabar
            }
        });
    });
});

router.get('/:pname', (req,res) => {
    const pname = req.params.pname;
    var queryString = "SELECT * FROM produto WHERE nome = '%?%'";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [pname], (err, rows) => {
            conn.release();
            
            if (err) {
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 3"});
                return;
            } else {
                // por acabar
            }
        });
    });
});