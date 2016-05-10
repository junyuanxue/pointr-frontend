'use strict';

angular
  .module('main')
  .controller('AllJourneysController', ['$scope','JourneyFactory', 'JourneyService', '$location',
    function ($scope, JourneyFactory, JourneyService, $location) {
        $scope.getAllJourneys = function () {
          console.log("HI");
          JourneyService.getAllJourneys().then(function (journeys) {
            console.log(journeys);
            if (typeof journeys !== 'undefined' ) {
              $scope.allJourneys = journeys;
              console.log($scope.allJourneys);
            }
          });
        };

        $scope.loadJourney = function (id) {
          $location.path('/main/journeyback/' + id);
        };
        $scope.allJourneys = $scope.getAllJourneys();
}]);
