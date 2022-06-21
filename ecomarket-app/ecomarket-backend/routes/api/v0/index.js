/** Codigo gerado pelo generator */
var express = require('express');
var router = express.Router();
/** Codigo gerado pelo generator */

/** Carregar os modulos da diretoria local */
const hello = require('./hello.js');
const json = require('./json.js');
const pathexample = require('./pathexample.js'); 
const testbd = require('./bdexample.js');
const authtest = require('./authtest');

/** o objeto router define as paths
 *  eh invocado como router.METODO_HTTP
 *  ou seja, estes metodos todos usam o HTTP GET
 * 
 * 	router.post(route, funcao); para um post request
 * 	router.put(route, funcao); para um put request
 * 	etc,etc,etc
 * 
 *  https://expressjs.com/en/starter/basic-routing.html
 */

/** A funcao recebe 3 argumentos
 *  req eh o objeto request   https://expressjs.com/en/api.html#req
 *  res eh o objeto response  https://expressjs.com/en/api.html#res
 * 
 * 	next e a funcao de call back que vai ser executada depois desta
 * 	execucao
 * 
 *  nao tenho nenhum exemplo util mas eh capaz de ser bom para coisas
 * 	como redirecionar maybe? unsure
 * 
 * 	Objetos req e res API: 
 */
router.get('/hello', function(req, res, next) {
	//funcao say exportada do ficheiro hello.js
	hello.say(req,res);
});

/** Exemplo para retornar JSON */
router.get('/json', function(req, res, next) {
	//funcao example exportada do ficheiro hello.js
	json.example(req,res);
});

/** Exemplo para retornar JSON */
router.get('/json/email', function(req,res,next){
	//funcao email exportada do ficheiro hello.js
	json.email(req,res);
});

router.get('/pathexample/:id', function(req,res,next){
	//para exemplificar com variaveis na path
	pathexample.getUserById(req,res);
});

//para usar este, invocar url localhost:3000/api/v0/pathexample?id=X
//em que X eh um numero
router.get('/pathexample?', function(req,res,next){
	//para exemplificar com variaveis na query
	//exemplo online : https://stackabuse.com/get-query-strings-and-parameters-in-express-js/
	pathexample.getUserByQuery(req,res);
});

router.get('/testbd/hello',function(req,res,next){
	testbd.hello(req,res);
});

router.get('/testbd/insert?',function(req,res,next){
	testbd.insert(req,res);
});

router.get('/testbd/fetch/:id',function(req,res,next){
	testbd.fetch(req,res);
});

/** exporta o objeto router para ser invocado pelo app.js
 * exports funciona basicamente como se quisesses colocar um objeto ou funcao
 * para ser lido/invocado fora do contexto do ficheiro onde ele esta
 */

router.get('/authtest',function(req, res, next){
	authtest.signup(req,res);
});

module.exports = router;
