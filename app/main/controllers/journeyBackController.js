'use strict';

angular
  .module('main')
  .controller('JourneyBackController', ['$timeout', '$scope', 'JourneyFactory', 'JourneyService', 'WaypointService', '$stateParams', 'LocationService',
    function ($timeout, $scope, JourneyFactory, JourneyService, WaypointService, $stateParams, LocationService) {

      $scope.distanceFromWaypoint = '';
      $scope.notificationMessage = '';

      $scope.startJourneyBack = function () {
        var journeyId = parseInt($stateParams.journeyId);
        JourneyService.getJourney(journeyId).then(function (journey) {
          $scope.journey = journey;
          $scope.map = {center: {latitude: 51.517480, longitude: -0.073281}, zoom: 15 };
          LocationService.watchLocation();
          $scope.currentWaypoint = getFirstWaypoint();
          watchLocation();
        });
      };


    //find out what the current Waypoint is
    //trigger an action when distance from current waypoint reaches a certain value

      $scope.startJourneyBack();

      function markAsReached (waypoint) {
        WaypointService.deleteWaypoint(waypoint.id).then(function () {
          waypoint.markAsReached();
        });
      }

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

      function watchLocation () {
        $scope.$watch(function () {
          return LocationService.getCurrentLocation();
        }, function (oldLocation, currentLocation) {
          $scope.currentLocation = currentLocation;
          $scope.currentLocation.center = {
            latitude: $scope.currentLocation.latitude,
            longitude: $scope.currentLocation.longitude
          };

          $scope.currentLocation.stroke = {
            color: '#66CCFF',
            weight: 1,
            opacity: 0.8
          };

          $scope.currentLocation.fill = {
            color: '#66CCFF',
            opacity: 0.6
          };

          if (isCloseEnoughToWaypoint()) {
            changeCurrentWaypoint();
          }
          $scope.distanceFromWaypoint = _displayDistanceBetween(currentLocation, $scope.currentWaypoint.coords);
        });
      }

      function _displayDistanceBetween (location, waypoint) {
        var distance = distanceBetween(location, waypoint);
        var roundedDistance = Math.round(distance);
        return roundedDistance + 'm';
      }

      function getFirstWaypoint () {
        reverseWaypoints();
        return $scope.journey.waypoints[0];
      }

      function reverseWaypoints () {
        $scope.journey.waypoints = $scope.journey.waypoints.reverse();
      }

      function isCloseEnoughToWaypoint () {
        return distanceBetween($scope.currentLocation, $scope.currentWaypoint.coords) < 10;
      }

      function changeCurrentWaypoint () {
        var currentWaypointIndex = $scope.journey.waypoints.indexOf($scope.currentWaypoint);
        $scope.currentWaypoint.icon = {url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'};

        $timeout(function () {
          $scope.notificationMessage = "You've reached a waypoint!"
        }, 1000);

        $timeout(function () {
          $scope.notificationMessage = ''}, 1000);

        markAsReached($scope.journey.waypoints[currentWaypointIndex]);
        if ((currentWaypointIndex) > - 1 && (currentWaypointIndex !== ($scope.journey.waypoints.length - 1))) {
          $scope.currentWaypoint = $scope.journey.waypoints[currentWaypointIndex + 1];
        } else {
          $timeout(function () {
            $scope.notificationMessage = "Journey complete. :)"
          }, 3000);
        }
      }
    }]);
