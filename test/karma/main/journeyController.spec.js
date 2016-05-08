'use strict';

describe('JourneyController', function () {
  beforeEach(module('main'));

  beforeEach(function () {
    module(function($provide) {
      $provide.service('map', function() {
        this.watchLocation = jasmine.createSpy('watchLocation').and.callFake(function () {
        });
        this.loadMap = jasmine.createSpy('loadMap').and.callFake(function () {
        });
      });
    });

    var mockMapService;

    inject(function(map) {
      mockMapService = map;
    });
  })

  var ctrl, JourneyService, WaypointService, _MapService;

  beforeEach(inject(function ($controller, _JourneyService_, _WaypointService_, map) {
    ctrl = $controller('JourneyController');
    JourneyService = _JourneyService_;
    WaypointService = _WaypointService_;
    mockMapService = map;
  }));

  it('loads the map', function () {
    expect(mockMapService.loadMap).toHaveBeenCalled;
  })

  it('adds a waypoint in the journey', function () {
    spyOn(WaypointService, 'createWaypoint').and.callThrough();
    ctrl.createWaypoint(1);
    expect(MapService.getCurrentLocation).toHaveBeenCalled;
    expect(WaypointService.createWaypoint).toHaveBeenCalledWith(1);
    //test MapService.getCurrentLocation is getting called
  });
});
