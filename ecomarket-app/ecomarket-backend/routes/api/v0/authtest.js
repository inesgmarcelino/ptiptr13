const axios = require('axios');

exports.signup = function(req,res){

    var options = {
        method: 'POST',
        url: 'ecomarket.eu.auth0.com/dbconnections/signup',
        data: {
            client_id: 'opssXknnmiEsADpMM97vWHHArjjWXhsK',
            connection: 'Username-Password-Authentication', 
            email: 'mail@mail.to', 
            password: 'M3G4Bl4Z1K3n',
            username: "johndoe",
            given_name: "John",
            family_name: "Doe",
            name: "John Doe",
            nickname: "johnny",
            picture: "https://gumlet.assettype.com/afkgaming%2F2022-04%2Fedd0733d-feb1-4978-9378-1a7dbc13e2d5%2FUntitled_design___2022_04_18T161045_989__1_.jpg",
            headers: "Content-Type: application/json"
        }
    };

    axios.request(options).then(function (response) {
        res.send(response.data);
    }).catch(function (error) {
        res.send(error);
    });

}