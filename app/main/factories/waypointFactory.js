'use strict';

angular
  .module('main')
  .factory('WaypointFactory', function () {
    var Waypoint = function (latitude, longitude) {
      this.latitude = latitude;
      this.longitude = longitude;
    };

    return Waypoint;
  });
