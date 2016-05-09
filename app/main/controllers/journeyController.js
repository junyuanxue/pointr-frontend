'use strict';

angular
  .module('main')
  .controller('JourneyController', ['JourneyService', '$location', 'WaypointService', 'MapService',
    function (JourneyService, $location, WaypointService, MapService) {
        var self = this;

        _loadCurrentJourneyFromService();

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

        self.editJourneyDescription = function (descText) {
          JourneyService.updateJourney(descText)
            .then(_loadCurrentJourneyFromService);
        };

        function _loadCurrentJourneyFromService() {
          self.journey = JourneyService.getCurrentJourney();
        }
      }]);
