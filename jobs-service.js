var bodyParser = require('body-parser');

module.exports = function(db, app) {
    app.use(bodyParser.json());

    app.post('/api/jobs', function(req, res) {
        db.saveJob(req.body);
        res.end();
    });

    app.get('/api/jobs', function(req, res) {
        db.findJobs().then(function(collection) {
            res.send(collection);
        });
    });
};


