'use strict';

angular
  .module('main')
  .controller('HomeController', ['JourneyFactory', 'JourneyService', '$location',
      function (JourneyFactory, JourneyService, $location) {
        var self = this;
        self.startJourney = function () {
          JourneyService.startJourney().then(function (journey) {
            if (typeof journey !== 'undefined' ) {
              $location.path('/main/journey');
              self.journey = journey;
            }
          });
        };
      }]);
