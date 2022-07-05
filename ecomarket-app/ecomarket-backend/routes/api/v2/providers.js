var express = require('express');
var router = express.Router();
const multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const parser = require('../svlib/validator/parser');
const ServerError = require('../svlib/ServError/ServerError');
const pool = require('../svlib/db/getPool');

router.post("/:uid/armazem/registar", async (req,res,next) => {
    const e_params = [1,{uid:{type:"number",min:1}}];
    const e_body = [1,{mid:{type:"number",min:1}}];
    try{
        if (!parser(req.params, e_params)) throw new ServerError("Dados fornecidos inválidos.");
        if (!parser(req.body, e_body)) throw new ServerError("Dados fornecidos inválidos");
        const query1 = "SELECT * FROM utilizador WHERE id = ?";
        const [uquery,gb1] = await pool.query(query1,[req.params.uid]).catch(err =>{
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });
        if(uquery.length === 0) throw new ServerError(404,"Utilizador não foi encontrado.");
        
        const query2 = "SELECT * FROM morada WHERE id =? AND userId = ?";
        const [aquery,gb2] = await pool.query(query2,[req.body.mid,req.body.uid]).catch(err =>{
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });
        if(aquery.length === 0) throw new ServerError(404,"A morada não existe.");

        const query = "INSERT INTO armazem(userId,morada) VALUES (?,?)";
        const [results,fields] = await pool.query(query,[req.params.uid,req.body.mid]).catch(err => {
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });

        res.status(200).send("Armazém foi registado com sucesso.");
    } catch (err) {
        res.status(err.code).send(err.message);
    }
});

router.get("/:uid/armazem")

module.exports = router ;