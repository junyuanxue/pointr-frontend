'use strict';

angular
  .module('main')
  .controller('JourneyWaypointsController', ['JourneyService', '$stateParams',
    function (JourneyService, $stateParams) {

        var self = this;

        console.log('hiiiiiiiiiii');

        self.getAllJourneyWaypoints = function () {
          console.log('LOG YOUR BIAAAATCH');
          
          var journeyId = parseInt($stateParams.journeyId);
          return JourneyService.getJourney(journeyId).then(function (journey) {
            if (typeof journey !== 'undefined' ) {
              self.journey = journey;
              console.log(journey.waypoints);
              self.allJourneyWaypoints = journey.waypoints;
            }
          });
        };

        self.allJourneyWaypoints = self.getAllJourneyWaypoints();
      }]);
