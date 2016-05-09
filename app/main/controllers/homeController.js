'use strict';

angular
  .module('main')
  .controller('HomeController', ['$cordovaCamera', '$cordovaFile', 'JourneyFactory', 'JourneyService', '$location',
      function ($cordovaCamera, cordovaFile, JourneyFactory, JourneyService, $location) {
        var self = this;
        self.startJourney = function () {
          JourneyService.startJourney().then(function (journey) {
            if (typeof journey !== 'undefined' ) {
              $location.path('/main/journey');
              self.journey = journey;
            }
          });
        };

        self.images = [];

        self.takePicture = function () {
          var options = {
                          quality: 75,
                      		destinationType : Camera.DestinationType.DATA_URL,
                      		sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
                      		allowEdit : true,
                          targetWidth: 300,
                          targetHeight: 300,
                      		encodingType: Camera.EncodingType.JPEG,
                      		popoverOptions: CameraPopoverOptions,
                          saveToPhotoAlbum: false
                        }
          $cordovaCamera.getPicture(options).then(function(imageData) {
            self.imgURI = "data:image/jpeg;base64," + imageData;
          }, function(err) {

          });
        }
      }]);
