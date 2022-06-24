var mysql = require('mysql2');
const PoolConnection = require('mysql2/typings/mysql/lib/PoolConnection');

var pool = mysql.createPool({
    connectionLimit:10,
    host: "10.0.0.5",
    user: "ecobackend",
    password: "Y1nGJ14Ng",
    database: "teste",
  }).promise();;

exports.teste = function(req,res){
    pool.getConnection((err,connection) => {
        var queryString = "SELECT MAX(id) FROM us";
        var res;
        await connection.query(queryString, [],(err, results)=>{
            if(err){
                console.log(err.message);
                error = true;
            }
            res = results;
        }).then((results) => {
            console.log(res);
            console.log(results);
        });
    })
}