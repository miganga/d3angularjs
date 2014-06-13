'use strict';

/**
 * @ngdoc overview
 * @name partnerApp
 * @description
 * # partnerApp
 *
 * Main module of the application.
 */
angular.module('partnerApp.services',[]);
angular
    .module('partnerApp', [
        'partnerApp.services',
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router'

    ]).config(function($stateProvider){
        $stateProvider
            .state("overview", {
                url: '/',
                templateUrl: 'views/overview.html',
                controller: 'OverviewCtrl',
                resolve: {
                    cTD: function(mockData) {
                        return mockData.cTD();
                    },
                    cTB: function(mockData) {
                        return mockData.cTD();
                    },
                    cTM: function(mockData) {
                        return mockData.cTM();
                    }
                }
            });
    });

