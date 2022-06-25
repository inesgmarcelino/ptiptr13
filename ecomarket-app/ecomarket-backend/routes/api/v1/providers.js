var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
var pool = require('../svlib/db/getPool');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
const { query } = require('../svlib/db/getPool');
const { response } = require('express');

router.post('/reg_storage', (req,res) => {
    const morada = req.body.morada;
    const cpostal = req.body.codpostal;
    const dist = req.body.dist;
    const conc = req.body.conc;
    const prov = req.body.email;

    var queryString = "SELECT utilizador.id FROM utilizador, fornecedor WHERE utilizador.email = ? AND utilizador.id = fornecedor.utilizador";
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [prov], (err,result) => {
            if (!err) {
                var idprov = result[0].id;

                queryString = "INSERT INTO localizacao (morada, c_postal, distrito, concelho) VALUES (?,?,?,?)";
                conn.query(queryString, [morada, cpostal, dist, conc], (err, result) => {
                    if (err) {
                        conn.release();

                        console.log("Não foi possível realizar essa operação. output 1");
                        return res.status(500).send({message:"fail"});
                    }
                });
    
                queryString = "SELECT id FROM localizacao";
                conn.query(queryString, (err,results) => {
                    if (!err) {
                        var idloc = results[results.length -1].id; //por verificar

                        queryString = "INSERT INTO armazem (localizacao) VALUES (?)";
                        conn.query(queryString, [idloc], (err,result) => {
                            if (err) {
                                conn.release();

                                console.log("Não foi possível realizar essa operação. output 2");
                                return res.status(500).send({message:"fail"});
                            }
                        });
                
                        queryString = "SELECT id FROM armazem WHERE localizacao = ?";
                        conn.query(queryString, [idloc], (err, result) => {
                            if (!err) {
                                var idsto = result[result.length - 1].id //por verificar

                                queryString = "INSERT INTO lista_armazens (fornecedor, armazem) VALUES (?,?)";
                                    conn.query(queryString, [idprov, idsto], (err, results) => {
                                        conn.release();
                                        
                                        if (err) {
                                            console.log("Não foi possível realizar essa operação. output 3");
                                            return res.status(500).send({message:"fail"});
                                        } else {
                                            console.log("Registo bem sucessido");
                                            return res.status(200).send({message:"success"});
                                        }
                                    });
                                } else {
                                    conn.release();

                                    console.log("Não foi possível realizar essa operação. output 4");
                                    return res.status(500).send({message:"fail"});
                                }
                        });

                    } else {
                        conn.release();

                        console.log("Não foi possível realizar essa operação. output 5");
                        return res.status(500).send({message:"fail"});
                    }
                });
            } else {
                conn.release();

                console.log("Não foi possível realizar essa operação. output 6");
                return res.status(500).send({message:"fail"});
            }
        })
    });
});

