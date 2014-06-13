'use strict';

/**
 * @ngdoc function
 * @name partnerApp.controller:OverviewCtrl
 * @description
 * # OverviewCtrl
 * Controller of the partnerApp
 */
angular.module('partnerApp')
  .controller('OverviewCtrl', function ($scope, mockData, customerTransactions, customerTransactionsBenchmark, customerTransactionsMonthly) {
        $scope.customerOrdersData = {};
        $scope.customerRevenueData = {};

        $scope.customerTransactionsData = customerTransactions.data;
        $scope.customerTransactionsBenchmark = customerTransactionsMonthly.data;


        /*Total transactions per customer*/
        $scope.customerOrdersData.totalNumber = Math.round(_.map($scope.customerTransactionsData.rows,function(val,key,memo) {
            return val.values[2].value;
        }).reduce(function(memo, num) {
            return memo + num;
        }));

        /*Total transaction count*/
        var transactionCountMonthly = _.map($scope.customerTransactionsBenchmark.rows,function(val,key) {
            return val.values[2].value;
        });

        /*Transaction Benchmark count*/
        $scope.customerOrdersData.totalNumberBenchmark = _.reduce(transactionCountMonthly, function(total,value,index,array) {
            return index > 21 && index < 21 + 7 ? total+value : total
        },0);

        /*Transaction Percentage, Change Amount, Monthly Average*/
        $scope.customerOrdersData.changeAmount = Math.abs($scope.customerOrdersData.totalNumber - $scope.customerOrdersData.totalNumberBenchmark);
        $scope.customerOrdersData.changePercentage = Math.round(($scope.customerOrdersData.totalNumber - $scope.customerOrdersData.totalNumberBenchmark) / $scope.customerOrdersData.totalNumberBenchmark * 100);
        $scope.customerOrdersData.monthlyAverage = Math.round(_.reduce(transactionCountMonthly, function (t, v, i) {
            return t + v;
        }, 0) / 4);


        /*Total revenues per customer*/
        $scope.customerRevenueData.totalNumber = Math.round(_.map($scope.customerTransactionsData.rows,function(val,key,memo) {
            return val.values[3].value;
        }).reduce(function(memo, num) {
            return memo + num;
        }));

        /*All revenue data in an array*/
        var revenueCountMonthly = _.map($scope.customerTransactionsBenchmark.rows,function(val,key) {
            return val.values[3].value;
        });

        /*Revenue Benchmark count*/
        $scope.customerRevenueData.totalNumberBenchmark = _.reduce(revenueCountMonthly, function(total,value,index,array) {
            return index > 21 && index < 21 + 7 ? total+value : total
        },0);

        /*Transaction Percentage, Change Amount, Monthly Average*/
        $scope.customerRevenueData.changeAmount = Math.round(Math.abs($scope.customerRevenueData.totalNumber - $scope.customerRevenueData.totalNumberBenchmark));
        $scope.customerRevenueData.changePercentage = Math.round(($scope.customerRevenueData.totalNumber - $scope.customerRevenueData.totalNumberBenchmark) / $scope.customerRevenueData.totalNumberBenchmark * 100);
        $scope.customerRevenueData.monthlyAverage = Math.round(_.reduce(revenueCountMonthly, function (t, v, i) {
            return t + v;
        }, 0) / 4);



        // TODO abstract it to all the report types
        /*calculates a range of data from an object */
        var calculateRange = function (objectArray, week) {
            return _.map(objectArray, function (val, key) {
                return val.values[2].value;
            })
                .reduce(function (total, value, index, array) {
                    return index > array.length - end && index < array.length - start ? total + value : total
                }, 0);
        };


        // TODO make it a factory
        function average (arr)
        {
            return _.reduce(arr, function(memo, num)
            {
                return memo + num;
            }, 0) / arr.length;
        }


        /*Pie Stuff*/
        $scope.superData = _.range(1,30);
        $scope.superData = _.map($scope.superData, function(num) {
            return Math.round(Math.random() * num * 100)%100;
        });

        $scope.maxValue = _.max($scope.superData);
        $scope.minValue = _.min($scope.superData);
        $scope.averageValue = Math.round(average($scope.superData));

        $scope.superDouble = _.range(1,20).map(function(data) {
            return [data,Math.round(Math.random() * data * 100)%100];
        });

  });
