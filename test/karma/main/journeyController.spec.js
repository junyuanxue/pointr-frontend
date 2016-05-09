'use strict';

describe('JourneyController', function () {
  beforeEach(module('main'));

  var mockCurrentLocation = { latitude: 10.1, longitude: 11.1 };
  var mockCurrentJourneyId = 3;

  var mockMapService = {
    watchLocation: function () {},
    loadMap: function () {},
    getCurrentLocation: function () {
      return mockCurrentLocation;
    }
  };

  var mockJourneyService = {
    getCurrentJourney: function () {
      return { id: mockCurrentJourneyId };
    }
  };

  var ctrl, WaypointService;

  beforeEach(angular.mock.inject(function ($controller, _WaypointService_) {
    ctrl = $controller('JourneyController', { MapService: mockMapService, JourneyService: mockJourneyService });
    WaypointService = _WaypointService_;
  }));

  it('watches the location', function () {
    spyOn(mockMapService, 'watchLocation').and.callThrough();
    expect(mockMapService.watchLocation).toHaveBeenCalled;
  });

  it('loads the map', function () {
    spyOn(mockMapService, 'loadMap').and.callThrough();
    expect(mockMapService.loadMap).toHaveBeenCalled;
  });

  it('adds a waypoint in the journey', function () {
    spyOn(WaypointService, 'createWaypoint').and.callThrough();
    spyOn(mockMapService, 'getCurrentLocation').and.callThrough();
    spyOn(mockJourneyService, 'getCurrentJourney').and.callThrough();
    ctrl.createWaypoint();

    expect(mockMapService.getCurrentLocation).toHaveBeenCalled;
    expect(WaypointService.createWaypoint).toHaveBeenCalledWith(mockCurrentJourneyId, mockCurrentLocation);
    //test MapService.addMarker is getting called
  });
});
