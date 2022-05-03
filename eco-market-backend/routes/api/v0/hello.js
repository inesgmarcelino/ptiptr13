'use strict'

exports.say = function(req,res){
	res.status(200).type('html');
	var ipString = "http://localhost:3000";
	var imageString = ipString + "/images/hello.png";
	var responseString = "<h1>Hello!</h1>" +
		"<img src='"+imageString +"'>"; 
	res.send(responseString);
	//eh possivel alcançar o mesmo efeito que esta pagina com
	// o metodo res.render()
}

