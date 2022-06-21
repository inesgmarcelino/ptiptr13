const axios = require('axios');

exports.signup = function(req,res){

    const reply = axios.post('https://ecomarket.eu.auth0.com/dbconnections/signup',
        {
            client_id: '8d3hjpCHdNoQWDGJk2g4MNSeGNPZZs5R',
            connection: 'Username-Password-Authentication',
            email: 'mail@mail.to',
            password: 'M3G4Bl4Z1K3n#',
            username: "johndoe",
            given_name: "John",
            family_name: "Doe",
            name: "John Doe",
            nickname: "johnny",
            picture: "https://gumlet.assettype.com/afkgaming%2F2022-04%2Fedd0733d-feb1-4978-9378-1a7dbc13e2d5%2FUntitled_design___2022_04_18T161045_989__1_.jpg"
        }, {
        headers: {
            'content-type': 'application/json'
        }
    }).then(function(response){
        res.send(response)
    }).catch(function(error){
        res.send(error);
    });


}