router.post('/reg_product', (req,res) => {
    const prov = req.body.id;
    const nome = req.body.nome;
    const dataprod = req.body.dataprod;
    const preco = req.body.preco;
    const tipo = req.body.tipo;
    const subtipo = req.body.subtipo;
    queryString = "INSERT INTO produto (nome, fornecedor, producao, preco, tipo, subtipo) VALUES (?,?,?,?,?,?,?)";
    pool.getConnection((err, conn) => {
        conn.query(queryString, [nome, prov, dataprod, preco, tipo, subtipo, idcad], (err, result) => {
            conn.release();
            
            if(!err){
                console.log("Registo bem sucessido");
                return res.status(200).send({message:"success"});
            } else {
                console.log("Não foi possível realizar essa operação. output 7");
                return res.status(500).send({message:"fail"});
            }
        });
    });
    
    // pool.getConnection((err, conn) => {
    //     if (err) throw err;

    //     conn.query(queryString, [nomerec, medida, quant], (err, result) => {
    //         if (err) {
    //             conn.release();

    //             res.status(500);
    //             res.type('json');
    //             res.send({"message":"Não foi possível realizar essa operação. output 7"});
    //             return;
    //         }
    //     });
    
    //     var idrec;
    //     queryString = "SELECT id FROM recurso";
    //     conn.query(queryString, [], (err,results) => {
    //         if (!err) {
    //             idcad = results[results.length -1].id; //por verificar
    //         } else {
    //             conn.release();
                
    //             res.status(500);
    //             res.type('json');
    //             res.send({"message":"Não foi possível realizar essa operação. output 8"});
    //             return;
    //         }
    //     });
    
    //     const pol = req.body.pol;
    //     queryString = "INSERT INTO poluicao (nome) VALUES (?)";
    //     conn.query(queryString, [pol], (err, result) => {
    //         if (err) {
    //             conn.release();

    //             res.status(500);
    //             res.type('json');
    //             res.send({"message":"Não foi possível realizar essa operação. output 9"});
    //             return;
    //         }
    //     });
    
    //     var idpol;
    //     queryString = "SELECT id FROM poluicao";
    //     conn.query(queryString, [], (err,results) => {
    //         if (!err) {
    //             idpol = results[results.length -1].id; //por verificar
    //         } else {
    //             conn.release();
                
    //             res.status(500);
    //             res.type('json');
    //             res.send({"message":"Não foi possível realizar essa operação. output 10"});
    //             return;
    //         }
    //     });
    
    //     queryString = "INSERT INTO cadeia_logistica";
    //     conn.query(queryString, [], (err,result) => {
    //         if (err) {
    //             conn.release();

    //             res.status(500);
    //             res.type('json');
    //             res.send({"message":"Não foi possível realizar essa operação. output 11"});
    //             return;
    //         }
    //     });
    
    //     var idcad;
    //     queryString = "SELECT id FROM cadeia_logistica";
    //     conn.query(queryString, [], (err,results) => {
    //         if (!err) {
    //             idcad = results[results.length -1].id; //por verificar
    //         } else {
    //             conn.release();
                
    //             res.status(500);
    //             res.type('json');
    //             res.send({"message":"Não foi possível realizar essa operação. output 12"});
    //             return;
    //         }
    //     });
    
    //     queryString = "INSERT INTO lista_recursos (cadeia_logis, recurso) VALUES (?,?)";
    //     conn.query(queryString, [idcad, idrec], (err,result) => {
    //         if (err) {
    //             conn.release();

    //             res.status(500);
    //             res.type('json');
    //             res.send({"message":"Não foi possível realizar essa operação. output 13"});
    //             return;
    //         }
    //     });
    
    //     const quantpol = req.body.qtpol;
    //     queryString = "INSERT INTO poluicao_cadeia (cadeia_logis, poluicao, quantidade) VALUES (?,?,?)";
    //     conn.query(queryString, [idcad, idpol, quantpol], (err,result) => {
    //         if (err) {
    //             conn.release();

    //             res.status(500);
    //             res.type('json');
    //             res.send({"message":"Não foi possível realizar essa operação. output 14"});
    //             return;
    //         }
    //     });
    
    //     const prov = req.body.id;
    //     const nome = req.body.nome;
    //     const dataprod = req.body.dataprod;
    //     const preco = req.body.preco;
    //     const tipo = req.body.tipo;
    //     const subtipo = req.body.subtipo;
    //     queryString = "INSERT INTO produto (nome, fornecedor, producao, preco, tipo, subtipo, cadeia_logis) \
    //                                 VALUES (?,?,?,?,?,?,?)";
    //     conn.query(queryString, [nome, prov, dataprod, preco, tipo, subtipo, idcad], (err, result) => {
    //         conn.release();
            
    //         if(!err){
    //             res.status(200);
    //             res.type('json');
    //             res.send({"message":"Registo bem sucessido"});
    //             return;
    //         } else {
    //             res.status(500);
    //             res.type('json');
    //             res.send({"message":"Não foi possível realizar essa operação. output 15"});
    //             return;
    //         }
    //     });
    // });
});

router.put('/product/', (req,res) => {
    
})

router.get('/orders/:pid', (req,res) => {
    var provId = req.params.pid;
    var queryString = "SELECT encomenda FROM lista_encomendas WHERE fornecedor = ?";
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [provId], (err, results) =>{ 
            if (!err) {
                results.forEach(enc => {
                    queryString = ""; //por acabar
                });
            } else {
                conn.release();

                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 16"});
            }
        });
    });
});

//exporta funções/"objetos"
module.exports = router ;