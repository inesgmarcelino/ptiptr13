// const { auth } = require("express-opneid-connect"); //to apply
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: '', //to set
//     baseURL: 'http://localhost:3001',
//     clientID: 'jGq5nn8schXp3YBWRlQLPLT0kHxoS7Sd'
// }

const app = express();
app.use(cors());
app.use(express.json())
// app.use(auth(config));
app.use(bodyParser.urlencoded({extended: true}));

// DATABASE
const db = mysql.createConnection({ //bd temporária
    host: "localhost",
    user: "root",
    password: "",
    database: "ptiptr13"
});

db.connect(err => {
    if (err) {
        return err;
    } else {
        console.log("connected")
    }
});

// ROUTES
app.post('/api/register', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const nif = req.body.nif;
    const tlm = req.body.tlm;
    // const image = req.body.image;
    const pwd = req.body.pwd;

    const sqlInsert = "INSERT INTO utilizador (nome, email, nif, telemovel, pass_word) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [nome, email, nif, tlm, pwd], 
         (err, result) => {
             if (!err) {
                console.log(result);
             } else {
                 res.send("fail");
             }
    });

    const cons = req.body.cons;
    const morada = req.body.morada;
    const forn = req.body.forn;
    const trans = req.body.trans;

    const sqlSelect = "SELECT id FROM utilizador WHERE email = ?";
    db.query(sqlSelect, [email], 
            (err, rows) => {
            if (!err) {
                const result = Object.values(JSON.parse(JSON.stringify(rows)));
                var id = result[0].id;

                if (trans) { // criar transportador
                    const sqlInsert = "INSERT INTO transportador (utilizador) VALUES (?)";
                    db.query(sqlInsert, [id], 
                        (err, result) => {
                            if (!err) {
                                console.log(result);
                            } else {
                                res.send("fail");
                            }
                    });
                } else {
                    if (cons) { //criar consumidor
                        const sqlInsert = "INSERT INTO consumidor (utilizador, morada) VALUES (?,?)";
                        db.query(sqlInsert, [id, morada], 
                            (err, result) => {
                                if (!err) {
                                    console.log(result);
                                } else {
                                    res.send("fail");
                                }
                        });
                    }

                    if (forn) { //criar fornecedor
                        const sqlInsert = "INSERT INTO fornecedor (utilizador) VALUES (?)";
                        db.query(sqlInsert, [id], 
                            (err, result) => {
                                if (!err) {
                                    console.log(result);
                                } else {
                                    res.send("fail");
                                }
                        });
                    }
                }
                res.send("success");
            } else {
                res.send("fail");
            }
        });
});

app.post('/api/login', (req, res) => {
    const email = req.body.email;
    const pwd = req.body.pwd;
    const sqlInsert = "SELECT pass_word FROM utilizador WHERE email = ?";
    db.query(sqlInsert, [email],
            (err, rows) => {
                if (!err) {
                    const result = Object.values(JSON.parse(JSON.stringify(rows)));
                    if (result.length > 0) {
                        var password = result[0].pass_word;
                        if (pwd === password) {
                            res.send("success");
                        } else {
                            res.send("fail");
                        }
                    } else {
                        res.send("no email")
                    }
                } else {
                    res.send("fail");
                }
            })
})

app.listen(3001, () => {
    console.log("running server")
})