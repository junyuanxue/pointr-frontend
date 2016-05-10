'use strict';

angular
  .module('main')
  .controller('JourneyWaypointsController', ['JourneyService', '$location', '$stateParams',
    function (JourneyService, $location, $stateParams) {
        var self = this;

        console.log("hhhhiii")

        self.getAllJourneyWaypoints = function () {
          var journeyId = parseInt($stateParams.journeyId);
          console.log(journeyId);

          return JourneyService.getJourney(journeyId).then(function (journey) {
            if (typeof journey !== 'undefined' ) {
              self.journey = journey
              self.allJourneyWaypoints = journey.waypoints;
              console.log(self.journey.description)
            }
          });
        };

        self.loadWaypoint = function (id) {
          $location.path('/main/waypoints/' + id);
        };

        self.allJourneyWaypoints = self.getAllJourneyWaypoints();
      }]);
