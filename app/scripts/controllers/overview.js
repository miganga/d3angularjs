'use strict';

/**
 * @ngdoc function
 * @name partnerApp.controller:OverviewCtrl
 * @description
 * # OverviewCtrl
 * Controller of the partnerApp
 */
angular.module('partnerApp')
    .controller('OverviewCtrl', function ($scope, mockData, Kpifactory, customerTransactions, customerTransactionsMonthly, topSellingProducts, transactions, transactionsBenchmark) {
        console.log('transactions Benchmark', transactions);
        //console.log('transactions Benchmark sorted', Kpifactory.sortByDate(transactionsBenchmark.rows, 0));
        $scope.customerOrdersData = {};
        $scope.customerRevenueData = {};
        $scope.customerProductData = {};
        $scope.mostNotableChanges = [
            {
                type: "Returning Customer Rates",
                lastWeek: "18%",
                changePercentage: 7,
                changeAmount: 1,
                lineData: [1, 2, 3, 4, 5, 6, 56, 7, 8, 98, 34]
            },
            {
                type: "Average Order Value (AOV)",
                lastWeek: "€38",
                changePercentage: 10,
                changeAmount: 5,
                lineData: [1, 2, 3, 4, 5, 6, 56, 7, 8, 98, 34]
            },
            {
                type: "Products Per Order (PPO)",
                lastWeek: "1.8",
                changePercentage: 9,
                changeAmount: 9,
                lineData: [1, 2, 3, 4, 5, 6, 56, 7, 8, 98, 34]
            },
            {
                type: "Customer Satisfaction",
                lastWeek: "67%",
                changePercentage: -11,
                changeAmount: 3,
                lineData: [1, 2, 3, 4, 5, 6, 56, 7, 8, 98, 34]
            },
            {
                type: "Review Conversion",
                lastWeek: "32%",
                changePercentage: -16,
                changeAmount: 7,
                lineData: [1, 2, 3, 4, 5, 6, 56, 7, 8, 98, 34]
            },
            {
                type: "Return Rate (RR)",
                lastWeek: "1.2%",
                changePercentage: -5,
                changeAmount: 9,
                lineData: [1, 2, 3, 4, 5, 6, 56, 7, 8, 98, 34]
            }
        ];

        $scope.customerLoyalty = [
            {
                type: "Average Order Value (AOV)",
                overall: "43 €",
                newCustomers: "39 €",
                returningCustomers: "47 €",
                lineData: [1, 2, 3, 4, 5, 6, 56, 7, 8, 98, 34]
            },
            {
                type: "Revenue Share",
                overall: "100 %",
                newCustomers: "42 %",
                returningCustomers: "58 %",
                lineData: [1, 2, 3, 4, 5, 6, 56, 7, 8, 98, 34]
            },
            {
                type: "Items Per Order",
                overall: "1.4",
                newCustomers: "1.2",
                returningCustomers: "1.8",
                lineData: [1, 2, 3, 4, 5, 6, 56, 7, 8, 98, 34]
            },
            {
                type: "Average TBP*",
                overall: "51 days",
                newCustomers: "-",
                returningCustomers: "51 days",
                lineData: [1, 2, 3, 4, 5, 6, 56, 7, 8, 98, 34]
            },
            {
                type: "Life Time Value",
                overall: "147 €",
                newCustomers: "147 €",
                returningCustomers: "147 €",
                lineData: [1, 2, 3, 4, 5, 6, 56, 7, 8, 98, 34]
            }
        ];

        $scope.topOrders = [
            {
                items: "5",
                value: "245",
                time: "Sun, 2:41pm",
                location: "Berlin, Germany",
                mostExpensiveProduct: 'Mac Book Mag safe Charger'
            },
            {
                items: "3",
                value: "45",
                time: "Tue, 4:41am",
                location: "Faer, Jamaica",
                mostExpensiveProduct: 'Banana Flavoured Blunt Wrap'
            },
            {
                items: "2",
                value: "300",
                time: "Thu, 7:41pm",
                location: "Sicily, Italy",
                mostExpensiveProduct: 'Wusthoff Butcher Knife Set'
            }

        ];

        $scope.topFiveCategories = [
            {name: 'DVD', values: 35},
            {name: 'Electronics', values: 25},
            {name: 'Games', values: 12.5},
            {name: 'GiftCards', values: 12.5},
            {name: 'Flowers', values: 12.5}
        ];

        /*REST API data*/
        /*$scope.customerTransactions = transactions;
         $scope.customerTransactionsMonthly = transactionsBenchmark;*/
        $scope.customerTransactions = customerTransactions.data;
        //console.log(customerTransactions.data);
        $scope.customerTransactionsMonthly = customerTransactionsMonthly.data;
        $scope.topSellingProducts = topSellingProducts.data;

        /*TRANSACTION DATA, FIRST KPI*/

        /*Total transactions per customer*/
        $scope.customerOrdersData.totalNumber = Kpifactory.totalAmountWithRange($scope.customerTransactions.rows, 2, 'whole');

        /*Total transactions by day in an array*/
        $scope.transactionCountMonthly = Kpifactory.arrayConvert($scope.customerTransactionsMonthly.benchmarkResult.rows, 2);

        /*Total transactions per customer - Benchmark*/
        $scope.customerOrdersData.totalNumberBenchmark = Kpifactory.totalAmountWithRange($scope.customerTransactionsMonthly.benchmarkResult.rows, 2, 'last');

        /*Transaction Percentage, Change Amount, Monthly Average*/
        $scope.customerOrdersData.changeAmount = Math.abs(Kpifactory.differenceAmount($scope.customerOrdersData.totalNumber, $scope.customerOrdersData.totalNumberBenchmark));
        $scope.customerOrdersData.changePercentage = Kpifactory.differencePercentage($scope.customerOrdersData.totalNumber, $scope.customerOrdersData.totalNumberBenchmark);
        $scope.customerOrdersData.isPositive = $scope.customerOrdersData.changePercentage > 0;
        $scope.customerOrdersData.monthlyAverage = Kpifactory.average($scope.transactionCountMonthly);
        $scope.customerOrdersData.weeklyAverage = $scope.customerOrdersData.monthlyAverage * 7;

        /*REVENUE DATA; SECOND KPI*/

        /*Total revenues per customer*/
        $scope.customerRevenueData.totalNumber = Kpifactory.totalAmountWithRange($scope.customerTransactionsMonthly.rows, 3, 'actual');

        /*Total revenue by day in an array*/
        $scope.revenueCountMonthly = Kpifactory.arrayConvert($scope.customerTransactionsMonthly.benchmarkResult.rows, 3);

        $scope.customerRevenueData.totalNumberBenchmark = Kpifactory.totalAmountWithRange($scope.customerTransactionsMonthly.benchmarkResult.rows, 3, 'last');

        /*Transaction Percentage, Change Amount, Monthly Average*/
        $scope.customerRevenueData.changeAmount = Math.round(Kpifactory.differenceAmount($scope.customerRevenueData.totalNumber, $scope.customerRevenueData.totalNumberBenchmark));
        $scope.customerRevenueData.changePercentage = Kpifactory.differencePercentage($scope.customerRevenueData.totalNumber, $scope.customerRevenueData.totalNumberBenchmark);
        $scope.customerRevenueData.isPositive = $scope.customerRevenueData.changePercentage > 0;
        $scope.customerRevenueData.monthlyAverage = Kpifactory.average($scope.revenueCountMonthly);
        $scope.customerRevenueData.weeklyAverage = $scope.customerRevenueData.monthlyAverage * 7;

        /*PRODUCT DATA; THIRD KPI*/

        /*Total products per customer*/
        $scope.customerProductData.totalNumber = Kpifactory.totalAmountWithRange($scope.customerTransactionsMonthly.rows, 3, 'actual');

        /*Total Product by day in an array*/
        var ProductCountMonthly = Kpifactory.arrayConvert($scope.customerTransactionsMonthly.benchmarkResult.rows, 3);

        $scope.customerProductData.totalNumberBenchmark = Kpifactory.totalAmountWithRange($scope.customerTransactionsMonthly.benchmarkResult.rows, 3, 'last');

        /*Transaction Percentage, Change Amount, Monthly Average*/
        $scope.customerProductData.changeAmount = Math.round(Kpifactory.differenceAmount($scope.customerProductData.totalNumber, $scope.customerProductData.totalNumberBenchmark));
        $scope.customerProductData.changePercentage = Kpifactory.differencePercentage($scope.customerProductData.totalNumber, $scope.customerProductData.totalNumberBenchmark);
        $scope.customerProductData.isPositive = $scope.customerProductData.changePercentage > 0;
        $scope.customerProductData.monthlyAverage = Kpifactory.average(ProductCountMonthly);
        $scope.customerProductData.weeklyAverage = $scope.customerProductData.monthlyAverage * 7;

        // TODO make it a factory maybe...
        function average(arr) {
            return _.reduce(arr, function (memo, num) {
                return memo + num;
            }, 0) / arr.length;
        }


        /*MOST NOTABLE CHANGES */
        $scope.reverseUp = false;
        $scope.reverseDown = false;
        $scope.sorter = 'changePercentage';


        /*Pie Stuff*/
        $scope.superData = _.range(1, 30);
        $scope.superData = _.map($scope.superData, function (num) {
            return Math.round(Math.random() * num * 100) % 100;
        });

        $scope.maxValue = _.max($scope.superData);
        $scope.minValue = _.min($scope.superData);
        $scope.averageValue = Math.round(average($scope.superData));

        $scope.superDouble = _.range(1, 20).map(function (data) {
            return [data, Math.round(Math.random() * data * 100) % 100];
        });
    });
