'use strict';

angular
  .module('main')
  .controller('JourneyController', ['$http', 'JourneyFactory', 'JourneyService', 'WaypointService', function ($http, JourneyFactory, JourneyService, WaypointService) {

    var self = this;

    self.startJourney = function () {
      JourneyService.startJourney().then(function (journey) {
        if (typeof journey !== 'undefined' ) {
          self.journey = journey;
          self.createWaypoint(self.journey.id);
        }
      });
    };

    self.createWaypoint = function (journeyId) {
      WaypointService.createWaypoint(journeyId).then(function (waypoint) {
        self.journey.addWaypoint(waypoint);
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
