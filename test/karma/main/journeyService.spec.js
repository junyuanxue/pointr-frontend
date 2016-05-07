'use strict';

describe('JourneyService', function () {
  beforeEach(module('main'));
  var JourneyService, httpBackend;

  var firstJourney = { 'id': 5};

  beforeEach(inject(function (_JourneyService_, $httpBackend) {
    JourneyService = _JourneyService_;
    httpBackend = $httpBackend;
  }));

  it('Makes POST request to journeys', function () {
    httpBackend.expectGET('/#/main/journey').respond(200);
    httpBackend.expectPOST('http://localhost:3000/journeys').respond(firstJourney);
    JourneyService.startJourney()
      .then(function (journey) {
        expect(journey.id).toEqual(5);
      });
  });

});
