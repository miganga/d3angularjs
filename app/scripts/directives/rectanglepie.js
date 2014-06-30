'use strict';

/**
 * @ngdoc directive
 * @name partnerApp.directive:rectanglePie
 * @description
 * # rectanglePie
 */
angular.module('partnerApp')
    .directive('rectanglePie', function ($window) {
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

                /*scope.rectData.values extracted into an array with percentage signs*/
                var xDataWithPercentages = _.map(scope.rectData, function (val, key, array) {
                    return val.values + "%";
                });

                var bars = [1,2,3,4,5];


                /*scope.rectData.name extracted into an array*/
                var xName = _.map(scope.rectData, function (val, key, array) {
                    return val.name;
                });

                /*every index exchanged by the sum of previous members*/
                var xxData = _.map(xData, function (val, key, array) {
                    return _.reduce(array, function (total, value, index, array) {
                        return index < key ? (total + value) : total;
                    }, 0);
                });

                /*sum of all array members*/
                var sumData = _.reduce(xData, function (total, value, index, array) {
                    return (total + value);
                }, 0);

                /*sets up the array for the category axis*/
                var tick_data = xxData.slice(0);
                tick_data.push(sumData);
                var ticker = _.map(tick_data, function (val, key, array) {
                    return _.reduce(array, function (total, value, index, array) {
                        return index < key+2 && index > key-1 ? (total + value) : total;
                    }, 0);
                });
                ticker.pop();
                /*every value is divided by 2 to center*/
                var new_ticker = _.map(ticker, function (val, key, array) {
                    return val / 2;
                });

                /*colors from left to right*/
                var colors = ['rgb(0, 156, 223)', 'rgb(79, 203, 255)', 'rgb(166, 229, 255)', 'rgb(193, 193, 193)', 'rgb(106, 106, 106)'];

                var margin = {top: 0, right: 0, bottom: 0, left: 0},
                    width = $window.innerWidth < 1024 ? 340 : scope.width - margin.left - margin.right,
                    height = scope.height - margin.top - margin.bottom;


                var category_heights = [0, 50, 0, 50, 0];

                var x = d3.scale
                    .linear()
                    .domain([0, d3.sum(scope.rectData, function (d) {
                        return d.values;
                    })])
                    .range([0, width]);


                /*Ticks for the Categories*/
                var xRange = d3.scale.ordinal()
                    .domain(xName)
                    .rangeRoundBands([0, width]);

                /*Ticks for the Percentages*/
                var xPercentage = d3.scale.ordinal()
                    .domain(bars)
                    .rangeBands([0, width]);

                /*Axis for the Categories*/
                var xAxis = d3.svg.axis()
                    .scale(xRange)
                    .orient("bottom");

                /*Axis for the Percentages*/
                var xPercentageAxis = d3.svg.axis()
                    .scale(xPercentage)
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

                console.log(xName);

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
                    .attr("class", "x-axis")
                    .attr("transform", "translate(0," + ((height / 2) - 45) + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "x-p-axis")
                    .attr("transform", "translate(0," + ((height / 2) - 45) + ")")
                    .call(xPercentageAxis);

                svg
                    .select(".x-axis")
                    .selectAll("g")
                    .data(new_ticker)
                    .attr("transform", function (d,i) {
                        return "translate(" + (x(d)) + "," +(i%2 !== 0 ? 90 : 40)+")";
                    });

                svg
                    .select(".x-axis")
                    .selectAll("g")
                    .select("line")
                    .data(new_ticker)
                    .attr("y2",function (d,i) {
                        return (i%2 !== 0 ? -60 : -15);
                    });

                svg
                    .select(".x-axis")
                    .selectAll("g")
                    .select("text")
                    .data(new_ticker)
                    .attr("y",function (d,i) {
                        return (26);
                    });

                svg
                    .select(".x-p-axis")
                    .selectAll("g")
                    .data(new_ticker)
                    .attr("transform", function (d,i) {
                        return "translate(" + (x(d)) + "," +(i%2 !== 0 ? 70 : 20)+")";
                    });

                svg
                    .select(".x-p-axis")
                    .selectAll("g")
                    .select("line")
                    .data(new_ticker)
                    .attr("y2",function (d,i) {
                        return (i%2 !== 0 ? -60 : -15);
                    });

                svg
                    .select(".x-p-axis")
                    .selectAll("g")
                    .select("text")
                    .data(new_ticker)
                    .attr("y",function (d,i) {
                        return (26);
                    });

                svg
                    .select(".x-p-axis")
                    .selectAll("g")
                    .select("text")
                    .attr("class", "bold")
                    .data(xDataWithPercentages)
                    .text(function(d) {
                        return d;
                    });
            }
        };
    });
