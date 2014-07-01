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

    ]).run(function ($state, $rootScope) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            event.preventDefault();
            console.log( JSON.stringify(error));
            $state.go('timeout', JSON.stringify(error)); // error has data, status and config properties
        });
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        //I might use this if the data gets more complex in the future
        //RestangularProvider.setBaseUrl('http://10.0.106.156:9000/kpi/v1/retailer/34441');
        //RestangularProvider.setDefaultRequestParams('jsonp');
        $stateProvider
            .state("overview", {
                url: '/',
                templateUrl: 'views/overview.html',
                controller: 'OverviewCtrl',
                resolve: {
                    customerTransactions: function (mockData) {
                        return mockData.customerTransactions();
                    },
                    customerTransactionsBenchmark: function (mockData) {
                        return mockData.customerTransactionsBenchmark();
                    },
                    customerTransactionsMonthly: function (mockData) {
                        return mockData.customerTransactionsMonthly();
                    },
                    topSellingProducts: function (mockData) {
                        return mockData.topSellingProducts();
                    },
                    transactions: function (dataFactory) {
                        var queryParams = {
                            startDate: '2014-05-05',
                            endDate: '2014-05-11',
                            currency: 'EUR',
                            rollup: ['DAY', 'RETURNING'],
                            includeBenchmark: '1',
                            sortOrder: 'ASCENDING',
                            sortField: 'DATE'
                        };
                        /*return dataFactory.getData(queryParams).$promise
                            .then(function (data) {
                                return data;
                            });*/
                    },
                    transactionsBenchmark: function (dataFactory) {
                        var queryParams = {
                            startDate: '2014-05-05',
                            endDate: '2014-05-20',
                            currency: 'EUR',
                            rollup: ['DAY', 'RETURNING'],
                            includeBenchmark: '1',
                            sortOrder: 'ASCENDING',
                            sortField: 'DATE'
                        };
                        /*return dataFactory.getData(queryParams).$promise;*/
                    }
                }
            })
            .state("errors", {
                url: '/errors',
                templateUrl: 'views/error.html'
            })
            .state("timeout", {
                parent: 'errors'
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    });

