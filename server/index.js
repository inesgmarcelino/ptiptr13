const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const db = mysql.createConnection({ //bd temporária
    host: "localhost",
    user: "root",
    password: "",
    database: "ptiptr13"
});

app.use(bodyParser.urlencoded({extended: true}));

db.connect(err => {
    if (err) {
        return err;
    } else {
        console.log("connected")
        const sqlTest = "INSERT INTO utilizador (nome, email, nif, telemovel, pass_word) VALUES ('test','test@test.pt',123456789,987654321,'abc123')";
        db.query(sqlTest, (err, result) => {

        })
        // funciona!!
    }
});
// console.log(db);

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM utilizador";
    db.query(sqlSelect, (err, result) => {
        console.log(result);
    })
})

app.post('/api/register', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const nif = req.body.nif;
    const telemovel = req.body.tlm;
    // const image = req.body.image;
    const password = req.body.pwd;

    const sqlInsert = "INSERT INTO utilizador (nome, email, nif, telemovel, pass_word) VALUES (?,?,?,?,?,?)";

    db.query(sqlInsert, [nome, email, nif, tlm, pwd], 
         (err, result) => {
            console.log(result);
         });
});

app.listen(3001, () => {
    console.log("running server")
})