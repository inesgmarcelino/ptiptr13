var pool = require('../svlib/db/getPool');

//from example: https://stackoverflow.com/questions/37102364/how-do-i-create-a-mysql-connection-pool-while-working-with-nodejs-and-express

exports.hello = function(req,res){
    var o;
    pool.getConnection((err, connection) => {

        if(err){
          /** 
          if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection was closed.');
          } 
          if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has too many connections.');
          }
          if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
          }*/ 
          res.status(500);
          res.send(err.message);
        }

        //res.send(connection.threadId);
        o = connection.threadId;

        connection.release();
      
        
      });
      res.send(o);
}

exports.insert = function(req,res){

}

exports.fetch = function(req,res){

}