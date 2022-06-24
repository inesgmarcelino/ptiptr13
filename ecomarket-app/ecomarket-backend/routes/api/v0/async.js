var pool = require('mysql2/promise').createPool({
    connectionLimit:10,
    host: "10.0.0.5",
    user: "ecobackend",
    password: "Y1nGJ14Ng",
    database: "teste",
  });

exports.teste = function(req,res){
    pool.getConnection().then((conn) => {
        console.log("primeira query")
        const insert = "INSERT INTO us(value) VALUES (?)";
        conn.query(insert,["primeiro"],(err) => {
            if(err) throw err;
            
        })
    }).then((conn) => {
        console.log("segunda query")
        const select = "SELECT MAX(id) AS id FROM us";
        conn.query(select, (err,results) => {
            if(err) throw err;
            console.log(results);
            return results;
        })
    }).then((conn,results) => {
        console.log("terceira query")
        const update = "UPDATE us SET value = ? WHERE id = ?";
        conn.query(update, ["Mudanca para segundo",results.id],() => {
            if(err) throw err;
        })
    }).catch((err) => {
        console.error(err.message);
    })
        
        
        /*(err,connection) => {
        var queryString = "SELECT MAX(id) FROM us";
        var res;
        connection.query(queryString, [],(err, results)=>{
            if(err){
                console.log(err.message);
                error = true;
            }
            res = results;
        }).then((results) => {
            console.log(res);
            console.log(results);
        });
    })*/
}