var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "35.246.42.37",
    user: "root",
    password: "abc123"
  });
  
  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });