'use strict';

describe('WaypointService', function () {
  beforeEach(module('main'));

  var WaypointService, httpBackend;
  var DOMAIN = 'https://wayback-junyuanx-2.c9users.io';

  var firstWaypoint = { 'id': 1, 'latitude': '0.1', 'longitude': '1.1' };
  var coordinates = { latitude: 0.1, longitude: 1.1 };

  beforeEach(inject(function (_WaypointService_, $httpBackend) {
    WaypointService = _WaypointService_;
    httpBackend = $httpBackend;
    httpBackend.whenGET(/main.*/).respond(200, '');
  }));

  it('makes a POST request to waypoints', function () {
    httpBackend.expectPOST(DOMAIN + '/journeys/1/waypoints').respond(firstWaypoint);
    WaypointService.createWaypoint(1, coordinates)
      .then(function (waypoint) {
        expect(waypoint.coords.latitude).toEqual(coordinates.latitude);
        expect(waypoint.coords.longitude).toEqual(coordinates.longitude);
      });
    httpBackend.flush();
  });

  it('makes a PATCH request to waypoints', function () {
    var _then = jasmine.createSpy('_then');
    httpBackend.expectPATCH(DOMAIN + '/waypoints/1').respond(200);
    firstWaypoint.description = 'New description';
    WaypointService.updateWaypoint(firstWaypoint).then(_then);
    httpBackend.flush();
    expect(_then).toHaveBeenCalled;
  });

  it('makes a DELETE request to waypoints', function () {
    var _then = jasmine.createSpy('_then');
    httpBackend.expectDELETE(DOMAIN + '/waypoints/1').respond(200);
    WaypointService.deleteWaypoint(1).then(_then);
    httpBackend.flush();
    expect(_then).toHaveBeenCalled;
  });
});
