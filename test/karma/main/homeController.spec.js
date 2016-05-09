'use strict';

describe('HomeController', function () {
  beforeEach(module('main'));

  var ctrl, JourneyService;

  beforeEach(inject(function ($controller, _JourneyService_) {
    ctrl = $controller('HomeController');
    JourneyService = _JourneyService_;
  }));

  it('starts a new journey', function () {
    ctrl.startJourney();
    expect(JourneyService.startJourney).toHaveBeenCalled;
  });
});
