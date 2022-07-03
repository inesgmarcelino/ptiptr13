const axios = require('axios');

axios.get("http://localhost:3001/api/v0/hello").then(
    axios.post("http://localhost:3001/api/v0/test",{"word":"banana","number":1,"numberl":"3041"}).catch(err => console.error(err)).then((response) => {
        console.log(response);
    })

);


