'use strict';

describe('JourneyController', function () {
  beforeEach(module('main'));

  var ctrl, JourneyService, WaypointService;

  beforeEach(inject(function ($controller, _JourneyService_, _WaypointService_) {
    ctrl = $controller('JourneyController');
    JourneyService = _JourneyService_;
    WaypointService = _WaypointService_;
  }));

  it('starts a new journey', function () {
    ctrl.startJourney();
    expect(JourneyService.startJourney).toHaveBeenCalled;
  });

  it('adds a waypoint in the journey', function () {
    spyOn(WaypointService, 'createWaypoint').and.callThrough();
    ctrl.createWaypoint(1);
    expect(WaypointService.createWaypoint).toHaveBeenCalledWith(1);
  });

  it('deletes a waypoint in the journey', function () {
    var waypoint = { id: 4 };
    spyOn(WaypointService, 'deleteWaypoint').and.callThrough();
    ctrl.deleteWaypoint(waypoint);
    expect(WaypointService.deleteWaypoint).toHaveBeenCalledWith(waypoint.id);
  });

  it('deletes a journey when complete', function () {
    ctrl.journey = { id: 3 };
    spyOn(JourneyService, 'deleteJourney').and.callThrough();
    ctrl.deleteJourney();
    expect(JourneyService.deleteJourney).toHaveBeenCalledWith(ctrl.journey.id);
  });
});
