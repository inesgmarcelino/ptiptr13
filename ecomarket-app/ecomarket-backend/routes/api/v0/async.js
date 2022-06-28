const axios = require('axios');
const pool = require('mysql2').createPool({
    connectionLimit:10,
    host: "10.0.0.5",
    user: "ecobackend",
    password: "Y1nGJ14Ng#",
    database: "ecodb",
    port: 6033
  }).promise();


exports.teste = async function (req, res) {
    
    try {
        const [results,fields] = await pool.query("SELECT id, morada AS addr FROM utilizador WHERE id = 15");
        console.log(results);
        const person = results[0];
        const address = encodeURIComponent(person.morada);
        //address = address.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        console.log(address);
        const link = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAo6Nzo6UBDA2oEHjWeCAFfVqfEq-2-0S4&language=pt";
        const result = await axios.post(link).then((response) => {console.log(response)}).catch((err) => {throw err});



        res.send(result);
    } catch (err) {
        console.log(err);
        res.send("OH  NOE");
    }
}


