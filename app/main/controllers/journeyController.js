'use strict';

angular
  .module('main')
  .controller('JourneyController', ['$scope', '$cordovaToast', '$cordovaCamera', '$cordovaFile', 'JourneyService', '$location', 'WaypointService', 'uiGmapGoogleMapApi', 'LocationService',
    function ($scope, $cordovaToast, $cordovaCamera, $cordovaFile, JourneyService, $location, WaypointService, uiGmapGoogleMapApi, LocationService) {

      _loadCurrentJourneyFromService();

      $scope.currentLocation = null;
      LocationService.watchLocation();
      $scope.map = {center: {latitude: 51.51, longitude: -0.071}, zoom: 15 };
      watchLocation();

      var currentLocation = LocationService.getCurrentLocation();
      console.log(currentLocation);
      $scope.createWaypoint = function () {
        console.log('Clicked');
        $scope.journey = JourneyService.getCurrentJourney();
        if (typeof $scope.journey !== undefined) {
          WaypointService.createWaypoint($scope.journey.id, LocationService.getCurrentLocation())
            .then(function (waypoint) {
              waypoint.marker = {};
              console.log(waypoint);
              $scope.journey.addWaypoint(waypoint);

              console.log(waypoint.coords.latitude);
              console.log(waypoint.coords.longitude);
              $scope.map = {center: {latitude: parseFloat(waypoint.coords.latitude), longitude: parseFloat(waypoint.coords.longitude)}, zoom: 15 };

              $cordovaToast
                .show('Dropped pin', 'long', 'center');
            });
        }
      };

      $scope.editJourneyDescription = function (descText) {
        $scope.journey.description = descText;
        JourneyService.updateJourney($scope.journey.id, descText);
      }

      function watchLocation() {
        $scope.$watch(function () {
          return LocationService.getCurrentLocation();
        },function (oldLocation, currentLocation) {

          var currentWaypoint = $scope.journey.waypoints[0];
          // $scope.distanceFromWaypoint = distanceBetween(currentLocation, currentWaypoint);
        });
      }

      $scope.editWaypointDescription = function (descText) {
        var lastWaypoint = $scope.getLastWaypoint();
        lastWaypoint.description = descText;
        WaypointService.updateWaypoint(lastWaypoint);
      };

      $scope.getLastWaypoint = function () {
        var waypoints = $scope.journey.waypoints;
        return waypoints[waypoints.length - 1];
      };

      $scope.loadAllJourneys = function () {
        $location.path('/main/journeys');
      };

      function _loadCurrentJourneyFromService () {
        $scope.journey = JourneyService.getCurrentJourney();
      }

      $scope.takePhoto = function () {
        var options = {
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true
        };

        $cordovaCamera.getPicture(options)
          .then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            _showPhotoToast();

            var waypoints = $scope.journey.waypoints;
            var lastWaypoint = waypoints[waypoints.length - 1];
            lastWaypoint.updateImageURI("data:image/jpeg;base64," + imageData);

          }, function (err) {
            console.log("Error:" + error);
          });
      };

      function _showPhotoToast () {
        $cordovaToast
          .show('Picture added!', 'long', 'center');
      };

    }]);
