'use strict';

describe('Directive: rectChart', function () {

  // load the directive's module
  beforeEach(module('partnerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
   /* element = angular.element('<rect-chart></rect-chart>');
    element = $compile(element)(scope);*/

  }));
});
