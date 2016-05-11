'use strict';

angular
  .module('main')
  .factory('JourneyFactory', function () {
    var Journey = function (description, id) {
      this.waypoints = [];
      this.description = description || '';
      this.id = id;
    };

    Journey.prototype.addWaypoint = function (waypoint) {
      this.waypoints.push(waypoint);
    };

    return Journey;
  });
