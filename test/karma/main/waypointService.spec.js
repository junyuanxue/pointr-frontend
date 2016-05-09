'use strict';

describe('WaypointService', function () {
  beforeEach(module('main'));

  var WaypointService, httpBackend;

  var firstWaypoint = { 'id': 1, 'latitude': '0.1', 'longitude': '1.1' };
  var coordinates = { latitude: 0.1, longitude: 1.1 };

  beforeEach(inject(function (_WaypointService_, $httpBackend) {
    WaypointService = _WaypointService_;
    httpBackend = $httpBackend;
    httpBackend.whenGET(/main.*/).respond(200, '');
  }));

  it('makes a POST request to waypoints', function () {
    httpBackend.expectPOST('http://localhost:3001/journeys/1/waypoints').respond(firstWaypoint);
    WaypointService.createWaypoint(1, coordinates)
      .then(function (waypoint) {
        expect(waypoint.latitude).toEqual(coordinates.latitude);
        expect(waypoint.longitude).toEqual(coordinates.longitude);
      });
    httpBackend.flush();
  });

  it('makes a PATCH request to waypoints', function () {
    var _then = jasmine.createSpy('_then');
    httpBackend.expectPATCH('http://localhost:3001/waypoints/1').respond(200);
    WaypointService.updateWaypoint(1, 'Cool spot').then(_then);
    expect(_then).toHaveBeenCalled;
    httpBackend.flush();
  });

  it('makes a DELETE request to waypoints', function () {
    var _then = jasmine.createSpy('_then');
    httpBackend.expectDELETE('http://localhost:3001/waypoints/1').respond(200);
    WaypointService.deleteWaypoint(1).then(_then);
    httpBackend.flush();
    expect(_then).toHaveBeenCalled;
  });
});
