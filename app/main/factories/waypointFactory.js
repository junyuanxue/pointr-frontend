'use strict';

angular
  .module('main')
  .factory('WaypointFactory', function () {
    var Waypoint = function (latitude, longitude, description) {
      this.latitude = latitude;
      this.longitude = longitude;
      this.description = description || '';
      this.imageURI = null;
      this.reached = false;
    };

    Waypoint.prototype.markAsReached = function () {
      this.reached = true;
    };

    return Waypoint;
  });
