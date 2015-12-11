var express = require('express');

var app = express();
app.set('views', __dirname)
app.set('view engine', 'jade');

app.get('*', function(req, res) {
    res.render('index');
});

app.listen(3000);
console.log('Running at http://localhost:3000');