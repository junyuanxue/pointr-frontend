'use strict';

describe('WaypointService', function () {
  beforeEach(module('main'));

  var WaypointService, httpBackend;

  var firstWaypoint = { 'id': 1, 'latitude': '0.1', 'longitude': '1.1' };

  beforeEach(inject(function (_WaypointService_, $httpBackend) {
    WaypointService = _WaypointService_;
    httpBackend = $httpBackend;
    httpBackend.whenGET(/main.*/).respond(200, '');
  }));

  it('makes a POST request to waypoints', function () {
    httpBackend.expectPOST('http://localhost:3000/journeys/1/waypoints').respond(firstWaypoint);
    WaypointService.createWaypoint(1)
      .then(function (waypoint) {
        expect(waypoint.latitude).toEqual(0.1);
        expect(waypoint.longitude).toEqual(1.1);
      });
    httpBackend.flush();
  });

  it('makes a DELETE request to waypoints', function () {
    var _then = jasmine.createSpy('_then');
    httpBackend.expectDELETE('http://localhost:3000/waypoints/1').respond(200);
    WaypointService.deleteWaypoint(1).then(_then);
    httpBackend.flush();
    expect(_then).toHaveBeenCalled();
  });
});
