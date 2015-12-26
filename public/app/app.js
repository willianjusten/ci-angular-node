(function () {
    'use strict';

    angular.module('app', ['ngResource']);

    angular
        .module('app')
        .controller('jobCtrl', listJobs);

    function listJobs($resource, jobs) {
        this.jobs = $resource('/api/jobs/').query();
        jobs.save({title: 'test title', description: 'test description'});
    }
})(); 