'use strict';

angular
  .module('main')
  .controller('JourneyBackController', ['$http', 'JourneyFactory', 'JourneyService', 'WaypointService', function ($http, JourneyFactory, JourneyService, WaypointService) {

    var self = this;

    self.startJourneyBack = function () {
      self.journey = JourneyService.getCurrentJourney();
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
