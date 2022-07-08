var express = require('express');
var router = express.Router();
const parser = require('../svlib/validator/parser');
const ServerError = require('../svlib/ServError/ServerError');
const pool = require('../svlib/db/getPool');

function IsTransportador(user){
    const query = "SELECT * FROM utilizador WHERE id = ?";
    const [result,garbage] = await pool.query(query,[user]).catch(err =>{
        console.error(err);
        throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
    });
    if(result.length === 0) throw new ServerError(404,"Utilizador não foi encontrado.");
    return (result[0].papel === 5);
}

router.post('/:tid/vehicles/register', async (req,res,next) => {
    const e_params = [1,{tid:{type:"number",min:1}}];
    const e_body = [5,{
        marca:{},
        ano:{},
        fuel:{},
        plate:{type:"string"}
    }];
    try {
        if (!parser(req.params, e_params)) throw new ServerError(400,"Dados fornecidos inválidos.");
        if (!parser(req.body, e_body)) throw new ServerError(400,"Dados fornecidos inválidos");
        if(!IsTransportador(req.params.tid)) throw new ServerError(403,"");
        const query ="INSERT INTO veiculo(transp,marca,ano,fuel,consumo,plate) VALUES (?,?,?,?,?)";
        const params = [
            req.params.tid, req.body.marca,req.body.ano,req.body.fuel,req.body.consu,req.body.plate
        ]
        const [results,garbage] = await pool.query(query,params).catch(err => {
            console.error(err);
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });

        res.status(200).send("O veiculo foi registado com sucesso");
    } catch (err) {
        res.status(err.code).send(err.message);
    }
});

router.get('/:tid/vehicles', async (req,res,next) => {
    const e_params = [1,{tid:{type:"number",min:1}}];
    try {
        if (!parser(req.params, e_params)) throw new ServerError(400,"Dados fornecidos inválidos.");
        const query = "SELECT "   
    } catch (err) {
        res.status(err.code).send(err.message);       
    }
});

router.get(':/tid/vehicles/:vid', async (req,res,next) => {

});

module.exports = router ;