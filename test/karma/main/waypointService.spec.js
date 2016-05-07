describe('WaypointService', function(){
  beforeEach(module('main'));
  var WaypointService, httpBackend, WaypointFactory;

  var firstWaypoint = {"id" : 1, "latitude" : "0.0", "longitude" : "1.1", "journey_id" : 1};

  beforeEach(inject(function(_WaypointService_, _WaypointFactory_, $httpBackend){
    WaypointService = _WaypointService_;
    WaypointFactory = _WaypointFactory_;
    httpBackend = $httpBackend;
  }));

  it('Makes POST request to waypoints', function(){
    // httpBackend.expectGET('/#/main/journey').respond(200);
    httpBackend.expectPOST('http://localhost:3000/journeys/1/waypoints').respond(firstWaypoint);
    WaypointService.createWaypoint(1)
      .then(function(waypoint){
        expect(waypoint.latitude).toEqual(0.0);
        expect(waypoint.longitude).toEqual(1.1);
      });
  });
});
