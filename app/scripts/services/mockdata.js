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
            customerTransactions: function () {
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
            },
            cTD: function () {
                return $http.get('data/transaction-data.json')
            },
            cTB: function () {
                return $http.get('data/transaction-benchmark.json');
            },
            cTM: function () {
                return $http.get('data/transaction-benchmark.json');
            }
        };
    });
