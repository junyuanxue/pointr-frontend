angular
  .module('main')
  .service('WaypointService', ['$http', 'WaypointFactory', function($http, WaypointFactory) {
    var self = this;

    self.createWaypoint = function (journeyId) {
      return $http.post('http://localhost:3000/journeys' + journeyId + '/waypoints')
        .then(_createWaypointCallBack, _errorCallBack);
    };

    function _createWaypointCallBack (response) {
      var waypoint = new WaypointFactory(response.data.latitude, response.data.longitude);
      waypoint.id = response.data.id;
      return waypoint;
    }

    function _errorCallBack (error) {
      return;
    }
  }]);
