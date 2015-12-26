var mongoose = require('mongoose');
var Promise = require('bluebird');

var jobSchema = mongoose.Schema({
    title:{type:String},
    description:{type:String}
});

var jobs = [
    {title:'Python Developer', description:'The best python developer from the world is needed.'},
    {title:'Javascript Developer', description:'The best Javascript developer from the world is needed.'},
    {title:'C# Developer', description:'The best C# developer from the world is needed.'},
    {title:'C++ Developer', description:'The best C++ developer from the world is needed.'}
];

var Job = mongoose.model('Job', jobSchema);

function findJobs(query) {
    return Promise.cast(mongoose.model('Job').find(query).exec());
}

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