'use strict';

describe('JourneyController', function () {
  beforeEach(module('main'));

  var ctrl, JourneyService;

  beforeEach(angular.mock.inject(function ($controller, _JourneyService_) {
    ctrl = $controller('JourneyController');
    JourneyService = _JourneyService_;
  }));

  xit('gets all journeys', function () {
    //test JourneyService.getAllJourneys is being called
  });
});
