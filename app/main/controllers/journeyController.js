'use strict';

angular
  .module('main')
  .controller('JourneyController', ['$http', 'JourneyFactory', 'JourneyService', '$location', function ($http, JourneyFactory, JourneyService, $location) {

    var self = this;

    self.startJourney = function () {
      JourneyService.startJourney().then(function (journey) {
        $location.path('/main/journey');
        if (typeof journey !== 'undefined' ) {
          self.journey = journey;
          // create a waypoint;
          // add it to the journey;
        }
      });
    };
  }]);
