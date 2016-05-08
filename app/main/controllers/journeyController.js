'use strict';

angular
  .module('main')
  .controller('JourneyController', ['$http', 'JourneyFactory', 'JourneyService', '$location', 'WaypointService', 'MapService',
    function ($http, JourneyFactory, JourneyService, $location, WaypointService, MapService) {
        var self = this;
        self.journey = JourneyService.getCurrentJourney();
        self.currentLocation = null;
        MapService.watchLocation();
        MapService.loadMap();

        self.startJourney = function () {
          JourneyService.startJourney().then(function (journey) {
            if (typeof journey !== 'undefined' ) {
              $location.path('/main/journey');
              self.journey = journey;
              self.createWaypoint(self.journey.id);
            }
          });
        };

        self.createWaypoint = function () {
          self.journey = JourneyService.getCurrentJourney();
          if (typeof self.journey !== undefined){
            self.currentLocation = MapService.getCurrentLocation();
            WaypointService.createWaypoint(self.journey.id, self.currentLocation).then(function (waypoint) {
              self.journey.addWaypoint(waypoint);
              MapService.addMarker(waypoint);
            });
          }
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
