'use strict';

/**
 * @ngdoc directive
 * @name partnerApp.directive:rectanglePie
 * @description
 * # rectanglePie
 */
angular.module('partnerApp')
    .directive('rectanglePie', function () {
        return {
            template: '<div></div>',
            restrict: 'E',
            replace: true,
            scope: {
                rectData: '=',
                width: '=',
                height: '='
            },
            link: function postLink(scope, element, attrs) {
                /*scope.rectData.values extracted into an array*/
                var xData = _.map(scope.rectData, function (val, key, array) {
                    return val.values;
                });
                /*scope.rectData.name extracted into an array*/
                var xName = _.map(scope.rectData, function (val, key, array) {
                    return val.name;
                });

                /*every index exchanged by the sum of previous members*/
                var xxData = _.map(xData, function (val, key, array) {
                    return _.reduce(array, function (total, value, index, array) {
                        return index < key ? (total + value) : total;
                    }, 0);
                })
                /*sum of all array members*/
                var sumData = _.reduce(xData, function (total, value, index, array) {
                    return (total + value);
                }, 0);

                /*colors from left to right*/
                var colors = ['009cdf', '4fcbff', 'a6e5ff', 'c1c1c1', '6a6a6a'];

                var margin = {top: 0, right: 0, bottom: 0, left: 0},
                    width = scope.width - margin.left - margin.right,
                    height = scope.height - margin.top - margin.bottom;


                var x = d3.scale
                    .linear()
                    .domain([0, d3.sum(scope.rectData, function (d) {
                        return d.values;
                    })])
                    .range([0, width]);

                /*console.log(x);*/

                var xRange = d3.scale.ordinal()
                    .domain(xName)
                    .rangeRoundBands([0, width]);
                console.log(xRange);

                var xAxis = d3.svg.axis()
                    .scale(xRange)
                    .orient("bottom");

                var svg = d3.select(element[0]).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var color = d3.scale.category10()
                    .domain(d3.keys(xxData[0]).filter(function (key) {
                        return key === "name";
                    }));

                var rect = svg
                    .selectAll("rect")
                    .data(xxData)
                    .enter()
                    .append("rect")
                    .attr("x", function (d, i) {
                        return x(d);
                    })
                    .data(scope.rectData)
                    .attr("width", function (d) {
                        return width * d.values / sumData;
                    })
                    .attr("height", 100)
                    .data(colors)
                    .attr("style", function (d) {
                        return "fill:" + d;
                    });

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height / 2 + ")")
                    .call(xAxis);



            }
        };
    });
