'use strict'

exports.say = function(req,res){
	res.status(200);
	res.type('html');
	var ipString = "ecomarket.works";
	var imageString = ipString + "/images/hello.png";
	var responseString = "<h1>Hello!</h1>" +
		"<img src='"+imageString +"'>"; 
	res.send(responseString);
	//eh possivel alcançar o mesmo efeito que esta pagina com
	// o metodo res.render()
}

