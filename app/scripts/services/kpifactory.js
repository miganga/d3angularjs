'use strict';

/**
 * @ngdoc service
 * @name partnerApp.Kpifactory
 * @description
 * # Kpifactory
 * Service in the partnerApp.
 */
angular.module('partnerApp.services')
  .service('Kpifactory', function Kpifactory() {
    // AngularJS will instantiate a singleton by calling "new" on this function

        return {
            /*converts an object property into an array of values by the given index*/
            arrayConvert: function(object, index) {
                return _.map(object,function(val,key) {
                    return val.values[index].value;
                });
            },
            // TODO make the function to extract data per a timeframe daily, monthly, weekly per index
            /*gives the sum of a given property within the array of objects by a time period( actual, last week, etc 1,2,3,4 max.)*/
            totalAmount: function(data, index, timePeriod) {
                return _.map(data,function(val,key) {
                    return val.values[index].value;
                })
                    .reduce(function(total,value,index,array) {
                        return Math.round(total + value);
                    },0);
            },
            /*calculates the difference between two given inputs, returns it in abs format*/
            differenceAmount: function(x,y) {
                return Math.abs(Math.round(x-y));
            },
            /*returns the percentage of difference between two given inputs, percentage symbol not needed*/
            differencePercentage: function(x,y) {
                var diff = this.differenceAmount(x,y);
                var average = Math.round((x+y)/2);
                return +((diff/average) * 100).toFixed(2) ;
            },
            /*returns the average of a given array*/
            average: function(array) {
                return Math.round(_.reduce(array, function(memo, num)
                {
                    return memo + num;
                }, 0) / array.length);
            },
            /*topValue method should return the highest number within an array of properties of an object*/
            topValue: function(object, index) {
                return _.map(object,function(val,key) {
                    return val.values[index].value;
                })
                    .reduce(function(total,value,index,array) {
                        return total < value ? total = Math.round(value) : total;
                    },0);
            }
        }
  });
