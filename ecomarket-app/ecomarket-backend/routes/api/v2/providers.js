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
function IsFornecedor(user){
    const query = "SELECT * FROM utilizador WHERE id = ?";
    const [result,garbage] = await pool.query(query,[user]).catch(err =>{
        console.error(err);
        throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
    });
    if(result.length === 0) throw new ServerError(404,"Utilizador não foi encontrado.");
    return (result[0].papel === 3 || result[0].papel === 4);
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
        if (!parser(req.params, e_params)) throw new ServerError(400,"Dados fornecidos inválidos.");
        if (!parser(req.body, e_body)) throw new ServerError(400,"Dados fornecidos inválidos");

        if(!IsFornecedor(req.params.uid)) throw new ServerError(403,"");
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
        if (!parser(req.params, e_params)) throw new ServerError(400,"Dados fornecidos inválidos.");
        if(!IsFornecedor(req.params.uid)) throw new ServerError(403,"");
        
        const query = "SELECT a.id AS id, m.id AS mid , m.prefix AS prefix,"+
                      "m.sufix AS sufix, m.street AS street, m.conc AS conc, m.dist AS dist,"+
                      "FROM armazem a, morada m "+
                      "WHERE a.userId = ? AND m.userId = a.userId AND a.morada = m.id";

        const [results,garbage] = await pool.query(query,[req.params.uid]).catch(err =>{
            console.error(err);
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
        })
        if(results.length === 0) throw new ServerError(404,"O utilizador não tem armazens.");

        var storeArr = {}
        results.array.forEach(e => {
            const CEP = String(e.prefix)+"-"+String(e.sufix);
            const address =e.street+", "+e.conc+' '+CEP+', '+e.dist;
            storeArr[e.id] = {dono:req.params.uid,morada:address,mid:e.mid}
        });
        res.status(200).send(storeArr);
    }catch(err){
        res.status(err.code).send({ message: err.message });
    }
});

//Acrescenta um produto ao armazem, produto tem de existir na base de dados normal
router.post("/:uid/armazem/:aid/register", async (req,res,next ) => {
    const e_params = [2,{uid:{type:"number",min:1}, aid:{type:"number",min:1}}];
    const e_body = [undefined, {produ:{type:"number"},
                               qtty:{type:"number",min:1},
                               preco:{type:"number",min:0.1}}];
    try {
        if (!parser(req.params, e_params)) throw new ServerError(400,"Dados fornecidos inválidos.");
        if (!parser(req.body, e_body)) throw new ServerError(400,"Dados fornecidos inválidos.");

        if(!IsFornecedor(req.params.uid)) throw new ServerError(403,"");

        const query1 = "SELECT nome FROM produto WHERE id = ?";
        const [produto,garbage1] = await pool.query(query1,[req.body.produ]).catch(err => {
            console.error(err);
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });
        if(produto[0].length) throw new ServerError(404,"O produto submetido não existe.");

        const query2 = "INSERT INTO stock(produ,qtty,preco) VALUES (?,?,?)";
        const [inserts,garbage2] = await pool.query(query2,[]).catch(err => {
            console.error(err);
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });

        res.status(200).send(produto[0].nome+" registado no armazem "+req.params.aid+" com sucesso.");
    } catch (err) {
        res.status(err.code).send({ message: err.message });
    }
});

//Fetch storage house details and products
router.get("/:uid/armazem/:aid", async (req,res,next) => {
    const e_params = [2,{uid:{type:"number",min:1}, aid:{type:"number",min:1}}];
    try{
        if (!parser(req.params, e_params)) throw new ServerError(400,"Dados fornecidos inválidos.");
        if(!IsFornecedor(req.params.uid)) throw new ServerError(403,"");
        ArmazemExists(req.params.uid,req.params.aid);
        var reply = {
            store: null,
            prods: null
        };
        /**
         * Get Armazem
         */
         const query = "SELECT a.id AS id, m.id AS mid , m.prefix AS prefix,"+
         "m.sufix AS sufix, m.street AS street, m.conc AS conc, m.dist AS dist,"+
         "FROM armazem a, morada m "+
         "WHERE a.id = ? AND a.userId = ? AND m.userId = a.userId AND "+
         "AND a.morada = m.id,";

        const [storage, garbo1] = await pool.query(query,[req.params.aid,req.params.uid]).catch(err=>{
            console.error(err);
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });
        const a = storage[0];
        const CEP = String(a.prefix) + "-" + String(a.sufix);
        const address = a.street + ", " + a.conc + ' ' + CEP + ', ' + a.dist; 
        reply.store = {
            id: a.id,
            forn: req.params.uid,
            addr: address,
        };
        const [prods,garbo] = await pool.query("SELECT s.id AS id, s.produ AS product, s.qtty AS qtty,"+
                                " s.preco AS preco, p.nome AS nome, p.dscp AS dscp, "+
                                " p.catg AS catg, p.subcatg AS subcatg "+
                                "FROM stock s, produto p "+
                                "WHERE s.forn = ? AND s.store = ? AND s.prod = p.id",[req.params.uid,req.params.aid]).catch(err =>{
                                    console.error(err);
                                    throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");  
                                });
        reply.prods = prods;
        res.status(200).send(reply)
    } catch(err){
        res.status(err.code).send({ message: err.message });
    }
});


//Fetch all user products
router.get("/:uid/products", async (req,res,next) => {
    const e_params = [1,{uid:{type:"number",min:1}}];
    try {
        if (!parser(req.params, e_params)) throw new ServerError(400,"Dados fornecidos inválidos.");
        if(!IsFornecedor(req.params.uid)) throw new ServerError(403,"");
        const query1 =  "SELECT s.id AS id, s.produ AS product, s.qtty AS qtty,"+
                        "s.preco AS preco,s.store AS storage, p.nome AS nome, p.dscp AS dscp, "+
                        " p.catg AS catg, p.subcatg AS subcatg "+
                        "FROM stock s, produto p "+
                        "WHERE s.forn = ? AND s.prod = p.id";

        const [prods,garbo] = pool.query(query1,[req.params.uid]).catch(err => {
            console.error(err);
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde."); 
        });
        res.status(200).send(prods);
    } catch (err) {
        res.status(err.code).send({ message: err.message });  
    }
});

//Fetch a particular product
router.get("/:uid/products/:pid", async (req, res, next) => {
    const e_params = [2, { uid: { type: "number", min: 1 }, pid: { type: "number", min: 1 } }];
    try {
        if (!parser(req.params, e_params)) throw new ServerError(400, "Dados fornecidos inválidos.");
        if(!IsFornecedor(req.params.uid)) throw new ServerError(403,"");
        const query1 = "SELECT s.id AS id, s.produ AS product, s.qtty AS qtty," +
                        "s.preco AS preco,s.store AS storage, p.nome AS nome, p.dscp AS dscp, " +
                        " p.catg AS catg, p.subcatg AS subcatg " +
                        "FROM stock s, produto p " +
                        "WHERE s.forn = ? AND s.prod = p.id";

        const [prods, garbo] = pool.query(query1, [req.params.uid]).catch(err => {
            console.error(err);
            throw new ServerError(500, "Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });
    } catch (err) {
        res.status(err.code).send({ message: err.message });
    }
})

//get order
router.get('/order/:oid')

//Choose transportadora
router.post("/")

module.exports = router ;