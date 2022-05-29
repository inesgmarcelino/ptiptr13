var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "85.139.144.95",
  user: "root",
  password: "",
  database: "ecodb"
});
  
conn.connect(err => {
//if (err) throw err;
//comentado so para ser possivel correr, deopis corrige se quiseres

if(err){
    console.log("could not connect :(");
} else {
    console.log("Connected!");
}
});

exports.conn = conn;