'use strict';

angular
  .module('main')
  .service('LocationService', ['$cordovaGeolocation', function ($cordovaGeolocation) {
    var self = this;
    var options = {timeout: 25000, enableHighAccuracy: true};
    var watch = $cordovaGeolocation.watchPosition(options);
    self.currentLocation = null;

    self.getCurrentLocation = function () {
      return self.currentLocation;
    };

    self.watchLocation = function () {
      watch.then(null, function (err) {
        return err;
      }, function (position) {
        self.currentLocation = position.coords;
        return position;
      });
    };
}]);
