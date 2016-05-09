'use strict';

angular
  .module('main')
  .controller('JourneyController', ['JourneyService', '$location', 'WaypointService', 'MapService',
    function (JourneyService, $location, WaypointService, MapService) {
        var self = this;

        self.journey = JourneyService.getCurrentJourney();

        self.currentLocation = null;
        MapService.watchLocation();
        MapService.loadMap();

        self.createWaypoint = function () {
          self.journey = JourneyService.getCurrentJourney();
          if (typeof self.journey !== undefined) {
            self.currentLocation = MapService.getCurrentLocation();
            WaypointService.createWaypoint(self.journey.id, self.currentLocation)
              .then(function (waypoint) {
                self.journey.addWaypoint(waypoint);
                MapService.addMarker(waypoint);
              });
          }
        };
      }]);
