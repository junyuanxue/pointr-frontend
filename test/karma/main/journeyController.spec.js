'use strict';

describe('JourneyController', function () {
  beforeEach(module('main'));

  var ctrl, JourneyService, WaypointService;

  beforeEach(inject(function ($controller, _JourneyService_, _WaypointService_) {
    ctrl = $controller('JourneyController');
    JourneyService = _JourneyService_;
    WaypointService = _WaypointService_;
  }));

  it('starting a new journey', function () {
    ctrl.startJourney;
    expect(JourneyService.startJourney).toHaveBeenCalled;
  });

  it('adds a waypoint in the journey', function () {
    spyOn(WaypointService, 'createWaypoint').and.callThrough();
    ctrl.createWaypoint(1);
    expect(WaypointService.createWaypoint).toHaveBeenCalledWith(1);
  });
});
