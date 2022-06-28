var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
var pool = require('../svlib/db/getPool');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
/** */

//probably very useful: https://www.w3schools.com/nodejs/nodejs_mysql.asp

router.post('/adminLogin', (req, res) => {
    const email = req.body.email;
    const pwd = req.body.pwd;

    console.log(email,pwd);

    if (email !== "admin@ecomarket.pt") {
        console.log(email + " não pertence ao Adminstrador.");
        return res.status(404).send({message:"no email"});
    }

    const queryString = "SELECT pass_word from utilizador WHERE email = ?";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [email], (err, results) => {
            conn.release();

            if (!err) {
                if (results.length > 0) {
                    if (results[0].pass_word === pwd) {
                        console.log("Admin autenticado");
                        return res.status(200).send({message:"success"});
                    } else {
                        console.log("Não foi possível autenticar o admin.");
                        return res.status(401).send({message:"fail"});
                    }
                } else {
                    console.log(email + " não pretence ao Adminstrador.");
                    return res.status(404).send({message:"no email"});
                }
            } else {
                console.log("Não foi possível realizar essa operação. output 1");
                return res.status(500).send({message:"fail"});
            }
        });
    });

});

router.post('/admintipo', (req,res) => {
    var tipo = req.body.newtipo;
    var queryString ="INSERT INTO tipo_produto (nome) VALUES (?)";
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [tipo], (err, result) => {
            conn.release();

            if (err) {
                console.log("Não foi possível realizar essa operação. output 2");
                return res.status(500).send({message:"fail"});
            } else {
                console.log("Registo bem sucessido");
                return res.status(200).send({message:"success"});
            }
        });
    });
});


// router.get('/adminadd', (req, res) => {
//     var tab = req.params.tab; //tipo ou subtipo
//     var nome = req.params.nome;
//     var message;

//     pool.getConnection((err,conn) => {
//         if (err) throw err;

//         if (tab === "tipo") {
//             const queryString = "INSERT INTO tipo_produto VALUES (nome) VALUES (?)";
//             conn.query(queryString, [nome], (err, result) => {
//                 conn.release();

//                 if (err) {
//                     res.status(500);
//                     res.type('json');
//                     res.send({"message":"Não foi possível realizar essa operação. output 2"});
//                     connection.release();
//                     return;
//                 } else {
//                     res.status(200);
//                     message = "Novo tipo adicionado.";
//                 }
//             });
    
//         } else if (tab === "subtipo") {
//             var mae = req.params.mae; //tipo
//             const queryString = "INSERT INTO subtipo_produto VALUES (nome) VALUES (?)";
//             conn.query(queryString, [nome], (err,result) => {
//                 if (err) {
//                     conn.release();

//                     res.status(500);
//                     res.type('json');
//                     res.send({"message":"Não foi possível realizar essa operação. output 3"});
//                     connection.release();
//                     return;
//                 }
//             });
    
//             queryString = "SELECT id from subtipo_produto WHERE nome = ?";
//             var id;
//             conn.query(queryString, [nome], (err, results) => {
//                 if (!err) {
//                     id = results.id;
//                 } else {
//                     conn.release();

//                     res.status(500);
//                     res.type('json');
//                     res.send({"message":"Subtipo não se encontra na base de dados"});
//                     return;
//                 }
//             });
    
//             queryString = "INSERT INTO tipo_subtipo VALUES (?,?)";
//             conn.query(queryString, [mae, id], (err,result) => {
//                 if (err) {
//                     conn.release();

//                     res.status(500);
//                     res.type('json');
//                     res.send({"message":"Não foi possível realizar essa operação. output 4"});
//                     return;
//                 } else {
//                     res.status(200);
//                     message = "Novo subtipo adicionado."
//                 }
//             });
//         }
//     });
//     res.type('json');
//     res.send({"message": message});
// });

router.get('/edit/:uid', (req, res, next) => {
    const id = req.params.uid;
    const nome = req.body.nome;
    const email = req.body.email;
    const nif = req.body.nif;
    const tlm = req.body.tlm;
    // const image = req.body.image;
    const pwd = req.body.pwd;
    const morada = req.body.morada;

    const queryString = "UPDATE utilizador SET nome = ?, email = ?, nif = ?, telemovel = ?\
                                                pass_word = ?, morada = ? WHERE id = ?";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [nome,email,nif,tlm,pwd,morada,id], (err, results) => {
            conn.release();
            if (err) {
                res.status(500);
                res.type('json');
                res.send({"message":"Não foi possível realizar essa operação. output 5"});
                return;
            } else {
                res.status(200);
                res.type('json');
                res.send({"message":"Alterações guardadas."});
            }
        });
    });
});

router.get('/cons', async (req,res) => {

    var queryString = "SELECT u.* \
                        FROM utilizador u, consumidor c \
                        WHERE (c.utilizador = u.id) and not (u.email = 'admin@ecomarket.pt')";

    try{
        const result = await pool.query(queryString);     
        return res.status(200).send({results:result});
    } catch(err){
        console.log(err);
        return res.status(500).send({message:"fail"});
    }
});

router.get('/prov', (req,res) => {
    var queryString = "SELECT u.* \
                        FROM utilizador u, fornecedor f \
                        WHERE (f.utilizador = u.id) and not (u.email = 'admin@ecomarket.pt')";

    pool.getConnection((err,conn) => {
        if (err) throw err;

        conn.query(queryString, (err,results) => {
            conn.release();

            if (!err) {
                return res.status(200).send({results:results});
            } else {
                console.log("Não foi possível realizar essa operação. output 6");
                return res.status(500).send({message:"fail"});
            }
        });
    });
});

router.get('/transp', (req,res) => {
    var queryString = "SELECT u.* \
                        FROM utilizador u, transportador t \
                        WHERE (t.utilizador = u.id) and not (u.email = 'admin@ecomarket.pt')";

    pool.getConnection((err,conn) => {
        if (err) throw err;

        conn.query(queryString, (err,results) => {
            conn.release();

            if (!err) {
                return res.status(200).send({results:results});
            } else {
                console.log("Não foi possível realizar essa operação. output 6");
                return res.status(500).send({message:"fail"});
            }
        });
    });
});

//exporta funções/"objetos"
module.exports = router ;
