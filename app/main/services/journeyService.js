'use strict';

angular
  .module('main')
  .service('JourneyService', ['$http', 'JourneyFactory', function ($http, JourneyFactory) {
    var self = this;

    self.startJourney = function () {
      return $http.post('http://localhost:3000/journeys')
        .then(_startJourneyCallBack, _errorCallBack);
    };

    function _startJourneyCallBack (response) {
      var journey = new JourneyFactory();
      journey.id = response.data.id;
      return journey;
    }

    self.deleteJourney = function (journeyId) {
      return $http.delete('http://localhost:3000/journeys/' + journeyId).then(_successCallBack, _errorCallBack);
    };

    function _successCallBack () { return; }

    function _errorCallBack () { return; }
  }]);
