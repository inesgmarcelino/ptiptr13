/**
 * justificar a mudança para mysql2 
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
 */

/**
 * Mais tarde talvez procurar forma mais segura de guardar os dados relativos à BD 
 * somewhere to start https://www.howtogeek.com/devops/how-to-secure-sensitive-data-with-docker-compose-secrets/
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

