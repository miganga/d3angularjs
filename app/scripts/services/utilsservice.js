'use strict';

/**
 * @ngdoc service
 * @name partnerApp.Utilsservice
 * @description
 * # Utilsservice
 * Service in the partnerApp.
 */
angular.module('partnerApp')
  .service('UtilsService', function Utilsservice() {
    return {
        checkSign: function(number) {
            return number > 0;
        }
    };
  });
