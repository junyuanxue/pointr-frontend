'use strict';

angular
  .module('main')
  .controller('JourneyController', ['$cordovaCamera', '$cordovaFile', 'JourneyService', '$location', 'WaypointService', 'MapService',
    function ($cordovaCamera, $cordovaFile, JourneyService, $location, WaypointService, MapService) {
      var self = this;

      _loadCurrentJourneyFromService();

      self.currentLocation = null;
      MapService.watchLocation();
      MapService.loadMap();

      self.createWaypoint = function () {
        self.journey = JourneyService.getCurrentJourney();
        if (typeof self.journey !== undefined) {
          self.currentLocation = MapService.getCurrentLocation();
          WaypointService.createWaypoint(self.journey.id, self.currentLocation)
            .then(function (waypoint) {
              self.journey.addWaypoint(waypoint);
              MapService.addMarker(waypoint);
            });
        }
      };

      self.editJourneyDescription = function (descText) {
        self.journey.description = descText;
        JourneyService.updateJourney(descText);
      };

      self.editWaypointDescription = function (descText) {
        var lastWaypoint = self.getLastWaypoint();
        lastWaypoint.description = descText;
        WaypointService.updateWaypoint(lastWaypoint.id, descText);
      };

      self.getLastWaypoint = function () {
        var waypoints = self.journey.waypoints;
        return waypoints[waypoints.length - 1];
      };

      function _loadCurrentJourneyFromService () {
        self.journey = JourneyService.getCurrentJourney();
      }

      self.takePhoto = function () {
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
            self.imgURI = "data:image/jpeg;base64," + imageData;
          }, function (err) {
            console.log("Error:" + error);
          });
      }
    }]);
