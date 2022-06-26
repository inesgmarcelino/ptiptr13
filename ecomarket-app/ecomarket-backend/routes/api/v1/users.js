var express = require('express');
var router = express.Router();
const multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const axios = require('axios');
const escaper = require('querystring');

// https://stackoverflow.com/questions/62134713/nodejs-mysql-connection-best-practice
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
var pool = require('../svlib/db/getPool');

/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
/** */

//probably very useful: https://www.w3schools.com/nodejs/nodejs_mysql.asp

// router.get('register', (req,res) =>{
//     res.status(404);
//     res.send({});
// })


router.post('/register', (req, res, next) => {
    try {
        if(!req.body.trans && !req.body.cons && !req.body.forn) throw new Error("Utilizador deve ter um tipo");
        console.error(req.body);
        /** Meter aqui correção dos dados do utilizador */
        const reply = axios.post('https://ecomarket.eu.auth0.com/dbconnections/signup',
            {
                client_id: '8d3hjpCHdNoQWDGJk2g4MNSeGNPZZs5R',
                connection: 'Username-Password-Authentication',
                email: req.body.email,
                password: req.body.pwd,
                name: req.body.nome,
                picture: "https://digimedia.web.ua.pt/wp-content/uploads/2017/05/default-user-image.png",
                user_metadata: {
                    nif: req.body.nif,
                    tlm: req.body.tlm,
                    morada: req.body.morada
                }
            }, {
            headers: {
                'content-type': 'application/json'
            }
        }).then(async function (response) {
            var id = await pool.query("SELECT id FROM utilizador WHERE email = ?", [req.body.email]);
            id = id[0][0].id;
            if (req.body.trans) {
                var address = escaper.escape(req.body.morada);
                address = address.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                const location = await axios.post("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAo6Nzo6UBDA2oEHjWeCAFfVqfEq-2-0S4&language=pt");
                if (location.results.status !== "OK") throw new Error("Location Invalid");
                var parts = {};
                for (var element in location.results.address_components) {
                    var key;
                    if (element.types.length > 1) {
                        key = element.types[0] === "political" ? element.types[1] : element.types[0];
                    } else {
                        key = element.types[0];
                    }
                    parts[key] = element.long_name;
                }
                const concid = await pool.query("SELECT id, distrito FROM concelho WHERE nome=?"[parts.locality]);
                if (concid[0][0].length == 0) throw new Error("concelho not found");
                const insert = await pool.query("INSERT INTO localizacao(rua, c_postal, distrito, concelho, lati, long) VALUES (?,?,?,?,?,?)",
                    [parts.route + " " + parts.street_number,
                    parts.postal_code,
                    concid[0][0].distrito,
                    concid[0][0].id,
                    location.results.geometry.location.lat,
                    location.results.geometry.location.lng]);
                const locid = await pool.query("SELECT id FROM localizacao WHERE lati = ?, long = ?", [location.results.geometry.location.lat, location.results.geometry.location.lng]);

                const cons = await pool.query("INSERT INTO transportador(utilizador,localizacao) VALUES (?,?)", [id, locid[0][0].id]);
            } else {
                console.error(req.body.cons);
                if (req.body.cons) {
                    const cons = await pool.query("INSERT INTO consumidor(utilizador) VALUES (?)", [id]);
                }
                if (req.body.forn) {
                    const forn = await pool.query("INSERT INTO fornecedor(utilizador) VALUES (?)", [id]);
                }
            }
            res.status(200).send({ message: "success" });

        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "fail" });
    }
});



router.get('/:uid', (req,res) => {
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

router.delete('/delete/:uid', (req,res) => {
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

router.put('/edit/:uid', (req,res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const tlm = req.body.tlm;
    const morada = req.body.morada;
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

    if (morada !== '') {
        if ('=' in queryString) {
            queryString += "AND morada = '" + morada + "' ";
        } else {
            queryString += "morada = '" + morada + "' ";
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
    
    pool.getConnection((err,conn) => {
        if (err) throw err;

        conn.query(queryString, (err, results) =>  {
            conn.release();

            if (!err) {
                if(results.length > 0){
                    console.log("Utilizador atualizado com sucesso");
                    return res.status(200).send({message:"success"});
                } else {
                    console.log("Utilizador não se encontra na base de dados");
                    return res.status(404).send({message:"fail"});
                }
            } else {
                console.log("Não foi possível realizar essa operação. output 8");
                return res.status(500).send({message:"fail"});
            }
        });
    });
});

router.post('/uploadProfPic', (req,res) => {
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




// um user que seja só consumidor ou só fornecedor pode se tornar também fornecedor ou consumidor...


//exporta funções/"objetos"
module.exports = router ;
