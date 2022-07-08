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
        IsConsumidor(req.params.uid);
        //cesto_compras prod references stock id. stock id references prod
        //fqtty is the quantity of product seller has
        const query = "SELECT p.nome AS nome, s.forn AS forn, s.store AS store, s.preco AS preco, c.qtty AS qtty, s.qtty AS fqtty "
                      "FROM cesto_compras c, stock s, produto p WHERE c.cons = ? AND "+
                      "s.forn = c.forn AND s.id = c.prod AND p.id = s.produ";
        const [results,garbage] = await pool.query(query,[req.params.uid]).catch(err => {
            console.error(err);
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });
        
        //Verify if user can really buy
        results.forEach(e => {
            e.invalid = e.qtty > e.fqtty;
        });

        res.send(200).send(results);
    } catch (err) {
        res.status(err.code).send(err.message);
    }
    
});


router.post('/:uid/cart', async (req,res,next)=>{
    const e_params = [1,{uid:{type:"number",min:1}}];
    const e_body = [3,{forn:{type:"number",min:1},prod:{type:"number",min:1},qtty:{type:"number",min:1}}];
    try {
        if (!parser(req.params, e_params)) throw new ServerError(400,"Dados fornecidos inválidos.");
        if (!parser(req.body, e_body)) throw new ServerError(400,"Dados fornecidos inválidos");
        IsConsumidor(req.params.uid);

        const query = "INSERT INTO cesto_compras(cons,forn,prod,qtty) VALUES (?,?,?,?)";
        const params = [req.params.uid,req.body.forn,req.body.prod,req.body.qtty];
        const[results, garbage] = await pool.query(query,params).catch(err=>{
            console.error(err);
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });

        res.status(200).send();
    } catch (err) {
        res.status(err.code).send(err.message);
    }

});

router.post('/order', async (req,res,next) => {
    const e_body = [1,{uid:{type:"number",min:1}}];
    try {
        if (!parser(req.body, e_body)) throw new ServerError(400,"Dados fornecidos inválidos");
        IsConsumidor(req.body.uid);

        //Verify if cart is valid
        const query1 = "SELECT p.nome AS nome, c.prod AS prod, c.forn AS forn, c.qtty AS qtty, s.qtty AS fqtty,"+
                       "s.preco AS preco "+
                       "FROM cesto_compras c, stock s, produto p "+
                       "WHERE c.cons = ? AND s.id = c.prod AND p.id = s.produ "+
                       ""+
                       "ORDER BY c.forn";

        const[ucart,garbo1] = await pool.query(query1,[req.body.uid]).catch(err=>{
            console.error(err);
            throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });
        console.error("debug log\nprodutos no cart são:\n");
        console.error(ucart);
        var total = 0.0;

        var fornecedores = []
        //calcula o total;
        ucart.forEach(e => {
            if(e.qtty < e.fqtty){
                total += (e.qtty * e.preco);
                if(!fornecedores.includes(e.forn)) fornecedores.push(e.forn);
            } else {
                const [results,f] = await pool.query("DELETE FROM cesto_compras WHERE cons = ? AND forn = ? and prod = ?",
                [req.body.uid, e.forn , e.prod]).catch(err =>{
                    console.error(err);
                    throw new ServerError(500,"Não foi possível concretizar ação pedida.\nTente mais tarde.");
                });
                throw new ServerError(400,e.nome+": o fornecedor não tem em stock a quantia pedida.");
            }
        });

        //Cria a encomenda
        const query2 = "INSERT INTO encomenda(cons,tpurchase,total) VALUES (?,?,?)";
        const date = new Date(Date.now());
        const formatted = date.getFullYear() + "-" + date.getMonth().toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false})
            + "-" + date.getDay().toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false});
        const params2 = [req.body.uid, formatted, total];
        const [results, garbo2] = await pool.query(query2, params2).catch(err => {
            console.error(err);
            throw new ServerError(500, "Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });
        const order = results.insertId;

        const queryd = "INSERT INTO despacho(encom,forn) VALUES (?,?)";
        //create despachos para cada fornecedor
        fornecedores.forEach(e => {
            const [results,garbo] = await pool.query(query,[order,e]).catch(err=>{
                const delet = "DELETE FROM encomenda WHERE id = ?";
                const [deleted,garbage3] = pool.query(delet,[order]);
                console.error(err);
                throw new ServerError(500, "Não foi possível concretizar ação pedida.\nTente mais tarde.");
            });
        });

        const queryp = "INSERT INTO encomenda_prods(encom,forn,prod,qtty,price) VALUES (?,?,?,?,?)";
        ucart.forEach(e => {
            const [prodinsert,garbo4] = await pool.query(queryp,[
                order,e.forn,e.prod,e.qtty,e.preco
            ]).catch(err=>{
                const delet = "DELETE FROM encomenda WHERE id = ?";
                const [deleted,garbage3] = pool.query(delet,[order]);
                console.error(err);
                throw new ServerError(500, "Não foi possível concretizar ação pedida.\nTente mais tarde.");
            });
        });

        res.status(200).send();
    } catch (err) {
        res.status(err.code).send(err.message);
    }

});

router.get('/order/:oid', async (req,res,next)=>{
    const e_params = [1,{oid:{type:"number",min:1}}]
    try {
        if (!parser(req.params, e_params)) throw new ServerError(400,"Dados fornecidos inválidos.");

        const query = "SELECT e.tpurchase AS date, e.total AS ototal, d.forn AS forn, s.descr AS dscr,"+   
                      ""+
                      //s is for status
                      "FROM encomenda e, despacho d, encomenda_prods p, estado_despacho s WHERE "+
                      " e.id = ? AND d.encom = e.id AND p.encom = e.id AND s.id = d.estado";
        const [results,fields] = await pool.query(query,[req.params.oid]).catch(err =>{
            console.error(err);
            throw new ServerError(500, "Não foi possível concretizar ação pedida.\nTente mais tarde.");
        });
        if(results.length === 0) throw ServerError(404,"Encomenda não existe.");



    } catch (err) {
        res.status(err.code).send(err.message);
    }
});

module.exports = router ;