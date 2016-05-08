'use strict';

describe('JourneyBackController', function () {
  beforeEach(module('main'));

  var ctrl, JourneyService, WaypointService;

  beforeEach(inject(function ($controller, _JourneyService_, _WaypointService_) {
    ctrl = $controller('JourneyBackController');
    JourneyService = _JourneyService_;
    WaypointService = _WaypointService_;
  }));

  it('starts the journey back', function () {
    var journey = { id: 3 };
    spyOn(JourneyService, 'getCurrentJourney').and.returnValue(journey);
    expect(ctrl.journey.id).toEqual(journey.id);
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
