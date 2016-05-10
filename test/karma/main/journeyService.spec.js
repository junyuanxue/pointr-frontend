'use strict';

describe('JourneyService', function () {
  beforeEach(module('main'));

  var JourneyService, httpBackend;
  var DOMAIN = 'http://localhost:3001';

  var firstJourney = { 'id': 1,
                       'waypoints': [
                         { 'id': 2, 'latitude': '0.1', 'longitude': '1.1' },
                         { 'id': 3, 'latitude': '0.2', 'longitude': '1.2'}
                       ]
                     };

  beforeEach(inject(function (_JourneyService_, _JourneyFactory_, $httpBackend) {
    JourneyService = _JourneyService_;
    httpBackend = $httpBackend;
    httpBackend.whenGET(/main.*/).respond(200, '');
    JourneyService.currentJourney = { id: 3 };
  }));

  it('makes a GET request to journeys', function () {
    httpBackend.expectGET(DOMAIN + '/journeys/1').respond(firstJourney);
    JourneyService.getJourney(1).then(function () {
      expect(JourneyService.currentJourney.id).toEqual(1);
      expect(JourneyService.currentJourney.waypoints.length).toEqual(2);
    });
    httpBackend.flush();
  });

  it('makes a POST request to journeys', function () {
    httpBackend.expectPOST(DOMAIN + '/journeys').respond(firstJourney);
    JourneyService.startJourney()
      .then(function (journey) {
        expect(journey.id).toEqual(1);
      });
    httpBackend.flush();
  });

  it('makes a PATCH request to journeys', function () {
    var _then = jasmine.createSpy('_then');
    httpBackend.expectPATCH(DOMAIN + '/journeys/3').respond(200);
    JourneyService.updateJourney(3, 'New journey').then(_then);
    expect(_then).toHaveBeenCalled;
    httpBackend.flush();
  });

  it('makes a DELETE request to journeys', function () {
    httpBackend.expectDELETE(DOMAIN + '/journeys/3').respond(200);
    JourneyService.deleteJourney(3).then(function () {
      expect(JourneyService.currentJourney).toEqual(null);
    });
    httpBackend.flush();
  });
});
