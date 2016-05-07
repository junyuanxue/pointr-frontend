'use strict';

describe('JourneyController', function () {
  beforeEach(module('main'));

  var ctrl, JourneyFactory, WaypointFactory, httpBackend, JourneyService;

  var firstJourney = {"id" : 5};

  beforeEach(inject(function($controller, _JourneyFactory_, _WaypointFactory_, $httpBackend, _JourneyService_) {
    ctrl = $controller('JourneyController');
    JourneyFactory = _JourneyFactory_;
    WaypointFactory = _WaypointFactory_;
    httpBackend = $httpBackend;
    JourneyService = _JourneyService_;
  }));

  it('starting a new journey', function() {
    httpBackend.expectGET('/#/main/journey').respond(200);
    httpBackend.expectPOST('http://localhost:3000/journeys').respond(firstJourney);
    JourneyService.startJourney().then(function (journey) {
      expect(ctrl.journey).toEqual(journey);
    });
  });
});
