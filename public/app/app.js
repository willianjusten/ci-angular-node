(function () {
    'use strict';

    angular.module('app', ['ngResource']);

    angular
        .module('app')
        .controller('jobCtrl', listJobs);

    function listJobs($resource, jobs) {
        this.jobs = $resource('/api/jobs/').query();

        this.submit = function() {
            var job = {title: this.title, description: this.description };
            jobs.save(job);
            this.jobs.push(job);
            this.title = '';
            this.description= '';
        }
    }
})(); 