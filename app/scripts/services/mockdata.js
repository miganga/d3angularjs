'use strict';

/**
 * @ngdoc service
 * @name partnerApp.mockData
 * @description
 * # mockData
 * Factory in the partnerApp.
 */
angular.module('partnerApp.services')
    .factory('mockData', function ($q, $http) {
        // Service logic
        // ...
        function muckerFucker(range, maxValue) {
            return _.range(0, range).map(function (data) {
                return Math.round(Math.random() * data * maxValue) % maxValue;
            });
        }

        var customerOrdersData = muckerFucker(28, 50);

        // Public API here
        return {
            /*customerTransactions: function () {
                var deferred = $q.defer();
                $http.get('data/transaction-data.json').then(function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            },
            customerTransactionsBenchmark: function () {
                var deferred = $q.defer();
                $http.get('data/transaction-benchmark.json').then(function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            },
            customerTransactionsMonthly: function () {
                var deferred = $q.defer();
                $http.get('data/transaction-benchmark.json').then(function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            },*/
            customerTransactions: function () {
                return $http.get('data/transaction-data.json');
            },
            customerTransactionsBenchmark: function () {
                return $http.get('data/transaction-benchmark.json');
            },
            customerTransactionsMonthly: function () {
                return $http.get('data/transaction-monthly-with-benchmark.json');
            },
            topSellingProducts: function () {
                return $http.get('data/top-selling-products.json');
            },
            randomData: function (range, maxValue) {
                return _.range(0, range).map(function (data) {
                    return Math.round(Math.random() * data * maxValue) % maxValue;
                });
            }
        };
    });
