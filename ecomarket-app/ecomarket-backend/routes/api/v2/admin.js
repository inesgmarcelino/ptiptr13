var express = require('express');
var router = express.Router();
const parser = require('../svlib/validator/parser');
const ServerError = require('../svlib/ServError/ServerError');
const pool = require('../svlib/db/getPool');

router.get('/cons', async (req,res) => {
    try {
        const [rows, fields] = await pool.query("SELECT * FROM utilizador WHERE (papel = 2) OR (papel = 4) ORDER BY id ASC")
        return res.status(200).send({results: rows});
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'fail'});
    }
});

router.get('/prov', async (req,res) => {
    try {
        const [rows, fields] = await pool.query("SELECT * FROM utilizador WHERE (papel = 3) OR (papel = 4) ORDER BY id ASC")
        return res.status(200).send({results: rows});
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'fail'});
    }
});

router.get('/transp', async (req,res) => {
    try {
        const [rows, fields] = await pool.query("SELECT * FROM utilizador WHERE (papel = 5) ORDER BY id ASC")
        return res.status(200).send({results: rows});
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'fail'});
    }
});

router.post('/addCat', async (req,res) => {
    try {
        const nome = req.body.cat;
        const insert = await pool.query("INSERT INTO categoria (nome) VALUES (?)", [nome]);
        return res.status(200).send({message: 'success'});
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'fail'});
    }
});

router.post('/addSubcat', async (req,res) => {
    try {
        const cat = req.body.cat;
        const nome = req.body.subcat;
        const insert = await pool.query("INSERT INTO subcategoria (nome, categoria) VALUES (?,?)",[nome, cat]);
        return res.status(200).send({message: 'success'});
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'fail'});
    }
})

module.exports = router ;