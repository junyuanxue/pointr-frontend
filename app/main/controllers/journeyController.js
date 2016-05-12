'use strict';

angular
  .module('main')
  .controller('JourneyController', ['$scope', '$cordovaCamera', '$cordovaFile', 'JourneyService', '$location', 'WaypointService', 'uiGmapGoogleMapApi', 'LocationService',
    function ($scope, $cordovaCamera, $cordovaFile, JourneyService, $location, WaypointService, uiGmapGoogleMapApi, LocationService) {

      _loadCurrentJourneyFromService();

      $scope.currentLocation = null;
      LocationService.watchLocation();
      var currentLocation = LocationService.getCurrentLocation();
      $scope.map = {center: {latitude: 51.517480, longitude: -0.073281}, zoom: 15 };

      watchLocation();


      $scope.createWaypoint = function () {

        $scope.journey = JourneyService.getCurrentJourney();

        if (typeof $scope.journey !== undefined) {
          WaypointService.createWaypoint($scope.journey.id, LocationService.getCurrentLocation())
            .then(function (waypoint) {
              waypoint.marker = {};
              $scope.journey.addWaypoint(waypoint);
              $scope.map = {center: {latitude: parseFloat(waypoint.coords.latitude), longitude: parseFloat(waypoint.coords.longitude)}, zoom: 15 };
            });
        }
      };

      $scope.editJourneyDescription = function (descText) {
        $scope.journey.description = descText;
        JourneyService.updateJourney($scope.journey.id, descText);
      };

      function watchLocation () {
        $scope.$watch(function () {
          return LocationService.getCurrentLocation();
        }, function (oldLocation, currentLocation) {});
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
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true
        };

        $cordovaCamera.getPicture(options)
          .then(function (imageData) {
            $scope.imgURI = 'data:image/jpeg;base64,' + imageData;

            var waypoints = $scope.journey.waypoints;
            var lastWaypoint = waypoints[waypoints.length - 1];
            lastWaypoint.updateImageURI('data:image/jpeg;base64,' + imageData);

          }, function (err) {
            console.log('Error:' + error);
          });
      };
    }]);
