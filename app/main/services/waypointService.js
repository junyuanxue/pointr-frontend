'use strict';

angular
  .module('main')
  .service('WaypointService', ['$http', 'WaypointFactory', function ($http, WaypointFactory) {
    var self = this;

    self.createWaypoint = function (journeyId, coordinates) {
      var data = {'waypoint': {'latitude': coordinates.latitude, 'longitude': coordinates.longitude}};
      return $http.post('http://localhost:3001/journeys/' + journeyId + '/waypoints', data)
        .then(_createWaypointCallBack, _errorCallBack);
    };

    function _createWaypointCallBack (response) {
      var lat = parseFloat(response.data.latitude);
      var lng = parseFloat(response.data.longitude);
      var waypoint = new WaypointFactory(lat, lng);
      waypoint.id = response.data.id;
      return waypoint;
    }

    self.deleteWaypoint = function (waypointId) {
      return $http.delete('http://localhost:3001/waypoints/' + waypointId).then(_successCallBack, _errorCallBack);
    };

    function _successCallBack () { return; }

    function _errorCallBack () { return; }
  }]);
