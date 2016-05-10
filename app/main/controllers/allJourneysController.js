'use strict';

angular
  .module('main')
  .controller('AllJourneysController', ['$scope', 'JourneyFactory', 'JourneyService', '$location',
    function ($scope, JourneyFactory, JourneyService, $location) {
        $scope.getAllJourneys = function () {
          console.log("HI");
          JourneyService.getAllJourneys().then(function (journeys) {
            console.log(journeys);
            if (typeof journeys !== 'undefined' ) {
              $scope.allJourneys = journeys;
            }
          });
        };

        $scope.loadJourney = function (journeyId) {
          $location.path('/main/journeyback/' + journeyId);
        };

        $scope.loadJourneyWaypoints = function (journeyId) {
          $location.path('main/journeys/' + journeyId + '/waypoints');
        };
        $scope.allJourneys = $scope.getAllJourneys();
}]);
