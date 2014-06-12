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
        'ngTouch',
        'ui.router'
    ])/*.config(function($stateProvider){
        $stateProvider
            .state("home", {
                url: '/',
                templateUrl: 'views/overview.html',
                controller: 'OverviewCtrl'
            });
    });*/
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/overview.html',
                controller: 'OverviewCtrl'

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
