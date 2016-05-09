'use strict';

angular
  .module('main')
  .service('MapService', ['$cordovaGeolocation', function ($cordovaGeolocation) {
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

    self.addMarker = function (waypoint) {
      var position = {lat: waypoint.latitude, lng: waypoint.longitude};
      new google.maps.Marker({
        position: position,
        map: self.map,
      });
    };

    self.loadMap = function () {
      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        console.log('HELLO FROM MAP');
        self.currentLocation = position.coords;
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        console.log(self.currentLocation);
        self.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      }, function (error) {
        console.log(error + ' Could not get location');
      });
    };
  }]);
