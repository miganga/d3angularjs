'use strict';

xdescribe('Controller: BenchmarkCtrl', function () {

  // load the controller's module
  beforeEach(module('partnerApp'));

  var BenchmarkCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BenchmarkCtrl = $controller('BenchmarkCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
