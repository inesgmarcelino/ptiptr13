'use strict'

//NOTE: ONLY FIRST JSON IS SENT
exports.example = function(req,res){
	res.status(200);
	res.type('json');
	//res.json({"key":"value"});
	//res.json({"test": "result",
	//		  "test1" : "result1"});
	res.json([{"status":"200",
		"user":{"email":"example@mail.domain",
			"password" : "bajdoajwof2b13451h53j151h\\==",
			"image":"name.domain/public/hello.png",
			"hobbies":["Fruits","Vegetables","Gardening"]}}]);
	//Invocacao .json() envia logo a resposta, logo nao eh
	//necessario invocar o .send()
	//res.send();
}

exports.email = function(req,res){
	res.status(200);
	res.type('json');
	res.json({"email":"example@mail.domain"});
}
