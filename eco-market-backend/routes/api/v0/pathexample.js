'use strict'

var users_db = {
    "1" : {"name":"Jonas","age":16,"hobbies":["sports","driving cars","bloody massacres"]},
    "2" : {"name":"Johanna", "age":26, "hobbies":["reading", "driving cars", "getting bloody massacred"]},
    "3" : {"name":"No one", "age":null, "hobbies":["not existing", "being unreal", "being out of this world"]}
}

exports.getUserById = function(req,res){
    var id = parseInt(req.params.id);
    if(id > 0 && id <= 3){
        res.status(200);
        res.type('json');
        res.json(users_db[id]);
    } else {
        res.status(404);
        res.type('json');
        res.json({"message":"user not found"});
    }
}

exports.getUserByQuery = function(req,res){
    
    //para este exemplo esta bom mas para seguranca, cada vez que implementarmos algo relacionado com queries
    //lancamos um bad request cada vez que recebermos valores nao esperados
    //exemplo, neste caso estamos apenas ah espera de id, logo se recebermos qualuer outra coisa = 500 BAD REQUEST
    var id = parseInt(req.query.id);
    if(id == undefined){
        res.status(500);
        res.type('json');
        res.json({"message":"Bad Request"});
    }
    if(id > 0 && id <= 3){
        res.status(200);
        res.type('json');
        res.json(users_db[id]);
    } else {
        res.status(404);
        res.type('json');
        res.json({"message":"user not found"});
    }
}


