const axios = require('axios');
const pool = require('mysql2').createPool({
    connectionLimit:10,
    host: "10.0.0.5",
    user: "ecobackend",
    password: "Y1nGJ14Ng#",
    database: "ecodb",
    port: 6033
  });

  const promisePool = pool.promise()



exports.teste = async function (req, res) {
    
    try {
        const rows = await pool.query("SELECT id, morada AS addr FROM utilizador WHERE id = 15");
        console.log(rows);
        const person = rows;
        const address = encodeURIComponent(person.morada);
        //address = address.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        console.log(address);
        const link = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAo6Nzo6UBDA2oEHjWeCAFfVqfEq-2-0S4&language=pt";
        axios.post(link).then(async (response) => {
            console.log(response);
        }

        );


        res.send("OH  YES");
    } catch (err) {
        console.log(err);
        res.send("OH  NOE");
    }
}


