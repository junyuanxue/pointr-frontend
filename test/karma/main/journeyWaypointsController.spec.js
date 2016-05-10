'use strict';

describe('JourneyController', function () {
  beforeEach(module('main'));

  var ctrl, WaypointService;

  beforeEach(angular.mock.inject(function ($controller, _JourneyService_) {
    ctrl = $controller('JourneyController');
    JourneyService = _WaypointService_;
  }));

  xit('gets all waypoints of a journey', function () {
    //test JourneyService.getJourney is being called with current journey id
  });
});
