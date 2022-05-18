//codigo que vem do projeto em react
var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "S3cret",
  database: "ecodb"
});
  
  conn.connect(function(err) {
    //if (err) throw err;
    //comentado so para ser possivel correr, deopis corrige se quiseres

    if(err){
        console.log("could not connect :(");
    } else {
        console.log("Connected!");
    }
  });

exports.conn = conn;