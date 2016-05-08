'use strict';

angular
  .module('main')
  .service('JourneyService', ['$http', 'JourneyFactory', 'WaypointFactory', function ($http, JourneyFactory, WaypointFactory) {
    var self = this;
    self.currentJourney = null;

    self.getCurrentJourney = function () {
      return self.currentJourney;
    };

    self.getJourney = function (journeyId) {
      return $http.get('http://localhost:3001/journeys/' + journeyId).then(_getJourneyCallBack, _errorCallBack);
    };

    function _getJourneyCallBack (response) {
      var journey = _startJourneyCallBack (response);
      journey.waypoints = _parseWaypointData(response.data.waypoints);
      return journey;
    }

    function _parseWaypointData (wpArray) {
      return wpArray.map(function (wpData) {
        var waypoint = new WaypointFactory(wpData.latitude, wpData.longitude);
        waypoint.id = wpData.id;
        return waypoint;
      });
    }

    self.startJourney = function () {
      return $http.post('http://localhost:3001/journeys')
        .then(_startJourneyCallBack, _errorCallBack);
    };

    function _startJourneyCallBack (response) {
      var journey = new JourneyFactory();
      journey.id = response.data.id;
      self.currentJourney = journey;
      return journey;
    }

    self.deleteJourney = function (journeyId) {
      return $http.delete('http://localhost:3001/journeys/' + journeyId).then(_successCallBack, _errorCallBack);
    };

    function _successCallBack () { return; }

    function _errorCallBack (err) {
      console.log(err);
    }
  }]);
