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

    ]).config(function ($stateProvider, $urlRouterProvider) {
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
                        //return dataFactory.getData(queryParams);
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
                        //return dataFactory.getData(queryParams).$promise;
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    });

