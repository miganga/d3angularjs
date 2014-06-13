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
            /*gives the sum of given array within the object array*/
            totalAmount: function(data, index) {
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
                var diff = this.differenceAmount(x,y)
                var average = Math.round((x+y)/2);
                return +((diff/average) * 100).toFixed(2) ;
            },
            /*returns the average of a given array*/
            average: function(array) {
                return _.reduce(array, function(memo, num)
                {
                    return memo + num;
                }, 0) / array.length;
            }
        }
  });
