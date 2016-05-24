'use strict';

angular
  .module('main')
  .controller('JourneyBackController', ['$timeout', '$scope', 'JourneyFactory', 'JourneyService', 'WaypointService', '$stateParams', 'LocationService',
    function ($timeout, $scope, JourneyFactory, JourneyService, WaypointService, $stateParams, LocationService) {

      $scope.distanceFromWaypoint = '';
      $scope.notificationMessage = '';
      var NEAR_WAYPOINT_SCOPE = 15;
      var INITIAL_COORDS = { latitude: 51.517480, longitude: -0.073281 };
      var MAP_ZOOM = 15;

      $scope.startJourneyBack = function () {
        var journeyId = parseInt($stateParams.journeyId);
        JourneyService.getJourney(journeyId).then(function (journey) {
          $scope.journey = journey;
          $scope.map = { center: INITIAL_COORDS, zoom: MAP_ZOOM };
          LocationService.watchLocation();
          $scope.currentWaypoint = _getFirstWaypoint();
          _watchLocation();
        });
      };

      $scope.startJourneyBack();

      $scope.deleteJourney = function () {
        JourneyService.deleteJourney($scope.journey.id);
      };

      function _distanceBetween (start, end) {
        if (start && end) {
          var p = 0.017453292519943295;    // Math.PI / 180
          var c = Math.cos;
          var a = 0.5 - c((end.latitude - start.latitude) * p) / 2 +
              c(start.latitude * p) * c(end.latitude * p) *
              (1 - c((end.longitude - start.longitude) * p)) / 2;
          return 12742 * Math.asin(Math.sqrt(a)) * 1000;
        }
        return 'Location not ready';
      }

      function _watchLocation () {
        $scope.$watch(function () {
          return LocationService.getCurrentLocation();
        }, function (oldLocation, currentLocation) {
          $scope.currentLocation = currentLocation;
          _setMapCircleCenter();
          _setMapCircleStroke();
          _setMapCircleFill();
          if (_isCloseEnoughToWaypoint()) { _changeCurrentWaypoint(); }
          $scope.distanceFromWaypoint = _displayDistanceBetween(currentLocation, $scope.currentWaypoint.coords);
        });
      }

      function _setMapCircleCenter () {
        $scope.currentLocation.center = {
          latitude: $scope.currentLocation.latitude,
          longitude: $scope.currentLocation.longitude
        };
      }

      function _setMapCircleStroke () {
        $scope.currentLocation.stroke = {
          color: '#66CCFF',
          weight: 1,
          opacity: 0.8
        };
      }

      function _setMapCircleFill () {
        $scope.currentLocation.fill = {
          color: '#66CCFF',
          opacity: 0.6
        };
      }

      function _displayDistanceBetween (start, end) {
        var distance = _distanceBetween(start, end);
        var roundedDistance = Math.round(distance);
        return roundedDistance + 'm';
      }

      function _getFirstWaypoint () {
        _reverseWaypoints();
        return $scope.journey.waypoints[0];
      }

      function _reverseWaypoints () {
        $scope.journey.waypoints = $scope.journey.waypoints.reverse();
      }

      function _isCloseEnoughToWaypoint () {
        return _distanceBetween($scope.currentLocation, $scope.currentWaypoint.coords) < NEAR_WAYPOINT_SCOPE;
      }

      function _changeCurrentWaypoint () {
        var currentWaypointIndex = $scope.journey.waypoints.indexOf($scope.currentWaypoint);
        _onWaypointReached();
        _markAsReached($scope.journey.waypoints[currentWaypointIndex]);
        if (_validateWaypoint()) {
          $scope.currentWaypoint = $scope.journey.waypoints[currentWaypointIndex + 1];
        } else {
          $timeout(function () {
            $scope.notificationMessage = 'Journey complete :)';
          }, 3000);
          // $scope.deleteJourney();
        }
      }

      function _onWaypointReached () {
        _changePinIcon();
        $scope.notificationMessage = 'You\'ve reached a waypoint!';
        $timeout(function () {
          $scope.notificationMessage = '';
        }, 2000);
      }

      function _changePinIcon () {
        // $scope.currentWaypoint.icon = {url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'};
        $scope.currentWaypoint.icon = { url: 'http://pix.iemoji.com/hang33/0459.png' };
      }

      function _markAsReached (waypoint) {
        WaypointService.deleteWaypoint(waypoint.id).then(function () {
          waypoint.markAsReached();
        });
      }

      function _validateWaypoint (currentWaypointIndex) {
        return _isInWaypointsArray(currentWaypointIndex) && (_isNotLastWaypoint(currentWaypointIndex));
      }

      function _isInWaypointsArray (index) {
        return index > - 1;
      }

      function _isNotLastWaypoint (index) {
        index !== $scope.journey.waypoints.length - 1;
      }
    }]);
