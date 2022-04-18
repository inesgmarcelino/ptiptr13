const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json())

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
    }
});
// console.log(db);

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM utilizador";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post('/api/register', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const nif = req.body.nif;
    const tlm = req.body.tlm;
    // const image = req.body.image;
    const pwd = req.body.pwd;

    const sqlInsert = "INSERT INTO utilizador (nome, email, nif, telemovel, pass_word) VALUES (?,?,?,?,?)";
    console.log(nome, email, nif, tlm, pwd)
    db.query(sqlInsert, [nome, email, nif, tlm, pwd], 
         (err, result) => {
            console.log(result);
         });
});

app.listen(3001, () => {
    console.log("running server")
})