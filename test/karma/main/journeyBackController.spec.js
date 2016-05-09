'use strict';

describe('JourneyBackController', function () {
  beforeEach(module('main'));

  var mockCurrentJourneyId = 3;

  var mockJourneyService = {
    getCurrentJourney: function () {
      return { id: mockCurrentJourneyId };
    },
    deleteJourney: function () {},
    getJourney: function(journeyId) {}
  };

  var ctrl, WaypointService, q;

  beforeEach(angular.mock.inject(function ($q, $controller, _WaypointService_) {
    ctrl = $controller('JourneyBackController', { JourneyService: mockJourneyService });
    WaypointService = _WaypointService_;
    q = $q;
  }));

  it('starts the journey back', function () {
    spyOn(mockJourneyService, 'getCurrentJourney').and.callThrough();
    spyOn(mockJourneyService, 'getJourney').and.returnValue(q.when({}));
    ctrl.startJourneyBack();
    expect(mockJourneyService.getJourney).toHaveBeenCalledWith(mockCurrentJourneyId);
  });

  it('deletes a waypoint in the journey', function () {
    var waypoint = { id: 4 };
    spyOn(WaypointService, 'deleteWaypoint').and.callThrough();
    ctrl.deleteWaypoint(waypoint);
    expect(WaypointService.deleteWaypoint).toHaveBeenCalledWith(waypoint.id);
  });

  it('deletes a journey when complete', function () {
    ctrl.journey = { id: 3 };
    spyOn(mockJourneyService, 'deleteJourney').and.callThrough();
    ctrl.deleteJourney();
    expect(mockJourneyService.deleteJourney).toHaveBeenCalled;
  });
});
