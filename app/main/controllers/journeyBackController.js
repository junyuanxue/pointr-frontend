'use strict';

angular
  .module('main')
  .controller('JourneyBackController', ['$location', '$http', 'JourneyFactory', 'JourneyService', 'WaypointService', function ($location, $http, JourneyFactory, JourneyService, WaypointService) {

    var self = this;

    self.startJourneyBack = function () {
      $location.path('/main/journeyback');      
      var journeyId = JourneyService.getCurrentJourney().id;
      JourneyService.getJourney(journeyId).then(function (journey) {
        self.journey = journey;
      });
    };

    self.deleteWaypoint = function (waypoint) {
      WaypointService.deleteWaypoint(waypoint.id).then(function (waypoint) {
        waypoint.markAsReached();
      });
    };

    self.deleteJourney = function () {
      JourneyService.deleteJourney(self.journey.id);
    };
  }]);
