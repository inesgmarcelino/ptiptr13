/**
 * justificar a mudança para mysql2 
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
 */

/**
 * Mais tarde talvez procurar forma mais segura de guardar os dados relativos à BD 
 * somewhere to start https://www.howtogeek.com/devops/how-to-secure-sensitive-data-with-docker-compose-secrets/
 */

var mysql = require('mysql2');
require('dotenv').config();

var servIP = (process.env.DEV_ENV === "true") ? "35.206.132.204" : "10.0.0.5";

const pool = mysql.createPool({
  connectionLimit:10,
  host: servIP,
  user: "ecobackend",
  password: "Y1nGJ14Ng#",
  database: "eco_db",
  port: 6033
}).promise();


module.exports = pool;

/**Codigo para obter uma ligacao
 * deve ser invocado dentro das paths
 
pool.getConnection((err, connection) => {

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
 */