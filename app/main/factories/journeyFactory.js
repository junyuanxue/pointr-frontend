'use strict';

angular
  .module('main')
  .factory('JourneyFactory', function () {
    var Journey = function (description) {
      this.waypoints = [];
      this.description = description || '';
    };

    Journey.prototype.addWaypoint = function (waypoint) {
      this.waypoints.push(waypoint);
    };

    return Journey;
  });
