'use strict';

/**
 * @ngdoc directive
 * @name partnerApp.directive:bestTime
 * @description
 * # bestTime
 */
angular.module('partnerApp')
  .directive('bestTime', function ($window) {
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
            controller: function($scope, organizeFactory, mockData) {
                /*tick labels for the bars*/
                $scope.labels = ["0-2","","4-6","","8-10","","12-14","","16-18","","20-22",""];
                /*amount of bars for the chart*/
                $scope.bars = [0,1,2,3,4,5,6,7,8,9,10,11];
                /*data to be inserted, same quantity as bars*/
                $scope.orders = mockData.randomData(12, 100);
                /*colors are organized by lowest, highest and mids*/
                $scope.colors = organizeFactory.colorPicker($scope.orders);
                /*console.log($scope.orders);*/
            },
            link: function postLink(scope, element, attrs) {

                /*colors from left to right*/
                var colors = ['009cdf', 'ffffff'];
                /*console.log(scope.bars);*/

                /*console.log(x(2));*/

                /*margin settings*/
                var margin = {top: 0, right: 0, bottom: 0, left: 0},
                    width = $window.innerWidth < 1024 ? 340 : scope.width - margin.left - margin.right,
                    height = scope.height - margin.top - margin.bottom;

                var svg = d3.select(element[0].children[0]).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)

                var x = d3.scale.linear()
                    .domain([0,7])
                    .range([0, width]);

                var y = d3.scale.linear()
                    .domain([0,100])
                    .range([0, scope.height-20]);

                /*enters the width & height for the rectangles, width is adjusted to the total width of the svg*/
                var rect = svg
                    .append("g")
                    .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
                    .selectAll("rect")
                    .data(scope.labels)
                    .enter()
                    .append("rect")
                    .attr("width", width/20)
                    .attr("height", height-20)
                    .attr("fill","#ffffff")
                    .data(scope.bars)
                    .attr("x",function(d,i){
                        return x(d)/1.7;
                    });

                var secondRect = svg
                    .append("g")
                    .attr('transform', 'translate(' + 0 + ',' + -20 + ')')
                    .selectAll("rect")
                    .data(scope.labels)
                    .enter()
                    .append("rect")
                    .attr("width", width/20)
                    .attr("fill","#000000")
                    .data(scope.bars)
                    .attr("x",function(d,i){
                        return x(d)/1.7;
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
                    .data(scope.labels)
                    .enter()
                    .append("text")
                    .attr("text-anchor","middle")
                    .data(scope.bars)
                    .attr("x",function(d,i){
                        return x(d)/1.7+width/40;
                    })
                    .data(scope.labels)
                    .text(function(d) {
                        return d;
                    });;

            }
        };
  });
