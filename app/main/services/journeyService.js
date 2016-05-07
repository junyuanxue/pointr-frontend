angular
  .module('main')
  .service('JourneyService', ['$http', 'JourneyFactory', function ($http, JourneyFactory) {
    var self = this;

    self.startJourney = function () {
      return $http.post('http://localhost:3000/journeys')
        .then(function (response) {
          var journey = new JourneyFactory();
          journey.id = response.data.id;
          return journey;
        });
    };
  }]);
