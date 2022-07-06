var express = require('express');
var router = express.Router();
const parser = require('../svlib/validator/parser');
const ServerError = require('../svlib/ServError/ServerError');
const pool = require('../svlib/db/getPool');


//assumimos que não se pode registar produtos maliciosamente
// Não é qualquer um que se pode registar como fornecedor/vendedor

//implementar auth na route mais tarde mais tarde

router.post('/register', async (req,res,next) => {
    const expected = [4, {nome:{type:"string", max_len:100},
                          dscp:{type:"string", max_len:340},
                          catg:{type:"number"},
                          subcatg:{type:"number"}}];
    try {
        if (!parser(req.body, expected)) throw new ServerError(400,"Dados fornecidos inválidos.");
        const query = "INSERT INTO produto(nome,dscp,catg,subcatg) VALUES (?,?,?,?)";
        const [results,garbage] = await pool.query(query,[]).catch(err => {
            console.error(err);
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });
        res.status(200).send("Produto registado com sucesso!");
    } catch (err) {
        res.status(err.code).send(err.message);
    }

});

/*
router.get('/:pid', async (req,res,nex) => {
    const expected = [1, {pid:{type:"number",min:0}}];
    try{
        if (!parser(req.params, expected)) throw new ServerError(400,"Dados fornecidos inválidos.");
        const query = "SELECT nome,dscp,catg"
    }catch(err){
        res.status(err.code).send(err.message);
    }

});*/

module.exports = router ;