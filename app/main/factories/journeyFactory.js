'use strict';

angular
  .module('main')
  .factory('JourneyFactory', function () {
    var Journey = function () {
      this.waypoints = [];
    };

    Journey.prototype.addWaypoint = function (waypoint) {
      this.waypoints.push(waypoint);
    };

    return Journey;
  });
