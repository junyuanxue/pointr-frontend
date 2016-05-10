'use strict';

angular
  .module('main')
  .controller('AllJourneysController', ['$scope', 'JourneyFactory', 'JourneyService', '$location',
    function ($scope, JourneyFactory, JourneyService, $location) {
        $scope.getAllJourneys = function () {
          JourneyService.getAllJourneys().then(function (journeys) {
            if (typeof journeys !== 'undefined' ) {
              $scope.allJourneys = journeys;
            }
          });
        };

        $scope.loadJourney = function (journeyId) {
          $location.path('/main/journeyback/' + journeyId);
        };

        $scope.loadJourneyWaypoints = function (journeyId) {
          $location.path('/main/journeys/' + journeyId + '/waypoints');
        };
        
        $scope.allJourneys = $scope.getAllJourneys();
}]);
