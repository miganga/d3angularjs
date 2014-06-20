'use strict';

/**
 * @ngdoc directive
 * @name partnerApp.directive:bestDay
 * @description
 * # bestDay
 */
angular.module('partnerApp')
  .directive('bestDay', function () {
        return {
            template: '<div class="rectchart"><div></div></div>',
            restrict: 'E',
            replace: true,
            scope: {
                rectData: '=',
                changePercentage: '=',
                width: '=',
                height: '='
            },
            controller: function($scope, organizeFactory) {
                $scope.days = ["M.","T.","W.","T.","F.","S.","S."];
                $scope.daysN = [0,1,2,3,4,5,6];
                $scope.orders = [10.3,10.66,10.33,50.99,5.12,10.11,10.2];
                $scope.colors = organizeFactory.colorPicker($scope.orders);
                //console.log($scope.colors);
            },
            link: function postLink(scope, element, attrs) {

                /*colors from left to right*/
                var colors = ['009cdf', 'ffffff'];
                console.log(scope.daysN);

                var x = d3.scale.linear()
                    .domain([0,7])
                    .range([0, scope.width]);

                var y = d3.scale.linear()
                    .domain([0,100])
                    .range([0, scope.height-20]);

                console.log(x(2));

                /*margin settings*/
                var margin = {top: 0, right: 0, bottom: 0, left: 0},
                    width = scope.width - margin.left - margin.right,
                    height = scope.height - margin.top - margin.bottom;

                var svg = d3.select(element[0].children[0]).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)

                /*enters the width & height for the rectangles, width is adjusted to the total width of the svg*/
                var rect = svg
                    .append("g")
                    .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
                    .selectAll("rect")
                    .data(scope.days)
                    .enter()
                    .append("rect")
                    .attr("width", width/10)
                    .attr("height", height-20)
                    .attr("fill","#ffffff")
                    .data(scope.daysN)
                    .attr("x",function(d,i){
                        return x(d);
                    });

                var secondRect = svg
                    .append("g")
                    .attr('transform', 'translate(' + 0 + ',' + -20 + ')')
                    .selectAll("rect")
                    .data(scope.days)
                    .enter()
                    .append("rect")
                    .attr("width", width/10)
                    .attr("fill","#000000")
                    .data(scope.daysN)
                    .attr("x",function(d,i){
                        return x(d);
                    })
                    .data(scope.orders)
                    .attr("height",function(d,i){
                        return y(d);
                    })
                    .attr("y",function(d,i){
                        return scope.height - y(d);
                    })
                    .data(scope.colors)
                    .attr("fill", function(d) {
                        return d;
                    });

                var textDays = svg
                    .append("g")
                    .attr('transform', 'translate(' + 0 + ',' + 105 + ')')
                    .selectAll("g")
                    .data(scope.days)
                    .enter()
                    .append("text")
                    .attr("text-anchor","middle")
                    .data(scope.daysN)
                    .attr("x",function(d,i){
                        return x(d)+width/20;
                    })
                    .data(scope.days)
                    .text(function(d) {
                        return d;
                    });;

            }
        };
  });
