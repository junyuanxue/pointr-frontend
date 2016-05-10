'use strict';

angular
  .module('main')
  .controller('JourneyWaypointsController', ['JourneyService', '$location', '$stateParams',
    function (JourneyService, $location, $stateParams) {
        var self = this;

        self.getAllJourneyWaypoints = function () {
          var journeyId = parseInt($stateParams.journeyId);
          return JourneyService.getJourney(journeyId).then(function (journey) {
            if (typeof journey !== 'undefined' ) {
              self.journey = journey;
              self.allJourneyWaypoints = journey.waypoints;

              console.log(journey.waypoints[0]);
            }
          });
        };

        self.loadWaypoint = function (id) {
          $location.path('/main/waypoints/' + id);
        };

        self.allJourneyWaypoints = self.getAllJourneyWaypoints();
      }]);
