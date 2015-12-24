/**
 * Definindo e instanciando
 * o nosso framework e nossa tool 
 * para manipular o MongoDB
 */
var express = require('express');
var mongoose = require('mongoose');
var jobModel = require('./models/Job.js');

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

app.get('/api/jobs', function(req, res) {
    mongoose.model('Job').find({}).exec(function(err, collection) {
        res.send(collection);
    });
});

/**
 * Aqui estamos definindo que para rota raiz
 * iremos renderizar a view (index.jade)
 */
app.get('*', function(req, res) {
    res.render('index');
});

/**
 * Fazendo conexão ao banco de dados
 * criado no MongoLab - https://mongolab.com/
 */
mongoose.connect('mongodb://test:test123@ds027335.mongolab.com:27335/jobfinder-ci-angular-node');

/**
 * Reportando se a conexão teve sucesso
 */
var con = mongoose.connection;
con.once('open', function() {
    console.log('Connected to MongoDB');
    jobModel.seedJobs();
});

/**
 * Iniciando o servidor na porta 3000
 */
app.listen(process.env.PORT, process.env.IP);
console.log('Connected on: http://' + process.env.IP + ':' + process.env.PORT);