'use strict';

xdescribe('Directive: lineChart', function () {

  // load the directive's module
  beforeEach(module('partnerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<line-chart></line-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the lineChart directive');
  }));
});
