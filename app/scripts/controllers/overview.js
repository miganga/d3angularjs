'use strict';

/**
 * @ngdoc function
 * @name partnerApp.controller:OverviewCtrl
 * @description
 * # OverviewCtrl
 * Controller of the partnerApp
 */
angular.module('partnerApp')
  .controller('OverviewCtrl', function ($scope, mockData) {
        $scope.customerOrdersData = {};
        /*Transaction Data*/
        var promise = mockData.customerTransactions();
        promise.then(function(data) {
            var promiseBenchmark = mockData.customerTransactionsBenchmark();
            promiseBenchmark.then(function(dataT) {
                var promiseMonthly = mockData.customerTransactionsMonthly();
                promiseMonthly.then(function(dataM) {
                    $scope.customerTransactionsData = data.data;
                    $scope.customerTransactionsBenchmark = dataT.data;
                    $scope.customerTransactionsMonthlyData = dataM.data;

                    /*Total transactions per customer*/
                    $scope.customerOrdersData.totalNumber = Math.round(_.map($scope.customerTransactionsData.rows,function(val,key,memo) {
                        return val.values[2].value;
                    }).reduce(function(memo, num) {
                        return memo + num;
                    }));

                    /*calculates a range of data from an object */
                    var calculateRange = function (objectArray, week) {
                        return _.map(objectArray, function (val, key) {
                            return val.values[2].value;
                        })
                            .reduce(function (total, value, index, array) {
                                return index > array.length - end && index < array.length - start ? total + value : total
                            }, 0);
                    };

                    /*All count data in an array*/
                    var transactionCountMonthly = _.map($scope.customerTransactionsBenchmark.rows,function(val,key) {
                        return val.values[2].value;
                    });

                    $scope.customerOrdersData.totalNumberBenchmark = _.reduce(transactionCountMonthly, function(total,value,index,array) {
                        return index > 21 && index < 21 + 7 ? total+value : total
                    },0);

                    $scope.customerOrdersData.changeAmount = Math.abs($scope.customerOrdersData.totalNumber - $scope.customerOrdersData.totalNumberBenchmark);
                    $scope.customerOrdersData.changePercentage = Math.round(($scope.customerOrdersData.totalNumber - $scope.customerOrdersData.totalNumberBenchmark) / $scope.customerOrdersData.totalNumberBenchmark * 100);
                    $scope.customerOrdersData.monthlyAverage = Math.round(_.reduce(transactionCountMonthly, function (t, v, i) {
                        return t + v;
                    }, 0) / 4);
                    //console.log($scope.customerOrdersData.monthlyAverage);
                });
            });
        });


        function average (arr)
        {
            return _.reduce(arr, function(memo, num)
            {
                return memo + num;
            }, 0) / arr.length;
        }
        $scope.superDouble = _.range(1,20).map(function(data) {
            return [data,Math.round(Math.random() * data * 100)%100];
        });
        //console.log($scope.superDouble);
        /*Pie Stuff*/
        $scope.superData = _.range(1,20);
        $scope.superData = _.map($scope.superData, function(num) {
            return Math.round(Math.random() * num * 100)%100;
        });

        $scope.maxValue = _.max($scope.superData);
        $scope.minValue = _.min($scope.superData);
        $scope.averageValue = Math.round(average($scope.superData));

        /*console.log($scope.superData);
         console.log($scope.maxValue);
         console.log($scope.minValue);
         console.log($scope.averageValue);*/
        /*$scope.data = {
            pieHeader: "Average Order Value",
            lineHeader: "Products Sold",
            data: {
                data: $scope.superData
            }
        }*/

  });
