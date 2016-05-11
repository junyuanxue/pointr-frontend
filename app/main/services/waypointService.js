'use strict';

angular
  .module('main')
  .service('WaypointService', ['$http', 'WaypointFactory', function ($http, WaypointFactory) {
    var self = this;

    var DOMAIN = 'https://wayback-junyuanx-2.c9users.io';

    self.createWaypoint = function (journeyId, coordinates) {
      var data = { 'waypoint': { 'latitude': coordinates.latitude, 'longitude': coordinates.longitude } };
      return $http.post(DOMAIN + '/journeys/' + journeyId + '/waypoints', data)
        .then(_createWaypointCallBack, _errorCallBack);
    };

    function _createWaypointCallBack (response) {
      var lat = parseFloat(response.data.latitude);
      var lng = parseFloat(response.data.longitude);
      var waypoint = new WaypointFactory(lat, lng);
      waypoint.id = response.data.id;
      return waypoint;
    }

    self.updateWaypoint = function (waypoint) {
      var data = { 'waypoint': { 'description': waypoint.description } };
      return $http.patch(DOMAIN + '/waypoints/' + waypoint.id, data).then(_successCallBack, _errorCallBack);
    };

    self.deleteWaypoint = function (waypointId) {
      return $http.delete(DOMAIN + '/waypoints/' + waypointId).then(_successCallBack, _errorCallBack);
    };

    function _successCallBack () { return; }

    function _errorCallBack () { return; }
  }]);
