'use strict';

angular
  .module('main')
  .controller('JourneyBackController', ['$scope', 'JourneyFactory', 'JourneyService', 'WaypointService', '$stateParams', 'LocationService',
    function ($scope, JourneyFactory, JourneyService, WaypointService, $stateParams, LocationService) {
      $scope.distanceFromWaypoint = 'Not Started';

      $scope.startJourneyBack = function () {
        var journeyId = parseInt($stateParams.journeyId);
        JourneyService.getJourney(journeyId).then(function (journey) {
          $scope.journey = journey;
          $scope.map = {center: {latitude: 51.51, longitude: -0.071}, zoom: 15 };
          watchLocation();
        });
      };


    //watch the value of currentLocation in the serice and update the view based on that
    //This watch requires the scope variable to be able to perfom its actions

      $scope.startJourneyBack();
      console.log($scope.journey);
      $scope.deleteWaypoint = function (waypoint) {
        WaypointService.deleteWaypoint(waypoint.id).then(function (waypoint) {
          waypoint.markAsReached();
        });
      };

      $scope.deleteJourney = function () {
        JourneyService.deleteJourney($scope.journey.id);
      };

      var distanceBetween = function (start, end) {

        console.log(start);
        console.log(1 + start);
        if (start && end) {
          var p = 0.017453292519943295;    // Math.PI / 180
          var c = Math.cos;
          var a = 0.5 - c((end.latitude - start.latitude) * p) / 2 +
              c(start.latitude * p) * c(end.latitude * p) *
              (1 - c((end.longitude - start.longitude) * p)) / 2;
          return 12742 * Math.asin(Math.sqrt(a)) * 1000;
        }
        return 'Location not ready';
      };

      function watchLocation() {
        $scope.$watch(function () {
          return LocationService.getCurrentLocation();
        },function (oldLocation, currentLocation) {

          var currentWaypoint = $scope.journey.waypoints[0];
          // $scope.distanceFromWaypoint = distanceBetween(currentLocation, currentWaypoint);
        });
      }
    }]);
