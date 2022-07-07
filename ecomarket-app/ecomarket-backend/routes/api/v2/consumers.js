var express = require('express');
var router = express.Router();
const parser = require('../svlib/validator/parser');
const ServerError = require('../svlib/ServError/ServerError');
const pool = require('../svlib/db/getPool');

function IsConsumidor(user){
    const query = "SELECT * FROM utilizador WHERE id = ?";
    const [result,garbage] = await pool.query(query,[user]).catch(err =>{
        console.error(err);
        throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
    });
    if(result.length === 0) throw new ServerError(404,"Utilizador não foi encontrado.");
    return (result[0].papel === 2 || result[0].papel === 4);
}

router.get('/:uid/cart', async (req,res,next) => {
    const e_params = [1,{uid:{type:"number"}}];
    try {
        if (!parser(req.params, e_params)) throw new ServerError(400,"Dados fornecidos inválidos.");

        //cesto_compras prod references stock id. stock id references prod
        //fqtty is the quantity of product seller has
        const query = "SELECT p.nome AS nome, s.forn AS forn, s.store AS store, s.preco AS preco, c.qtty AS qtty, s.qtty AS fqtty "
                      "FROM cesto_compras c, stock s, produto p WHERE c.cons = ? AND "+
                      "s.forn = c.forn AND s.id = c.prod AND "+
                      "";
        const [results,garbage] = await pool.query(query,[req.params.uid]).catch(err => {
            console.error(err);
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });

        results.forEach(e => {
            //verify if quantity is right
        });

        res.send(200).send();
    } catch (err) {
        res.status(err.code).send(err.message);
    }
    
});

router.post('/:uid/cart', async (req,res,next)=>{
    const e_params = [1,{uid:{type:"number"}}];
    const e_body = [1,{uid:{type:"number"}}];
    try {
        if (!parser(req.params, e_params)) throw new ServerError(400,"Dados fornecidos inválidos.");
        if (!parser(req.body, e_body)) throw new ServerError(400,"Dados fornecidos inválidos");
    } catch (err) {
        res.status(err.code).send(err.message);
    }

});

router.post('/order', async (req,res,next) => {
    const e_body = [1,{uid:{type:"number"}}];
    try {
        if (!parser(req.body, e_body)) throw new ServerError(400,"Dados fornecidos inválidos");
        
    } catch (err) {
        res.status(err.code).send(err.message);
    }

});

module.exports = router ;