/**
 * Definindo e instanciando
 * o nosso framework e nossa tool
 * para manipular o MongoDB
 */
var express = require('express');
var jobsData = require('./jobs-data');

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
    jobsData.findJobs().then(function(collection) {
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

jobsData.connectDB('mongodb://test:test123@ds027335.mongolab.com:27335/jobfinder-ci-angular-node')
    .then(function () {
        console.log('Connected to MongoDB');
        jobsData.seedJobs();
    });


/**
 * Iniciando o servidor na porta default ou 5000
 */

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
