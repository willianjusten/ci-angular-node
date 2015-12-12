/**
 * Definindo e instanciando
 * o nosso framework
 */
var express = require('express');
var app = express();

/**
 * Definindo onde ficarão nossos arquivos de view
 * __dirname significa que serão os arquivos da raix
 */
app.set('views', __dirname);


/**
 * Setando o diretório dos arquivos estáticos (css, js)
 */
app.use(express.static(__dirname + '/public'));

/**
 * Definindo que iremos usar Jade como Template Engine
 */
app.set('view engine', 'jade');

/**
 * Aqui estamos definindo que para rota raiz
 * iremos renderizar a view (index.jade)
 */
app.get('*', function(req, res) {
    res.render('index');
});

/**
 * Iniciando o servidor na porta 3000
 */
app.listen(process.env.PORT, process.env.IP);