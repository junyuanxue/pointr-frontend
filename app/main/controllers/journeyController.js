'use strict';

angular
  .module('main')
  .controller('JourneyController', ['$scope', '$cordovaCamera', '$cordovaFile', 'JourneyService', '$location', 'WaypointService', 'uiGmapGoogleMapApi', 'LocationService',
    function ($scope, $cordovaCamera, $cordovaFile, JourneyService, $location, WaypointService, uiGmapGoogleMapApi, LocationService) {

      $scope.currentLocation = null;
      var INITIAL_COORDS = { latitude: 51.517480, longitude: -0.073281 };
      var MAP_ZOOM = 15;
      $scope.map = { center: INITIAL_COORDS, zoom: MAP_ZOOM };

      _loadCurrentJourneyFromService();
      LocationService.watchLocation();
      _watchLocation();
      // var currentLocation = LocationService.getCurrentLocation();

      $scope.createWaypoint = function () {
        $scope.journey = JourneyService.getCurrentJourney();
        if (typeof $scope.journey !== undefined) {
          WaypointService.createWaypoint($scope.journey.id, LocationService.getCurrentLocation())
            .then(function (waypoint) {
              waypoint.marker = {};
              $scope.journey.addWaypoint(waypoint);
              var coords = _setCoords(waypoint);
              $scope.map = { center: coords, zoom: MAP_ZOOM };
            });
        }
      };

      $scope.editJourneyDescription = function (descText) {
        $scope.journey.description = descText;
        JourneyService.updateJourney($scope.journey.id, descText);
      };

      $scope.editWaypointDescription = function (descText) {
        var lastWaypoint = _getLastWaypoint();
        lastWaypoint.description = descText;
        WaypointService.updateWaypoint(lastWaypoint);
      };

      $scope.loadAllJourneys = function () {
        $location.path('/main/journeys');
      };

      function _watchLocation () {
        $scope.$watch(function () {
          return LocationService.getCurrentLocation();
        }, function (oldLocation, currentLocation) {});
      }

      function _loadCurrentJourneyFromService () {
        $scope.journey = JourneyService.getCurrentJourney();
      }

      function _setCoords (waypoint) {
        return { latitude: parseFloat(waypoint.coords.latitude), longitude: parseFloat(waypoint.coords.longitude) };
      }

      function _getLastWaypoint () {
        var waypoints = $scope.journey.waypoints;
        return waypoints[waypoints.length - 1];
      }

      // $scope.takePhoto = function () {
      //   var options = {
      //     quality: 50,
      //     destinationType: Camera.DestinationType.DATA_URL,
      //     sourceType: Camera.PictureSourceType.CAMERA,
      //     allowEdit: true,
      //     encodingType: Camera.EncodingType.JPEG,
      //     targetWidth: 100,
      //     targetHeight: 100,
      //     popoverOptions: CameraPopoverOptions,
      //     saveToPhotoAlbum: true
      //   };
      //
      //   $cordovaCamera.getPicture(options)
      //     .then(function (imageData) {
      //       $scope.imgURI = 'data:image/jpeg;base64,' + imageData;
      //
      //       var waypoints = $scope.journey.waypoints;
      //       var lastWaypoint = waypoints[waypoints.length - 1];
      //       lastWaypoint.updateImageURI('data:image/jpeg;base64,' + imageData);
      //
      //     }, function (err) {
      //       console.log('Error:' + error);
      //     });
      // };
    }]);
