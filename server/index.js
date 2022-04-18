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
    db.query(sqlInsert, [nome, email, nif, tlm, pwd], 
         (err, result) => {
            console.log(result);
    });

    const cons = req.body.cons;
    const forn = req.body.forn;
    const trans = req.body.trans;
    if (trans) {
        const sqlSelect = "SELECT id FROM utilizador WHERE email = ?";
        db.query(sqlSelect, [email], 
             (err, rows) => {
                if (!err) {
                    const result = Object.values(JSON.parse(JSON.stringify(rows)));
                    var id = result[0].id;

                    // criar transportador
                    const sqlInsert = "INSERT INTO transportador (utilizador) VALUES (?)";
                    db.query(sqlInsert, [id], 
                        (err, result) => {
                            console.log(result);
                    });
                }
            });
        // console.log(result);
    }
});

app.listen(3001, () => {
    console.log("running server")
})