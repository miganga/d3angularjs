'use strict';

/**
 * @ngdoc function
 * @name partnerApp.controller:OverviewCtrl
 * @description
 * # OverviewCtrl
 * Controller of the partnerApp
 */
angular.module('partnerApp')
  .controller('OverviewCtrl', function ($scope, mockData, Kpifactory, customerTransactions, customerTransactionsBenchmark, customerTransactionsMonthly) {
        $scope.customerOrdersData = {};
        $scope.customerRevenueData = {};

        $scope.customerTransactionsData = customerTransactions.data;
        $scope.customerTransactionsBenchmark = customerTransactions.data.benchmarkResult;
        $scope.customerTransactionsMonthly = customerTransactionsMonthly.data;

        /*Total transactions per customer*/
        $scope.customerOrdersData.totalNumber = Kpifactory.totalAmount($scope.customerTransactionsData.rows,2);

        // TODO need to refactor once the data flow is more clear
        /*Total transaction count*/
        var transactionCountMonthly = _.map($scope.customerTransactionsBenchmark.rows,function(val,key) {
            return val.values[2].value;
        });

        // TODO need to refactor once the data flow is more clear
        /*Transaction Benchmark count*/
        $scope.customerOrdersData.totalNumberBenchmark = _.reduce(transactionCountMonthly, function(total,value,index,array) {
            return index > 21 && index < 21 + 7 ? total+value : total
        },0);

        /*Transaction Percentage, Change Amount, Monthly Average*/
        $scope.customerOrdersData.changeAmount = Kpifactory.differenceAmount($scope.customerOrdersData.totalNumber, $scope.customerOrdersData.totalNumberBenchmark);
        $scope.customerOrdersData.changePercentage = Kpifactory.differencePercentage($scope.customerOrdersData.totalNumber, $scope.customerOrdersData.totalNumberBenchmark);
        $scope.customerOrdersData.monthlyAverage = Kpifactory.average(transactionCountMonthly);

        // TODO need to refactor once the data flow is more clear
        /*Total revenues per customer*/
        $scope.customerRevenueData.totalNumber = Kpifactory.totalAmount($scope.customerTransactionsData.rows, 3);

        // TODO need to refactor once the data flow is more clear
        /*All revenue data in an array*/
        var revenueCountMonthly = _.map($scope.customerTransactionsBenchmark.rows,function(val,key) {
            return val.values[3].value;
        });

        // TODO need to refactor once the data flow is more clear
        /*Revenue Benchmark count*/
        $scope.customerRevenueData.totalNumberBenchmark = _.reduce(revenueCountMonthly, function(total,value,index,array) {
            return index > 21 && index < 21 + 7 ? total+value : total
        },0);

        /*Transaction Percentage, Change Amount, Monthly Average*/
        $scope.customerRevenueData.changeAmount = Kpifactory.differenceAmount($scope.customerRevenueData.totalNumber, $scope.customerRevenueData.totalNumberBenchmark);
        $scope.customerRevenueData.changePercentage = Kpifactory.differencePercentage($scope.customerRevenueData.totalNumber, $scope.customerRevenueData.totalNumberBenchmark);
        $scope.customerRevenueData.monthlyAverage = Kpifactory.average(revenueCountMonthly);

        // TODO make it a factory
        function average (arr)
        {
            return _.reduce(arr, function(memo, num)
            {
                return memo + num;
            }, 0) / arr.length;
        }

        /*Returning Customer Rate*/
        $scope.returningCustomerRate =



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
