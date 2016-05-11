'use strict';

angular
  .module('main')
  .controller('JourneyWaypointsController', ['JourneyService', '$stateParams',
    function (JourneyService, $stateParams) {
        var self = this;

        self.getAllJourneyWaypoints = function () {
          var journeyId = parseInt($stateParams.journeyId);
          return JourneyService.getJourney(journeyId).then(function (journey) {
            if (typeof journey !== 'undefined' ) {
              self.journey = journey;
              self.allJourneyWaypoints = journey.waypoints;
            }
          });
        };

        self.allJourneyWaypoints = self.getAllJourneyWaypoints();
      }]);
