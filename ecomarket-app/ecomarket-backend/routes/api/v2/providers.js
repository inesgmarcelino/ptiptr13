var express = require('express');
var router = express.Router();
const multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const parser = require('../svlib/validator/parser');
const ServerError = require('../svlib/ServError/ServerError');
const pool = require('../svlib/db/getPool');

/**
 * @param {int} user 
 */
function UserExists(user){
    const query = "SELECT * FROM utilizador WHERE id = ?";
    const [result,garbage] = await pool.query(query,[user]).catch(err =>{
        console.error(err);
        throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
    });
    if(result.length === 0) throw new ServerError(404,"Utilizador não foi encontrado.");
}

/**
 * @param {*} user 
 * @param {*} morada 
 */
function MoradaExists(user,morada){
    const query = "SELECT * FROM morada WHERE id =? AND userId = ?";
    const [result,garbage] = await pool.query(query,[morada,user]).catch(err =>{
        console.log(err);
        throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
    });
    if(result.length === 0) throw new ServerError(404,"A morada não existe.");
}

/**
 * @param {*} user 
 * @param {*} armazem 
 */
function ArmazemExists(user,armazem){
    const query = "SELECT * FROM armazem WHERE id = ? AND userId = ?";
    const [result,garbage] = await pool.query(query,[armazem,user]).catch(err =>{
        console.log(err);
        throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
    });
    if(result.length === 0) throw new ServerError(404,"O armazem não existe.");
}


//Regista um armazem
router.post("/:uid/armazem/registar", async (req,res,next) => {
    const e_params = [1,{uid:{type:"number",min:1}}];
    const e_body = [1,{mid:{type:"number",min:1}}];
    try{
        if (!parser(req.params, e_params)) throw new ServerError("Dados fornecidos inválidos.");
        if (!parser(req.body, e_body)) throw new ServerError("Dados fornecidos inválidos");

        UserExists(req.params.uid);
        MoradaExists(req.params.uid,req.body.mid);
       
        const query = "INSERT INTO armazem(userId,morada) VALUES (?,?)";
        const [results,fields] = await pool.query(query,[req.params.uid,req.body.mid]).catch(err => {
            console.error(err);
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });

        res.status(200).send("Armazém foi registado com sucesso.");
    } catch (err) {
        res.status(err.code).send(err.message);
    }
});

//Fetch armazens dum utilizador
router.get("/:uid/armazens", async (req,res,next) => {
    const e_params = [1,{uid:{type:"number",min:1}}];
    try{
        if (!parser(req.params, e_params)) throw new ServerError("Dados fornecidos inválidos.");
        UserExists(req.params.uid);
        
        const query = "SELECT a.id AS id, m.id AS mid , m.prefix, m.sufix, m.street, m.conc, m.dist "+
                      "FROM armazem a, morada m "+
                      "WHERE a.userId = ? AND m.userId = a.userId AND a.morada = m.id";

        const [results,garbage] = pool.query(query,[req.params.uid]).catch(err =>{
            console.error(err);
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
        })
        if(results.length === 0) throw new ServerError(404,"O utilizador não tem armazens.");

        var storeArr = {}
        results.array.forEach(e => {
            const CEP = String(e.prefix)+"-"+String(e.sufix);
            const address =m.street+", "+m.conc+' '+CEP+', '+m.dist;
            storeArr[e.id] = {dono:req.params.uid,morada:address,mid:e.mid}
        });
        res.status(200).send(storeArr);
    }catch(err){
        res.status(err.code).send({ message: err.message });
    }
});



router.get("/:uid/armazem/:aid", async (req,res,next) => {
    const e_params = [2,{uid:{type:"number",min:1}, aid:{type:"number",min:1}}];
    try{
        if (!parser(req.params, e_params)) throw new ServerError("Dados fornecidos inválidos.");
        UserExists(req.params.uid);
        ArmazemExists(req.params.uid,req.params.aid);
        var reply = {
            armazem: null,
            products: null
        };

    } catch(err){
        res.status(err.code).send({ message: err.message });
    }
});

module.exports = router ;