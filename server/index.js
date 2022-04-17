const { application } = require("express");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ptiptr13"
});

app.post('/regist', (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const email = req.body.email;
    const nif = req.body.nif;
    const telemovel = req.body.telemovel;
    const image = req.body.image;
    const password = req.body.password;

    db.query("INSERT INTO utilizador (id, nome, email, nif, telemovel, image, pass_word) VALUES (?,?,?,?,?,?,?)",
         [id, nome, email, nif, telemovel, image, password], 
         (err, result) => {
            console.log(err);
         });
});

app.listen(3001, () => {
    console.log("running server")
})