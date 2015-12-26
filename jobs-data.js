var mongoose = require("mongoose");
var Promise = require("bluebird");
var jobModel = require('./models/Job');

var Job = jobModel.model;

var findJobs = function(query) {
    return Promise.cast(Job.find(query).exec());
};

var createJob = Promise.promisify(Job.create, {context:Job});


// Promisifying mongoose methods
exports.connectDB = Promise.promisify(mongoose.connect, {context: mongoose});
exports.open = Promise.promisify(mongoose.connection.open, {context:mongoose});

exports.saveJob = createJob;
exports.findJobs = findJobs;

exports.seedJobs = function() {
    return findJobs({}).then(function(collection){
        if(collection.length === 0) {
            return Promise.map(jobs, function(job){
                return createJob(job);
            })
        }
    })
};

var jobs = [
    {title: 'Python Developer', description: 'The best python developer from the world is needed.'},
    {title: 'Javascript Developer', description: 'The best Javascript developer from the world is needed.'},
    {title: 'C# Developer', description: 'The best C# developer from the world is needed.'},
    {title: 'C++ Developer', description: 'The best C++ developer from the world is needed.'}
];

