'use strict';

/**
 * @ngdoc overview
 * @name partnerApp
 * @description
 * # partnerApp
 *
 * Main module of the application.
 */
angular.module('partnerApp.services', []);
angular
    .module('partnerApp', [
        'partnerApp.services',
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.router'

    ]).config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("overview", {
                url: '/',
                templateUrl: 'views/overview.html',
                controller: 'OverviewCtrl',
                resolve: {
                    customerTransactions: function(mockData) {
                        return mockData.customerTransactions();
                    },
                    customerTransactionsBenchmark: function(mockData) {
                        return mockData.customerTransactionsBenchmark();
                    },
                    customerTransactionsMonthly: function(mockData) {
                        return mockData.customerTransactionsMonthly();
                    },
                    topSellingProducts: function(mockData) {
                        return mockData.topSellingProducts();
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    });

