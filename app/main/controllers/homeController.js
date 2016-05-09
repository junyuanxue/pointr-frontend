'use strict';

angular
  .module('main')
  .controller('HomeController', ['$scope', '$cordovaCamera', '$cordovaFile', 'JourneyFactory', 'JourneyService', '$location',
      function ($scope, $cordovaCamera, cordovaFile, JourneyFactory, JourneyService, $location) {
        var self = this;
        self.startJourney = function () {
          JourneyService.startJourney().then(function (journey) {
            if (typeof journey !== 'undefined' ) {
              $location.path('/main/journey');
              self.journey = journey;
            }
          });
        };

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

          $cordovaCamera.getPicture(options).then(function (imageData) {
                        self.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
        }

        // self.images = [];
        //
        // self.takePhoto = function () {
        //   var options = {
        //                   destinationType : Camera.DestinationType.FILE_URI,
        //                   sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
        //                   allowEdit : false,
        //                   encodingType: Camera.EncodingType.JPEG,
        //                   popoverOptions: CameraPopoverOptions
        //                 }
        //   $cordovaCamera.getPicture(options).then(function(imageData) {
        //     onImageSuccess(imageData);
        //
        // 		function onImageSuccess(fileURI) {
        // 			createFileEntry(fileURI);
        // 		}
        //
        //     function createFileEntry(fileURI) {
        // 			window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
        // 		}
        //
        //     function copyFile(fileEntry) {
        // 			var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
        // 			var newName = makeid() + name;
        //
        // 			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
        // 				fileEntry.copyTo(
        // 					fileSystem2,
        // 					newName,
        // 					onCopySuccess,
        // 					fail
        // 				);
        // 			},
        // 			fail);
        // 	   }
        //
        //     function onCopySuccess(entry) {
        // 			$scope.$apply(function () {
        // 				self.images.push(entry.nativeURL);
        // 			});
        // 		}
        //
        //     function fail(error) {
        // 			console.log("fail: " + error.code);
        // 		}
        //
        //     function makeid() {
        // 			var text = "";
        // 			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        //
        // 			for (var i=0; i < 5; i++) {
        // 				text += possible.charAt(Math.floor(Math.random() * possible.length));
        // 			}
        // 			return text;
        // 		}
        //
        //   }, function (err) {
        //     console.log(err);
        //   });
        // }
        //
        // self.urlForImage = function(imageName) {
        //   var name = imageName.substr(imageName.lastIndexOf('/') + 1);
        //   var trueOrigin = cordova.file.dataDirectory + name;
        //   return trueOrigin;
        // }

      }]);
