const axios = require('axios');

exports.signup = function(req,res){

    const reply = axios.post('https://ecomarket.eu.auth0.com/dbconnections/signup',
        {
            client_id: '8d3hjpCHdNoQWDGJk2g4MNSeGNPZZs5R',
            connection: 'Username-Password-Authentication',
            email: "mail@mail.mail.to",
            password: "1!qWty56",
            name:"Test Testeson",
            picture: "https://digimedia.web.ua.pt/wp-content/uploads/2017/05/default-user-image.png",
            user_metadata: { cons: "false", 
                             forn: "false", 
                             trans: "false",
                             nif:"222343990",
                             tlm:"919119191", 
                             morada:"Street Road 95"}
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