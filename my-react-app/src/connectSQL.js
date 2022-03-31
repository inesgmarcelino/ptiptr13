var mysql = require('mysql');


var conn = mysql.createConnection({
    host: "35.246.42.37",
    user: "root",
    password: "abc123",
    database: "ptiptr13"
});
  
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// let sql = "SELECT * FROM utilizador";
// conn.query(sql, function (err, result) {
//   if (err) throw err;
//   result.forEach(element => {
//     console.log(element)
//   });
//   // console.log("Result: " + result);

// });