/**
 * justificar a mudança para mysql2 
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
 */


var mysql = require('mysql2');

var pool = mysql.createPool({
    connectionLimit:10,
    host: "mysql",
    user: "root",
    password: "S3cret",
    database: "ecodb"
  });
  
module.exports = pool;

/**Codigo para obter uma ligacao
 * deve ser invocado dentro das paths
 * 
 * 
 * pool.getConnection((err, connection) => {

  if(err){
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      console.error('Database connection was closed.');
    } 
    if(err.code === 'ER_CON_COUNT_ERROR'){
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }

  Codigo de fetch e afins

  if (connection) connection.release();

  return ;
});
 * 
 * 
 * 
 */