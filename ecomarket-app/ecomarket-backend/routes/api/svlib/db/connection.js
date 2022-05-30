//codigo que vem do projeto em react
var mysql = require('mysql2');

var conn = mysql.createPool({
  connectionLimit: 10,
  host: "mysql",
  user: "root",
  password: "S3cret",
  database: "ecodb"
});

exports.conn = conn;