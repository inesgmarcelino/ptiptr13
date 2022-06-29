const axios = require('axios');
const pool = require('../svlib/db/getPool');

exports.teste = async function (req, res) {
    
    try {
        const [results,fields] = await pool.query("SELECT id, morada AS addr FROM utilizador WHERE id = 15");
        const person = results[0];
        const address = encodeURIComponent(person.addr);
        //address = address.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        console.log(address);
        const link = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAo6Nzo6UBDA2oEHjWeCAFfVqfEq-2-0S4&language=pt";
        const result = await axios.post(link).then((response) => {console.log(response.data)}).catch((err) => {throw err});
        


        res.send(result);
    } catch (err) {
        console.log(err);
        res.send("OH  NOE");
    }
}


