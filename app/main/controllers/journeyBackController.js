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
          LocationService.watchLocation();
          $scope.currentWaypoint = getFirstWaypoint();;

          watchLocation();
        });
      };


    //find out what the current Waypoint is
    //trigger an action when distance from current waypoint reaches a certain value

      $scope.startJourneyBack();
      var markAsReached = function (waypoint) {
        WaypointService.deleteWaypoint(waypoint.id).then(function (waypoint) {
          waypoint.markAsReached();
        });
      };

      $scope.deleteJourney = function () {
        JourneyService.deleteJourney($scope.journey.id);
      };

      var distanceBetween = function (start, end) {
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
          $scope.currentLocation = currentLocation;
          if (isCloseEnoughToWaypoint()) {
            changeCurrentWaypoint();
          }
          $scope.distanceFromWaypoint = distanceBetween(currentLocation, $scope.currentWaypoint.coords);
        });
      }

      function getFirstWaypoint() {
        reverseWaypoints();
        return $scope.journey.waypoints[0];
      }

      function reverseWaypoints() {
        $scope.journey.waypoints = $scope.journey.waypoints.reverse();
      }

      function isCloseEnoughToWaypoint() {
        return distanceBetween($scope.currentLocation, $scope.currentWaypoint.coords) < 5;
      }

      function changeCurrentWaypoint() {
        console.log($scope.journey.waypoints.indexOf($scope.currentWaypoint));
        var currentWaypointIndex = $scope.journey.waypoints.indexOf($scope.currentWaypoint);
        markAsReached($scope.journey.waypoints[currentWaypointIndex]);
        if ((currentWaypointIndex) > - 1 && (nextWaypointIndex !== ($scope.journey.waypoints.length -1))){
          $scope.currentWaypoint = $scope.journey.waypoints[currentWaypointIndex + 1];
        }
      }
    }]);
