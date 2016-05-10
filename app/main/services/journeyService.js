'use strict';

angular
  .module('main')
  .service('JourneyService', ['$http', 'JourneyFactory', 'WaypointFactory', function ($http, JourneyFactory, WaypointFactory) {
    var self = this;

    var DOMAIN = 'http://localhost:3001';

    _clearCurrentJourney();

    self.getCurrentJourney = function () {
      return self.currentJourney;
    };

    self.getJourney = function (journeyId) {
      return $http.get(DOMAIN + '/journeys/' + journeyId).then(_getJourneyCallBack, _errorCallBack);
    };

    function _getJourneyCallBack (response) {
      var journey = _startJourneyCallBack(response);
      journey.waypoints = _parseWaypointData(response.data.waypoints);
      return journey;
    }

    function _parseWaypointData (wpArray) {
      return wpArray.map(function (wpData) {
        var waypoint = new WaypointFactory(wpData.latitude, wpData.longitude, wpData.description);
        waypoint.id = wpData.id;
        return waypoint;
      });
    }

    self.startJourney = function () {
      var data = { 'journey': { 'description': '' } };
      return $http.post(DOMAIN + '/journeys', data)
        .then(_startJourneyCallBack, _errorCallBack);
    };

    function _startJourneyCallBack (response) {
      var journey = new JourneyFactory(response.data.journey.description);
      journey.id = response.data.journey.id;
      self.currentJourney = journey;
      return journey;
    }

    self.updateJourney = function (journeyId, descText) {
      var data = { 'journey': { 'description': descText }};
      return $http.patch(DOMAIN + '/journeys/' + journeyId, data)
        .then(_successCallBack, _errorCallBack);
    };

    self.deleteJourney = function (journeyId) {
      return $http.delete(DOMAIN + '/journeys/' + journeyId)
        .then(_clearCurrentJourney, _errorCallBack);
    };

    function _clearCurrentJourney () {
      self.currentJourney = null;
    }

    function _successCallBack (err) { return; }

    function _errorCallBack (err) { return err; }
  }]);
