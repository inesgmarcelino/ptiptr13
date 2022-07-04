const axios = require('axios');

const payload = {
    email: "testemail@mail.com",
    passwd: "T3est3",
    nome:"Testamus Testassimus",
    nif: "230230230",
    tlm: "999999999",
    rua: "Campo Grande 016",
    conc: "Lisboa",
    dist: "Lisboa",
    prefix: "1749",
    sufix: "016",
    papel :"3"
}
console.log(payload);
axios.post("http://localhost:3001/api/v2/users/register",payload).catch(err => console.error(err)).then((response) => {
    console.log(response);
});



try {
    var test;
    try {
        test = "HAHAH XD";
    } catch (error) {
        console.error("error1");
    }
    console.log(test);
} catch (error) {
    console.error("error2");
}

