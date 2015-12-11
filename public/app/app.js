(function () {
    'use strict';

    angular.module('app', []);

    angular
        .module('app')
        .controller('jobCtrl', listJobs);

    function listJobs() {
        this.jobs = [
            {
                title: 'Python Developer',
                description: 'We want the best python developer of the world'
            }, 
            {
                title: 'Javascript Developer',
                description: 'We want the best javascript developer of the world'
            }
        ];
    }
})(); 