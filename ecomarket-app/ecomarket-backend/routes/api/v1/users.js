var express = require('express');
var router = express.Router();
const multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const axios = require('axios');


// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
var pool = require('../svlib/db/getPool');

/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
/** */

//probably very useful: https://www.w3schools.com/nodejs/nodejs_mysql.asp

// router.get('register', async (req,res) =>{
//     res.status(404);
//     res.send({});
// })


router.post('/register', (req, res, next) => {
    try {
        if(!req.body.trans && !req.body.cons && !req.body.forn) throw new Error("Utilizador deve ter um tipo");
        console.error(req.body);
        /** Meter aqui correção dos dados do utilizador */
        var papel;
        if(req.body.trans) papel = 5;
        if(req.body.cons ) papel = 2;
        if(req.body.forn) papel = 3
        if(req.body.cons && req.body.forn) papel =4;

        const CEP = req.body.prefix + "-" + req.body.sufix;
        var address = req.body.rua + "," + req.body.conc + ' '+ CEP;
        address = encodeURIComponent(address);
        const link = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAo6Nzo6UBDA2oEHjWeCAFfVqfEq-2-0S4&language=pt";
        const reply = await axios.post(link);
        if (reply.data.status !== "OK") throw new Error("Morada inválida.");
        const coords = reply.data.results[0].geometry.location;
        const registo = await axios.post('https://ecomarket.eu.auth0.com/dbconnections/signup',
            {
                client_id: '8d3hjpCHdNoQWDGJk2g4MNSeGNPZZs5R',
                connection: 'Username-Password-Authentication',
                email: req.body.email,
                password: req.body.passwd,
                name: req.body.nome,
                picture: "https://digimedia.web.ua.pt/wp-content/uploads/2017/05/default-user-image.png",
                user_metadata: {
                    nif: req.body.nif,
                    tlm: req.body.tlm,
                    papel: papel
                    //papel: req.body.papel
                }
            }, {
            headers: {
                'content-type': 'application/json'
            }
        }).catch(err=>{
            console.error(err);
            throw new Error("Não foi possivel registar.");
        });

        const [users, field] = await pool.query("SELECT id FROM utilizador WHERE email = ?", [req.body.email]);

        const [concelho,fields] = await pool.query("SELECT id, distrito FROM concelho WHERE nome=?",[req.body.conc]);

        const insert = await pool.query("INSERT INTO morada(userId,prefix,sufix,street,dist,conc,lat,lng) VALUES (?,?,?,?,?,?,?,?)",
        [users[0].id,
        req.body.prefix,
        req.body.sufix,
        req.body.rua,
        concelho[0].distrito,
        concelho[0].id,
        coords.lat,
        coords.lng]).catch(err => {
            console.error(err);
            throw new Error("Error");
        });
    
            res.status(200).send({ message: "success" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "fail" });
    }
});



router.get('/:uid', async (req,res) => {
    var userId = req.params.uid;
    var queryString = "SELECT * FROM utilizador WHERE id = ?";

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(queryString, [userId], (err, rows) =>  {
            conn.release();

            if (!err) {
                if(rows.length > 0){
                    return res.status(200).send({message:"success", results: rows});
                } else {
                    console.log("Utilizador não se encontra na base de dados");
                    return res.status(404).send({message:"no email"});
                }
            } else {
                console.log("Não foi possível realizar essa operação. output 6");
                return res.status(500).send({message:"fail"});
            }
        });
    });
});

router.delete('/delete/:uid', async (req,res) => {
    var userId = req.params.uid;
    var queryString = "DELETE FROM utilizador WHERE id = ?";

    pool.getConnection((err,conn) => {
        if (err) throw err;

        conn.query(queryString, [userId], (err, results) =>  {
            conn.release();

            if (!err) {
                if(results.length > 0){
                    console.log("Utilizador removido com sucesso");
                    return res.status(200).send({message:"success"});
                } else {
                    console.log("Utilizador não se encontra na base de dados");
                    return res.status(404).send({message:"fail"});
                }
            } else {
                console.log("Não foi possível realizar essa operação. output 7");
                return res.status(500).send({message:"fail"});
            }
        });
    });
});

router.put('/edit/:uid', async (req,res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const tlm = req.body.tlm;
    const nif = req.body.nif;
    /* const morada = req.body.morada; */
    const pwd = req.body.pwd;
    
    var queryString = "UPDATE utilizador SET ";
    if (nome !== '') {
        queryString += "nome = '" + nome + "' ";
    }

    if (email !== '') {
        if ('=' in queryString) {
            queryString += "AND email = '" + email + "' ";
        } else {
            queryString += "email = '" + email + "' ";
        }
    }

    if (tlm !== '') {
        if ('=' in queryString) {
            queryString += "AND telemovel = " + tlm + " ";
        } else {
            queryString += "telemovel = " + tlm + " ";
        }
    }

    /* if (morada !== '') {
        if ('=' in queryString) {
            queryString += "AND morada = '" + morada + "' ";
        } else {
            queryString += "morada = '" + morada + "' ";
        }
    } */

    if (nif !== '') {
        if ('=' in queryString) {
            queryString += "AND nif = '" + nif + "' ";
        } else {
            queryString += "nif = '" + nif + "' ";
        }
    }

    if (pwd !== '') {
        if ('=' in queryString) {
            queryString += "AND pass_word = '" + pwd + "' ";
        } else {
            queryString += "pass_word = '" + pwd + "' ";
        }
    }

    var userId = req.params.uid;
    queryString += "WHERE id = " +  userId;
    try{
        const [rows,fields] = await pool.query(queryString);
        if(rows.length > 0){
            console.log("Utilizador atualizado com sucesso");
            return res.status(200).send({message:"success"});
        } else {
            console.log("Utilizador não se encontra na base de dados");
            return res.status(404).send({message:"fail"});
        }
    } catch(err){
        console.log(err);
        return res.status(500).send({message:"fail"});
    }
    
});
/*
router.post('/uploadProfPic', async (req,res) => {
    const filename = req.body.filename;
    var queryString = "INSERT INTO image (filename) VALUES (?)";

    pool.getConnection((err,conn) => {
        if (err) throw err;

        conn.query(queryString, (err, results) => {
    
            if (!err) {
                queryString = "SELECT id FROM image";
                conn.query(queryString, (err, results) => {
                    conn.release();

                    if (!err) {
                        console.log("Imagem descarregada com sucesso");
                        return res.status(200).send({message: results[results.size -1].id})
                    }
                })
            } else {
                console.log("Não foi possível realizar essa operação. output 9");
                return res.status(500).send({message:"fail"});
            }
        });
    });
});

*/


// um user que seja só consumidor ou só fornecedor pode se tornar também fornecedor ou consumidor...


//exporta funções/"objetos"
module.exports = router ;
