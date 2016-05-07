'use strict';

angular
  .module('main')
  .controller('JourneyController', ['$http', 'JourneyFactory', 'JourneyService', function ($http, JourneyFactory, JourneyService) {

    var self = this;

    self.startJourney = function () {
      JourneyService.startJourney().then(function (journey) {
        if (typeof journey !== 'undefined' ) {
          self.journey = journey;
          // create a waypoint;
          // add it to the journey;
        };
      });
    };
  }]);
