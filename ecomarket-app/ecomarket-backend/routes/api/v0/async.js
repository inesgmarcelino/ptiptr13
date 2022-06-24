var pool = require('mysql2/promise').createPool({
    connectionLimit:10,
    host: "10.0.0.5",
    user: "ecobackend",
    password: "Y1nGJ14Ng",
    database: "teste",
  });

exports.teste = function(req,res){
    pool.getConnection().then((conn) => {
        const insert = "INSERT INTO us VALUES (?)";
        conn.query(insert,["primeiro"],(err) => {
            if(err) throw err;
        }).then((conn,results) => {
            const select = "SELECT MAX(id) AS id FROM us";
            conn.query(select, (err,results) => {
                if(err) throw err;
                return results;
            })
        }).then((conn,results) => {
            const update = "UPDATE us SET value = ? WHERE id = ?";
            conn.query(update, ["Mudanca para segundo",results.id],() => {
                if(err) throw err;
            })
        }).catch((err) => {
            console.error(err.message);
        })
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