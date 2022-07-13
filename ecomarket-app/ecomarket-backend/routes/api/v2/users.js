const axios = require('axios');
var express = require('express');
var router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const {Storage} = require('@google-cloud/storage');
const parser = require('../svlib/validator/parser');
const ServerError = require('../svlib/ServError/ServerError');

var pool = require('../svlib/db/getPool');

/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
/** */

router.get('/', async (req, res) => {
    try {
        console.log(req.query.email)
        const expected = [1,{"email": { type: "string" } }];
        if (!parser(req.query, expected)) throw new Error("Dados inválidos");
        const [user, fields] = await pool.query("SELECT * FROM utilizador WHERE (email = ?)", [req.query.email]);
        return res.status(200).send({results: user})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'fail'});
    }
});

router.get('/id', async (req, res) => {
    try {
        const expected = [1,{"id": { type: "number" } }];
        if (!parser(req.query, expected)) throw new Error("Dados inválidos");
        const [user, fields] = await pool.query("SELECT * FROM utilizador u WHERE (id = ?)", [req.query.id]);
        res.status(200).send({results: user})
    } catch (err) {
        console.log(err)
        res.status(500).send({message: 'fail'});
    }
});

router.post('/register', async (req, res, next) => {
    const expected = [11,
        {
            "email": { type: "string" },
            "passwd": { type: "string" },
            "nome": { type: "string" },
            "nif": { type: "number", length: "9" },
            "tlm": { type: "number", length: "9" },
            "rua": { type: "string" },
            "conc": { type: "number" },
            "dist": { type: "number" },
            "prefix": { type: "number", length: "4" },
            "sufix": { type: "number", length: "3" },
            "papel" : {type:"number", min:1, max:5}
        }];
    try {
        if (!parser(req.body, expected)) throw new ServerError(400,"Dados fornecidos inválidos.");
        const CEP = req.body.prefix + "-" + req.body.sufix;
        var address = req.body.rua + "," + req.body.conc + ' '+ CEP;
        address = encodeURIComponent(address);
        const link = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAo6Nzo6UBDA2oEHjWeCAFfVqfEq-2-0S4&language=pt";
        const reply = await axios.post(link);
        if (reply.data.status !== "OK") throw new ServerError(400,"Morada inválida.");
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
                    papel: String(req.body.papel)
                }
            }, {
            headers: {
                'content-type': 'application/json'
            }
        }).catch(err => {
            console.log(err);
            throw new ServerError(500,"Não foi possível registar o utilizador.")});
        const [users, field] = await pool.query("SELECT id FROM utilizador WHERE email = ?", [req.body.email]);


        const insert = await pool.query("INSERT INTO morada(userId,prefix,sufix,street,dist,conc,lat,lng) VALUES (?,?,?,?,?,?,?,?)",
        [users[0].id,
        req.body.prefix,
        req.body.sufix,
        req.body.rua,
        req.body.dist,
        req.body.conc,
        coords.lat,
        coords.lng]).catch(err => {
            //TO_DO code to delete user
            throw new ServerError(500,"Não foi possível registar a morada do utilizador. Tente mais tarde.")});
        res.status(200).send({message:"Utilizador registado com sucesso."});
    } catch (err) {
        res.status(err.code).send({ message: err.message });
    }
});

router.put('/edit', async (req,res) => {
    try {
        const id = req.body.id;
        const nome = req.body.nome;
        const email = req.body.email;
        const nif = req.body.nif;
        const tlm = req.body.tlm;
        const pwd = req.body.pwd;

        const [select, fields] = await pool.query("SELECT * from utilizador WHERE id = ?", [id]);

        if (select[0].nome !== nome) {
            const update = await pool.query("UPDATE utilizador SET nome = ? WHERE id = ?", [nome, id]);
        }
        if (select[0].email !== email) {
            const update = await pool.query("UPDATE utilizador SET email = ? WHERE id = ?", [email, id]);
        }
        if (select[0].nif !== nif) {
            const update = await pool.query("UPDATE utilizador SET nif = ? WHERE id = ?", [nif, id]);
        }
        if (select[0].phone !== tlm) {
            const update = await pool.query("UPDATE utilizador SET phone = ? WHERE id = ?", [tlm, id]);
        }

        if (pwd !== false) {
            bcrypt.hash(pwd, 10, function(err, hash) {
                if (err) throw new err;
                const update2 = pool.query("UPDATE utilizador SET passwd = ? WHERE id = ?", [hash, id]);
            });
        }
        res.status(200).send({message: 'success'});
    } catch (err) {
        console.log(err);
        res.status(500).send({message: 'fail'});
    }
});

router.delete('/delete', async (req,res) => {
    try {
        const id = req.query.id;
        const deleting = await pool.query("DELETE FROM utilizador WHERE id = ?", [id]);
        res.status(200).send({message: 'success'});
    } catch (err) {
        console.log(err);
        res.status(500).send({message: 'fail'});
    }
})

/**CHECK ON THESE LATER */

router.get('/:uid', async (req,res) => {
    try{
        const expected = [1,{uid:{type:"number",min:1}}];
        if (!parser(req.params, expected)) throw new Error("Dados fornecidos inválidos.");
        const queryString = "SELECT * FROM utilizador WHERE id = ?";
        const [udata,fields] = await pool.query(queryString,[req.params.uid]);
        if(udata[0].length === 0) throw new Error();
        res.status(200).send(udata[0]);
    }catch(err){
        res.status(404).send()
    }
});

router.get('/:uid/moradas', async (req,res) => {
    try{
        const expected = [1, { uid: { type: "number", min: 1 } }];
        if (!parser(req.params, expected)) throw new Error("Dados fornecidos inválidos.");
        const queryString = "SELECT id AS mid,"+ 
                                   "userId AS user,"+
                                   "prefix, sufix,"+
                                   "street, dist, conc"+
                                   "FROM morada WHERE userId = ?";
        const [moradas, fields] = pool.query(queryString,[req.params.uid]);
        var reply = {};
        moradas.array.forEach(e => { //for each element
            const CEP = String(e.prefix)+"-"+String(e.sufix);
            const address = e.street+","+e.conc+" "+CEP+","+e.dist;
            reply[String(e.user)+"."+String(e.mid)]=address;
        });
        res.status(200).send(reply);
    } catch (err) {
        res.status(err.code).send(err.message);
    }

});

router.delete('/delete/:uid', async (req, res) => {
    try {
        const expected = [1, { uid: { type: "number", min: 1 } }];
        if (!parser(req.params, expected)) throw new Error("Dados fornecidos inválidos.");
        const queryString = "DELETE FROM utilizador WHERE id = ?";
        const [udata, fields] = await pool.query(queryString, [req.params.uid]);
        if (udata[0].length === 0) throw new Error();
        res.status(200).send(udata[0]);
    } catch (err) {
        res.status(404).send()
    }

});

module.exports = router ;
