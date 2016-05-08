'use strict';

angular
  .module('main')
  .service('JourneyService', ['$http', 'JourneyFactory', function ($http, JourneyFactory) {
    var self = this;
    self.currentJourney = null;

    self.getCurrentJourney = function () {
      return self.currentJourney;
    };
    self.startJourney = function () {
      return $http.post('http://localhost:3001/journeys')
        .then(_startJourneyCallBack, _errorCallBack);
    };

    function _startJourneyCallBack (response) {
      console.log(response);
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
      return;
    }
  }]);
