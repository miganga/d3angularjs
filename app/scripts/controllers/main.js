'use strict';

/**
 * @ngdoc function
 * @name partnerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the partnerApp
 */
angular.module('partnerApp')
    .controller('MainCtrl', function ($scope) {
        function average (arr)
        {
            return _.reduce(arr, function(memo, num)
            {
                return memo + num;
            }, 0) / arr.length;
        }
        $scope.superData = _.range(1,20);
        $scope.superData = _.map($scope.superData, function(num) {
           return Math.round(Math.random() * num * 100)%100;
        });
        $scope.maxValue = _.max($scope.superData);
        $scope.minValue = _.min($scope.superData);
        $scope.averageValue = Math.round(average($scope.superData));
        console.log($scope.superData);
        console.log($scope.maxValue);
        console.log($scope.minValue);
        console.log($scope.averageValue);
        $scope.data = {
            header: "Average Order Value",
            data: {
                data: $scope.superData
            }
        }
    });
