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

        self.addImage = function () {
          var options = {
                      		destinationType : Camera.DestinationType.FILE_URI,
                      		sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
                      		allowEdit : false,
                      		encodingType: Camera.EncodingType.JPEG,
                      		popoverOptions: CameraPopoverOptions,
                        }
          $cordovaCamera.getPicture(options).then(function(imageData) {
            onImageSuccess(imageData);

            function onImageSuccess(fileURI) {
              createFileEntry(fileURI);
            }

            function createFileEntry(fileURI) {
              window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
            }

            function copyFile(fileEntry) {
              var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
              var newName = makeid() + name;

              window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                fileEntry.copyTo(
                  fileSystem2,
                  newName,
                  onCopySuccess,
                  fail
                );
              },
              fail);
            }

            function onCopySuccess(entry) {
              self.$apply(function () {
                self.images.push(entry.nativeURL);
              });
            }

            function fail(error) {
              console.log("fail: " + error.code);
            }

            function makeid() {
              var text = "";
              var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

              for (var i=0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
              }
              return text;
            }

          }, function(err) {
            console.log(err);
          });
        }

        self.urlForImage = function (imageName) {
          console.log("get correct path for image");
        }

        self.urlForImage = function(imageName) {
          var name = imageName.substr(imageName.lastIndexOf('/') + 1);
          var trueOrigin = cordova.file.dataDirectory + name;
          return trueOrigin;
        }

      }]);
