const axios = require('axios');

axios.get("http://localhost:3001/api/v0/hello").then(
    axios.post("http://localhost:3001/api/v0/test",{"word":"bana","number":2,"numberl":"3041"}).catch(err => console.error(err)).then((response) => {
        console.log(response);
    })

);

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

