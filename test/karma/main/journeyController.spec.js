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
    },
    updateJourney: function (descText) {}
  };

  var ctrl, JourneyService, WaypointService, q;

  beforeEach(angular.mock.inject(function ($q, $controller, _WaypointService_) {
    ctrl = $controller('JourneyController', { MapService: mockMapService, JourneyService: mockJourneyService });
    WaypointService = _WaypointService_;
    q = $q;
  }));

  it('watches the location', function () {
    spyOn(mockMapService, 'watchLocation').and.callThrough();
    expect(mockMapService.watchLocation).toHaveBeenCalled;
  });

  it('loads the map', function () {
    spyOn(mockMapService, 'loadMap').and.callThrough();
    expect(mockMapService.loadMap).toHaveBeenCalled;
  });

  it('updates the journey description', function () {
    spyOn(mockJourneyService, 'updateJourney').and.returnValue(q.when({}));
    ctrl.editJourneyDescription('New journey');
    expect(mockJourneyService.updateJourney).toHaveBeenCalledWith('New journey');
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
