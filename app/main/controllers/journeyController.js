'use strict';

angular
  .module('main')
  .controller('JourneyController', ['$http', 'JourneyFactory', 'JourneyService', '$location', '$cordovaGeolocation',
      function ($http, JourneyFactory, JourneyService, $location, $cordovaGeolocation) {

        var self = this;

        self.startJourney = function () {
          JourneyService.startJourney().then(function (journey) {
            $location.path('/main/journey');
            if (typeof journey !== 'undefined' ) {
              self.journey = journey;
              // create a waypoint;
              // add it to the journey;
            }
          });
        };
        var options = {timeout: 5000, enableHighAccuracy: true};
        var watch = $cordovaGeolocation.watchPosition(options);

        watch.then(null, function (err) {
            console.log(err);
            console.log('Could not get location');
        }, function (position) {
          var lat  = position.coords.latitude;
          var long = position.coords.longitude;
          console.log(lat + '' + long);
        });
        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
          console.log(position.coords);
          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          self.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        }, function (error) {
          console.log(error);
          console.log('Could not get location');
        });
      }]);
