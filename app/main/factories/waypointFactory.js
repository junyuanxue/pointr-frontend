'use strict';

angular
  .module('main')
  .factory('WaypointFactory', function () {
    var Waypoint = function (latitude, longitude) {
      this.latitude = latitude;
      this.longitude = longitude;
      this.reached = false;
    };

    Waypoint.prototype.markAsReached = function () {
      this.reached = true;
    };

    return Waypoint;
  });
