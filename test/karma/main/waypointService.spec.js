describe('WaypointService', function () {
  beforeEach(module('main'));
  var WaypointService, httpBackend;

  var firstWaypoint = { 'id': 1, 'latitude': '0.0', 'longitude': '1.1' };

  beforeEach(inject(function(_WaypointService_, $httpBackend){
    WaypointService = _WaypointService_;
    httpBackend = $httpBackend;
  }));

  it('Makes POST request to waypoints', function () {
    httpBackend.expectPOST('http://localhost:3000/journeys/1/waypoints').respond(firstWaypoint);
    WaypointService.createWaypoint(1)
      .then(function (waypoint) {
        expect(waypoint.latitude).toEqual(0.0);
        expect(waypoint.longitude).toEqual(1.1);
      });
  });
});
