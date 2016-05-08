'use strict';

angular
  .module('main')
  .controller('HomeController', ['$http', 'JourneyFactory', 'JourneyService', '$location',
      function ($http, JourneyFactory, JourneyService, $location) {
        var self = this;
        self.startJourney = function () {
          JourneyService.startJourney().then(function (journey) {
            console.log(journey);
            if (typeof journey !== 'undefined' ) {
              $location.path('/main/journey');
              self.journey = journey;
            }
          });
        };
      }]);
