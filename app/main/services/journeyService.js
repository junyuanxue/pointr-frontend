'use strict';

angular
  .module('main')
  .service('JourneyService', ['$http', 'JourneyFactory', 'WaypointFactory', function ($http, JourneyFactory, WaypointFactory) {
    var self = this;

    var DOMAIN = 'https://wayback-junyuanx-2.c9users.io';

    // var DOMAIN = 'http://localhost:3001';

    _clearCurrentJourney();

    self.getCurrentJourney = function () {
      return self.currentJourney;
    };

    self.getJourney = function (journeyId) {
      return $http.get(DOMAIN + '/journeys/' + journeyId)
        .then(_getJourneyCallBack, _errorCallBack);
    };

    function _getJourneyCallBack (response) {
      var journey = _parseJourneyData(response);
      journey.waypoints = _parseWaypointData(response.data.waypoints);
      self.currentJourney = journey;
      return journey;
    };

    function _parseJourneyData (response) {
      var journey = new JourneyFactory(response.data.journey.description);
      journey.id = response.data.journey.id;
      return journey;
    };

    self.getAllJourneys = function () {
      return $http.get('http://localhost:3001/journeys/').then(_getAllJourneysCallback, _errorCallBack);
    };

    function _getAllJourneysCallback (response) {
      var journeys = _createJourneys(response.data);
      return journeys;
    }

    function _parseWaypointData (wpArray) {
      return wpArray.map(function (wpData) {
        var waypoint = new WaypointFactory(wpData.latitude, wpData.longitude, wpData.description, wpData.id);
        return waypoint;
      });
    }

    self.startJourney = function () {
      var data = { 'journey': { 'description': '' } };
      return $http.post(DOMAIN + '/journeys', data)
        .then(_startJourneyCallBack, _errorCallBack);
    };

    function _startJourneyCallBack (response) {
      var journey = new JourneyFactory();
      journey.id = response.data.id;
      self.currentJourney = journey;
      return journey;
    }

    self.updateJourney = function (journeyId, descText) {
      var data = { 'journey': { 'description': descText } };
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


    function _createJourneys(journeyArray){
      var journeys = journeyArray.map(function (journey) {
        var journeyObject = new JourneyFactory(journey.description, journey.id);
        return journeyObject;
      });
      return journeys;
    }
  }]);
