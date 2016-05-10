'use strict';

angular
  .module('main')
  .factory('WaypointFactory', function () {
    var Waypoint = function (lat, long, description, id) {
      this.coords = {latitude: lat, longitude: long};
      this.description = description || '';
      this.reached = false;
      this.id = id
    };

    Waypoint.prototype.markAsReached = function () {
      this.reached = true;
    };

    return Waypoint;
  });
