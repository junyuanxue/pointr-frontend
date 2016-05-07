'use strict';

describe('JourneyController', function () {
  beforeEach(module('main'));

  var httpBackend, ctrl, JourneyService, WaypointService;

  var firstJourney = { 'id': 1 };
  var firstWaypoint = { 'id': 1, 'latitude': '0.1', 'longitude': '1.1' };

  beforeEach(inject(function ($controller, _JourneyService_, _WaypointService_, $httpBackend) {
    ctrl = $controller('JourneyController');
    JourneyService = _JourneyService_;
    WaypointService = _WaypointService_;
    httpBackend = $httpBackend;
    httpBackend.whenGET(/main.*/).respond(200, '');
  }));

  it('starting a new journey', function () {
    httpBackend.expectPOST('http://localhost:3000/journeys').respond(firstJourney);
    httpBackend.expectPOST('http://localhost:3000/journeys/1/waypoints').respond(firstWaypoint);

    JourneyService.startJourney().then(function (res) {

      console.log(ctrl.journey);
      expect(ctrl.journey.id).toEqual(1);
      expect(ctrl.journey.waypoints[0].latitude).toEqual(0.1);
    })
    // ctrl.startJourney;
    // expect(JourneyService.startJourney).toHaveBeenCalled;
    httpBackend.flush();
  });

  it('adds a waypoint in the journey', function () {
    spyOn(WaypointService, 'createWaypoint').and.callThrough();
    ctrl.createWaypoint(1);
    expect(WaypointService.createWaypoint).toHaveBeenCalledWith(1);
  });
});
