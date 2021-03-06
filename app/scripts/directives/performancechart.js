'use strict';

/**
 * @ngdoc directive
 * @name partnerApp.directive:performanceChart
 * @description
 * # performanceChart
 */
angular.module('partnerApp')
    .directive('performanceChart', function ($window) {
        return {
            templateUrl: 'views/performancechart.html',
            restrict: 'E',
            replace: true,
            scope: {
                lineData: '=',
                width: '=',
                height: '='
            },
            controller: function ($scope, mockData) {
                $scope.randomData = mockData.randomData(7, 300);
                $scope.randomDataB = mockData.randomData(7, 300);
            },
            link: function postLink(scope, element, attrs) {
                // define dimensions of graph
                var m = [50, 50, 50, 50]; // margins
                var w = $window.innerWidth < 1024 ? 650 : (scope.width - m[1] - m[3]); // width
                var h = scope.height - m[0] - m[2]; // height

                var dataC = scope.randomData;
                var dataB = scope.randomDataB;

                /*var base = d3.select(element[0])
                 .append("svg")
                 .attr("width", w + m[1] + m[3])
                 .attr("height", h + m[0] + m[2])
                 .append("g")
                 .attr("class", "chart");

                 var x_scale = d3.scale.linear()
                 .domain([0,30])
                 .range([m[1]+m[3]],w);

                 var y_extent = d3.extent(data, function(d) {
                 return d;
                 })

                 var y_scale = d3.scale.linear()
                 .domain([_.min(data), _.max(data)])
                 .range([h-m[0]-m[2]],m[0]+m[2]);

                 var line = d3.svg.line()
                 .x(function(d,i){
                 return x_scale(i);
                 })
                 .y(function(d) {
                 return y_scale(d);
                 });

                 base
                 .append("path")
                 .attr("d", line(data));*/

                var y_range = [_.min([_.min(dataB), _.min(dataC)]), _.max([_.max(dataB), _.max(dataC)])];
                //console.log(y_range);


                var x = d3.scale.linear()
                    .domain([0, dataB.length])
                    .range([0, w]);

                var y = d3.scale.linear()
                    .domain(y_range)
                    .range([h, 0]);

                var line = d3.svg.line()
                    .x(function (d, i) {
                        return x(i);
                    })
                    .y(function (d) {
                        return y(d);
                    })
                    .interpolate("linear");

                var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

                var base = d3.select(element[0]).append("svg:svg")
                    .attr("class", "performance")
                    .attr("width", w + m[1] + m[3])
                    .attr("height", h + m[0] + m[2]);

                var graph = base
                    .append("svg:g")
                    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

                graph.append("svg:path")
                    .attr("fill", "white")
                    .attr("d", line(dataB));

                graph.append("svg:path")
                    .attr("d", line(dataC));

                var x_axis_scale = d3.scale.linear()
                    .domain([0, days.length])
                    .range([0, w]);

                var x_axis = d3.svg.axis()
                    .scale(x_axis_scale)
                    .ticks(10)
                    .tickSize(15, 10)
                    .tickFormat(function (d) {
                        return days[d];
                    });

                var x_axis_scale_thin = d3.scale.linear()
                    .domain([0, dataB.length])
                    .range([0, w]);

                var x_axis_thin = d3.svg.axis()
                    .scale(x_axis_scale_thin)
                    .ticks(184)
                    .tickFormat(" ");

                /*d3.selectAll("svg")
                 .append("g")
                 .attr("class","x-axis")
                 .attr("transform","translate("+ m[1] +"," + (h + m[0]) + ")")
                 .call(x_axis);*/

                /*var x_scale = d3.scale.ordinal()
                 .domain(["Mon","Tue","Wed","Thu","Fri","Sat","Sun"])
                 .rangePoints([0, w]);

                 var xAxis = d3.svg.axis()
                 .scale(x_scale)
                 .ticks(200)
                 .orient("bottom");*/

                base
                    .append("g")
                    .attr("class", "x-axis")
                    .attr("transform", "translate(" + (m[1]) + "," + (h + m[0] + 5) + ")")
                    .call(x_axis)
                    .selectAll("text")
                    .attr("x", "-30")
                    .attr("y", "10")
                    .attr("transform", function (d) {
                        return "rotate(320)";
                    });

                base
                    .append("g")
                    .attr("class", "x-axis")
                    .attr("transform", "translate(" + (m[1]) + "," + (h + m[0] + 5) + ")")
                    .call(x_axis_thin);

                var y_s = d3.scale.linear()
                    .domain(y_range)
                    .range([h, 0]);

                var yAxis = d3.svg.axis()
                    .scale(y_s)
                    .ticks(10)
                    .tickSize(10, 20)
                    .tickFormat("")
                    .orient("left");

                var yAxisThin = d3.svg.axis()
                    .scale(y_s)
                    .ticks(50)
                    .tickSize(5, 20)
                    .tickFormat("")
                    .orient("left");

                base
                    .append("g")
                    .attr("class", "y-axis")
                    .attr("transform", "translate(" + (m[1] - 5) + "," + (m[0]) + ")")
                    .call(yAxis);

                base
                    .append("g")
                    .attr("class", "y-axis")
                    .attr("transform", "translate(" + (m[1] - 5) + "," + (m[0]) + ")")
                    .call(yAxisThin);


            }
        };
    });
