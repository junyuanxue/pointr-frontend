'use strict';

angular
  .module('main')
  .controller('JourneyController', ['$http', 'JourneyFactory', 'JourneyService', '$location', '$cordovaGeolocation', 'WaypointService',
      function ($http, JourneyFactory, JourneyService, $location, $cordovaGeolocation, WaypointService) {
        var self = this;

        self.journey = JourneyService.getCurrentJourney();

        self.currentLocation = null;

        self.startJourney = function () {
          JourneyService.startJourney().then(function (journey) {
            if (typeof journey !== 'undefined' ) {
              $location.path('/main/journey');
              self.journey = journey;
              self.createWaypoint(self.journey.id);
            }
          });
        };

        var options = {timeout: 25000, enableHighAccuracy: true};
        var watch = $cordovaGeolocation.watchPosition(options);

        watch.then(null, function (err) {
            console.log(err);
        }, function (position) {
          self.currentLocation = position.coords;
        });

        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
          self.currentLocation = position.coords;
          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          self.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        }, function (error) {
          console.log(error);
        });

        self.createWaypoint = function () {
          self.journey = JourneyService.getCurrentJourney();
          WaypointService.createWaypoint(self.journey.id, self.currentLocation).then(function (waypoint) {
            self.journey.addWaypoint(waypoint);
          });
        };
      }]);
