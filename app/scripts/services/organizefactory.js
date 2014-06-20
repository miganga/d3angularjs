'use strict';

/**
 * @ngdoc service
 * @name partnerApp.organizeFactory
 * @description
 * # organizeFactory
 * Factory in the partnerApp.
 */
angular.module('partnerApp')
  .factory('organizeFactory', function () {

    return {
      colorPicker: function (data) {
          var max_value = _.max(data, function(x) {
              return x;
          });
          var max_value_index = _.reduce(data, function(t,x,y,z) {
              return x == max_value ? y + t : t;
          },0)
          var min_value = _.min(data, function(x) {
              return x;
          });
          var min_value_index = _.reduce(data, function(t,x,y,z) {
              return x == min_value ? y + t : t;
          },0);
          return _.map(data, function(x) {
              switch (x) {
                  case max_value:
                      return '#6ebe59';
                      break;
                  case min_value:
                      return '#ff7a78';
                      break;
                  default:
                      return '#bbb9ba';
                      break;
              }
          });
      }
    };
  });
