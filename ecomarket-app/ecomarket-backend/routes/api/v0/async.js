const pool = require('mysql2').createPool({
    connectionLimit:10,
    host: "10.0.0.5",
    user: "ecobackend",
    password: "Y1nGJ14Ng",
    database: "teste",
    multipleStatements: true
  });

const promisePool = pool.promise()

exports.teste = async function(req,res){
    try{
        console.log("First query");
        const insert = await promisePool.query("INSERT INTO us(value) VALUES (?)",["primeiro"]);
        console.log("2 query");
        const select = await promisePool.query("SELECT MAX(id) AS id FROM us");
        console.log(select);
        const update = await promisePool.query("UPDATE us SET value = ? WHERE id = ?",["o valor nao eh primeiro",select.id]);
        console.log("END");
    } catch(err) {
        console.log(err);
        res.send("OH  NOE");
    } 
}


/*
exports.teste = function(req,res){
    pool.getConnection().then((conn) => {
        console.log("first Query");
        query(conn,"INSERT INTO us(value) VALUES (?)",["primeiro"])
        .then((conn) => {
            console.log("second Query");
            queryResults(conn,"SELECT MAX(id) AS id FROM us", null)
            .then((conn, results) => {
                console.log(results);
                query(conn, "UPDATE us SET value = ? WHERE id = ?",["o valor nao eh primeiro",results.id]).
                then((conn) => {
                    conn.release();
                },(err) => {console.error(err)})
            },(err) => {console.error(err)})
        },(err) => {console.error(err)})
    },(err) => {console.error(err)})
}*/






/*
exports.teste = function(){
    pool.getConnection().then((conn) => {
        return new Promise( (resolve,reject) => {
            conn.query("INSERT INTO us(value) VALUES (?)", 
            ["primeiro"], (err, results) => {
                if(err) return reject(err);
            });
            resolve(conn);
        })
    },(err)=>{console.log(err)}).then((conn) => {
        return new Promise( (resolve, reject) => {
            conn.query("SELECT MAX(id) AS id FROM us", (err, results) => {
                if(err) return reject(err);
                resolve(conn, results)
            });
        })
    },(err)=>{console.log(err)}).then((conn, results) => {
        return new Promise( (resolve, reject) => {
            conn.query( "UPDATE us SET value = ? WHERE id = ?",
            ["o valor nao eh primeiro",results.id], (err, results) => {
                if(err) return reject(err);
                resolve("success");
            });
        });
    },(err)=>{console.log(err)}).then((result) => {
        console.log(result);
    },(err)=>{console.log(err)})
}

/*.catch((err) => {
    console.log(err);
});

/*
pool.getConnection().then(query(conn,
    "INSERT INTO us(value) VALUES (?)", 
    ["primeiro"]).then(
        query(conn,
            "SELECT MAX(id) AS id FROM us", null
            ).then(
                (conn, results) => {
                    query(conn,
                        "UPDATE us SET value = ? WHERE id = ?",
                        ["o valor nao eh primeiro",results.id]
                        )
                }
            )
        )
    ).catch((err) => {
        console.log(err);
    })
;*/

/*var pool = require('mysql2/promise').createPool({
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
        return conn;
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
    })
}*/