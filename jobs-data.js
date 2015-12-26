var mongoose = require('mongoose');
var Promise = require('bluebird');
var jobsModel = require('./models/Job.js');

var Job = jobsModel.model;

var jobs = [
    {title:'Python Developer', description:'The best python developer from the world is needed.'},
    {title:'Javascript Developer', description:'The best Javascript developer from the world is needed.'},
    {title:'C# Developer', description:'The best C# developer from the world is needed.'},
    {title:'C++ Developer', description:'The best C++ developer from the world is needed.'}
];

var findJobs = function(query) {
    return Promise.cast(Job.find(query).exec());
};

exports.findJobs = findJobs;

exports.connectDB = Promise.promisify(mongoose.connect, {context: mongoose});

var createJob = Promise.promisify(Job.create, {context: Job});

exports.seedJobs = function() {
    return findJobs({}).then(function(collection) {
        if (collection.length === 0) {
            return Promise.map(jobs, function(job) {
                return createJob(job);
            })
        }
    })
};