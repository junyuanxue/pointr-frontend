describe('JourneyService', function(){
  beforeEach(module('main'));
  var JourneyService, httpBackend, JourneyFactory;

  var firstJourney = {"id" : 5};

  beforeEach(inject(function(_JourneyService_, _JourneyFactory_, $httpBackend){
    JourneyService = _JourneyService_;
    JourneyFactory = _JourneyFactory_;
    httpBackend = $httpBackend;
  }));

  it('Makes POST request to journeys', function(){
    httpBackend.expectPOST('http://localhost:3000/journeys').respond(firstJourney);
    JourneyService.startJourney()
      .then(function(journey){
        expect(journey.id).toEqual(5);
      });
  });
});
