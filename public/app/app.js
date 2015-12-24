(function () {
    'use strict';

    angular.module('app', ['ngResource']);

    angular
        .module('app')
        .controller('jobCtrl', listJobs);

    function listJobs($resource) {
        this.jobs = $resource('/api/jobs/').query();
    }
})(); 