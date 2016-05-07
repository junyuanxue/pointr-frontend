'use strict';

describe('JourneyController', function () {
  beforeEach(module('main'));

  var ctrl, JourneyFactory, WaypointFactory;

  beforeEach(inject(function($controller, _JourneyFactory_, _WaypointFactory_) {
    ctrl = $controller('JourneyController');
    JourneyFactory = _JourneyFactory_;
    WaypointFactory = _WaypointFactory_;
  }));

  it('starting a new journey', function() {
    ctrl.startJourney();
    expect(ctrl.journey).not.toBe(undefined);
  });
});
