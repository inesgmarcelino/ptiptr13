/** Ficheiro para exemplificar queries do backend */

const pool = require('../svlib/db/getPool');

//from example: https://stackoverflow.com/questions/37102364/how-do-i-create-a-mysql-connection-pool-while-working-with-nodejs-and-express

exports.hello = async function(req,res){
  try {
    const [results,fields] = await pool.query("INSERT INTO test(value) VALUES(1)").catch(err => {
      console.error(err);
      throw new Error();
    });
    console.error(results.insertId);
    console.error(results);
    console.error(fields);
    res.send(200);
  } catch (error) {
    res.send(500);
  }
}

exports.insert = function(req,res){
  var desc = req.query.desc;
  if(desc === undefined){
      res.status(500);
      res.type('json');
      res.json({"message":err.message});
  }

  /**Esta parte estaria no getPool.js mas isto é para poder testar a base de dados */
  var pool = mysql.createPool({
    connectionLimit:10,
    host: "mysql",
    user: "root",
    password: "S3cret",
    database: "hello"
  });
  /**Esta parte estaria no getPool.js mas isto é para poder testar a base de dados */

    pool.getConnection((err, connection) => {

        if(err){
          res.status(500);
          res.type('json');
          res.json({"message":err.message});
        }

        //queryString
        var queryString = "INSERT INTO numbers(setting) VALUES (?) ";
        
        //Metodo que prepara o statement (Evita SQL injec)
        //https://www.npmjs.com/package/mysql2#using-prepared-statements
        connection.execute(
          queryString,
          [desc],
          function(err,results,fields){
            if(err){
              res.status(500);
              res.type('json');
              res.json({"message":err.message});
            } else {
              res.status(200);
              res.type('json');
              res.json({"message":"Descrição adicionada com sucesso!"});
            }
          }
        )
        connection.release();
      });
}


exports.fetch = function(req,res){
  
  var id = parseInt(req.params.id);

    /**Esta parte estaria no getPool.js mas isto é para poder testar a base de dados */
    var pool = mysql.createPool({
      connectionLimit:10,
      host: "mysql",
      user: "root",
      password: "S3cret",
      database: "hello"
    });
    /**Esta parte estaria no getPool.js mas isto é para poder testar a base de dados */
  
  pool.getConnection((err, connection) => {

    if(err){
      res.status(500);
      res.send(err.message);
    }

    //queryString
    var queryString = "SELECT * FROM numbers WHERE id = ?";
    
    //Metodo que prepara o statement (Evita SQL injec)
    //https://www.npmjs.com/package/mysql2#using-prepared-statements
    connection.execute(
      queryString,
      [id],
      function(err,results,fields){
        if(err){
          res.status(500);
          res.json({"message":err.message});
        } else {
          if(results.length == 0){
            res.status(404);
            res.type('json');
            res.json({"message":"Esse descrição com ID não existe"});
          } else {
            res.status(200);
            res.type('json');
            //var reply = {};
            console.log(results);
            console.log(fields);
            //desnecessario pq ele retorna logo um json
            /*for(var key of results.keys()){
              reply[key] = results[key];
            }*/
            res.json(results);
          }
        }
      }
    )
    connection.release();
  });

}