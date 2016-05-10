'use strict';

angular
  .module('main')
  .service('WaypointService', ['$http', 'WaypointFactory', function ($http, WaypointFactory) {
    var self = this;

    var DOMAIN = 'http://localhost:3001';

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
      var data = { 'waypoint': { 'latitude': waypoint.latitude,
                                 'longitude': waypoint.longitude,
                                 'description': waypoint.description } };
      return $http.patch(DOMAIN + '/waypoints/' + waypoint.id).then(_successCallBack, _errorCallBack);
    };

    self.deleteWaypoint = function (waypointId) {
      return $http.delete(DOMAIN + '/waypoints/' + waypointId).then(_successCallBack, _errorCallBack);
    };

    function _successCallBack () { console.log("WAYPOINT UPDATED!") }

    function _errorCallBack () { return; }
  }]);
