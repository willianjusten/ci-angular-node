var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    title:{type:String},
    description:{type:String}
});

var Job = mongoose.model('Job', jobSchema);

exports.seedJobs = function() {

    // cleaning the Jobs Data
    Job.remove().exec();

    // Seeding new Jobs
    Job.find({}).exec(function(err, collection) {
        Job.create({title:'Python Developer', description:'The best python developer from the world is needed.'});
        Job.create({title:'Javascript Developer', description:'The best Javascript developer from the world is needed.'});
        Job.create({title:'C# Developer', description:'The best C# developer from the world is needed.'});
        Job.create({title:'C++ Developer', description:'The best C++ developer from the world is needed.'});
    })
}