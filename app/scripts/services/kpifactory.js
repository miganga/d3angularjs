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
            /*gives the sum of a given property index in an array of objects*/
            totalAmount: function(data, index) {
                return _.map(data,function(val,key) {
                    return val.values[index].value;
                })
                    .reduce(function(total,value,index,array) {
                        return Math.round(total + value);
                    },0);
            },
            /*gives the sum of a given property within the range of array index from a monthly report*/
            totalAmountWithRange: function(data, index, timePeriod) {
                switch (timePeriod) {
                    case "actual":
                        return _.map(data,function(val,key) {
                            return val.values[index].value;
                        })
                            .reduce(function(total,value,indice,array) {
                                return indice > 41 && index < 56 ? Math.round(total + value) : total;
                            },0);
                        break;
                    case "last":
                        return _.map(data,function(val,key) {
                            return val.values[index].value;
                        })
                            .reduce(function(total,value,indice,array) {
                                return indice > 27 && indice < 42 ? Math.round(total + value) : total;
                            },0);
                        break;
                    case "whole":
                        return _.map(data,function(val,key) {
                            return val.values[index].value;
                        })
                            .reduce(function(total,value,indice,array) {
                                return Math.round(total + value);
                            },0);
                        break;
                }
            },
            /*calculates the difference between two given inputs, returns it in abs format*/
            differenceAmount: function(x,y) {
                return Math.round(x-y);
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
