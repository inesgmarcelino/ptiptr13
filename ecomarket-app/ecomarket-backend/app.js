//***************Codigo gerado pelo express generator********** */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");

//comentado pq esses routes para esses ficheiros n são utilizados
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/index', indexRouter);
//app.use('/users', usersRouter);



/** Definir o middleware para as sessões */
//para usar sessoões, fazer req.sessions
const session = require('express-session');
const mysql2 = require('mysql2/promise');
const MySQLStore = require('express-mysql-session')(session);

var connection = mysql2.createPool({
  host: 'mysql',
  user: 'root',
  password: 'S3cret',
  database: 'session'
});

app.use(session({
	key: 'ecoseshcooky',
	secret: 'SecretString#3125/$!5',      

  cookie: {
    domain: "ecomarket.works",
    expires: (new Date(Date.now() + 3600000)),
    path: '/',
    sameSite: 'lax'
  },

	store: new MySQLStore({}, connection),
  
	resave: false,
	saveUninitialized: false
}));
/** Fim do middleware */



//***************Codigo gerado pelo express generator********** */

/**Definir route para API de test 
 * Consultar \eco-market-backend\routes\api\v0 para ver exemplos
 * Mais exemplos em:
 * https://expressjs.com/en/starter/examples.html
 */
const basePathTest = '/api/v0';
const testAPIRouter = require('./routes/api/v0/index.js');
app.use(basePathTest, testAPIRouter);

/** Portanto, se quiseres fazer uma api versao 1 tudo o que tens de fazer
 * eh criares um ficheiro js que contem as routes que queres utilizar
 * 
 * A organizacao que eu fiz foi colocar tudo dentro das diretorias sendo que
 * a diretoria v1, vai conter 1 index que eh invocado quando chamas aquela route
 * e vais ter os diferentes modulos que fazem as operacoes que tu queres
 * Contudo isto foi so para exemplo eles ate sugerem outra
 * 
 * Na api a serio vou deixar a outra maneira semi feita, depois escolhes como preferires
 * 
 * Esse index tb vai vai ele proprio fazer o routeamento, separando o que cada
 * coisa faz conforme os pedidos. 
 * 
 * Ou seja, se quiseres operacoes com utilizadores, fazes um modulo users e metes la
 * dentro todas as operacoes relacionadas: autenticacao, ir buscar users a BD, registalos
 * ETC
 */


/** Definir API a serio, segundo a estrutura que eles sugerem quando crias um novo 
 * projeto express
 * for loop em que definimos para cada path a route route+path
 * ou seja, por exemplo:
 * 
 * /api/v1/users aponta para o ficheiro /api/v1/users.js
 * WARNING: os restantes ficheiros da path tem de obrigatoriamente ter 
 * 
 *  module.exports = router;
 * 
 *  No fim do ficheiro ou ele estoira
 * 
 */

const basePathV1 = '/api/v1/';
const apiPathsV1 = ["users","admin"/**<-'deletethis' "providers","products","carriers","transportation"/**,cadeialogistica?*/];
for(var path in apiPathsV1){
  var filePath = basePathV1+apiPathsV1[path];
  console.error(typeof(filePath));
  var apiRouterV1 = require('./routes'+filePath+'.js');
  app.use(filePath, apiRouterV1);
} 
//Nota nao relacionada: falta definir a 
//API para criar as Cadeias logisticas no ficheiro .yaml


/**
 * Funcoes middleware
 * app.use(function()) eh considerada uma funcao de middleware
 * 
 * ele atribui uma path a uma funcao
 * Quando nao recebe um parametro , ela executa para todas as paths
 * Isto eh bom para filtrar por cookies e, mais abaixo, tratar
 * das autenticações
 * 
 * https://www.delftstack.com/howto/node.js/node-js-next-function/
 * https://expressjs.com/en/guide/writing-middleware.html
 */

/**
 * catch 404 and forward to error handler
 * Esta funcao faz aquilo que disse em cima, ela corre SEMPRE que fazes
 * um pedido ao servidor. Eu nao gosto muito do output que ela faz pq
 * o output dela eh bastante verboso e isso pode ser considerado uma 
 * vulerabilidade. Deve ser alterado para algo que retorne um 
 * json ou um response vazio com um status code 404...
 * 
 * Ou uma pagina bonita tipo quando o google tem 404s
 */
app.use(function(req, res, next) {
  next(createError(404));
});

/** Para servir ficheiros como imagens, paginas html estaticas, etc
 *  Usa-se isto, em que podes substituir 'public' pela ficheiro que queres
 * 
 * o public eh a pasta que esta na diretoria raiz de eco-market
 * 
 * depois para invocar um recurso usas localhost:porta/diretoria/recurso
 * Exemplo em v0: localhost:3000/images/hello.png 
 * 
 * Por alguma razao eu comentei isto mas o exemplo que meti continua a mostrar
 * a imagem que esta guardada portanto nao sei porque eh que ele mostra a imagem
 * na mesma
 */  
//app.use(express.static('public'));

/***** Codigo gerado pelo express generator ********/

app.use(bodyParser.urlencoded({extended: true}));

module.exports = app;
/***** Codigo gerado pelo express generator ********/
