'use strict';

angular
  .module('main')
  .controller('JourneyBackController', ['$location', 'JourneyService', 'WaypointService', function ($location, JourneyService, WaypointService) {

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
