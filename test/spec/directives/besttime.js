'use strict';

describe('Directive: bestTime', function () {

  // load the directive's module
  beforeEach(module('partnerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    /*element = angular.element('<best-time></best-time>');
    element = $compile(element)(scope);*/

  }));
});
