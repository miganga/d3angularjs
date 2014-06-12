'use strict';

/**
 * @ngdoc overview
 * @name partnerApp
 * @description
 * # partnerApp
 *
 * Main module of the application.
 */
angular
    .module('partnerApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/overview.html',
                controller: 'OverviewCtrl'
                /*resolve: {
                    customerTransactionsData: function (mockData) {
                        var promise = mockData.customerTransactions();
                        promise.then(function (data) {
                            return data.data;
                        });
                    },
                    customerTransactionsBenchmark: function (mockData) {
                        var promise = mockData.customerTransactionsBenchmark();
                        promise.then(function (data) {
                            return data.data;
                        });
                    }
                }*/
            })
            .when('/customer', {
                templateUrl: 'views/customer.html',
                controller: 'CustomerCtrl'
            })
            .when('/product', {
                templateUrl: 'views/product.html',
                controller: 'ProductCtrl'
            })
            .when('/benchmark', {
                templateUrl: 'views/benchmark.html',
                controller: 'BenchmarkCtrl'
            })
            .otherwise({
                redirectTo: '/overview'
            });
    });
