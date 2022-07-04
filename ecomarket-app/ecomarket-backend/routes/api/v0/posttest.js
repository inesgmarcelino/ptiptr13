const parser = require('../svlib/validator/parser');

module.exports = (req,res) => {
    console.log(req.body);
    const expected = [3,{
        number:{
            type:"number", min:1, max:5
        },
        word:{
            type:"string",
            length: 4
        },
        numberl:{
            type:"number",
            length:4
        }
    }]
    result = parser(req.body,expected);
    console.log(result);
    res.send(result);
}