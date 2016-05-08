'use strict';

angular
  .module('main')
  .controller('JourneyController', ['$http', 'JourneyFactory', 'JourneyService', '$location', '$cordovaGeolocation', 'WaypointService',
      function ($http, JourneyFactory, JourneyService, $location, $cordovaGeolocation, WaypointService) {
        var self = this;
        self.journey = JourneyService.getCurrentJourney();
        self.currentLocation = null;
        self.startJourney = function () {
          console.log("HI started journey");
          JourneyService.startJourney().then(function (journey) {
            $location.path('/main/journey');
            console.log(journey);
            if (typeof journey !== 'undefined' ) {
              self.journey = journey;
              console.log(self.journey);
              // create a waypoint;
              // add it to the journey;
            }
          });
        };
        var options = {timeout: 25000, enableHighAccuracy: true};
        var watch = $cordovaGeolocation.watchPosition(options);

        watch.then(null, function (err) {
            console.log(err);
        }, function (position) {
          console.log(position);
          self.currentLocation = position.coords;
          //Add the update the location on the map.
        });
        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
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
          console.log(error);
          console.log('Could not get location');
        });
        self.startJourney = function () {
          JourneyService.startJourney().then(function (journey) {
            if (typeof journey !== 'undefined' ) {
              self.journey = journey;
              self.createWaypoint(self.journey.id);
            }
          });
        };

        self.createWaypoint = function () {
          self.journey = JourneyService.getCurrentJourney();
          console.log(self.journey);
          if (typeof self.journey !== undefined){
            WaypointService.createWaypoint(self.journey.id, self.currentLocation).then(function (waypoint) {
              self.journey.addWaypoint(waypoint);
            });
          }
        };

        self.deleteWaypoint = function (waypoint) {
          WaypointService.deleteWaypoint(waypoint.id).then(function (waypoint) {
            waypoint.markAsReached();
          });
        };

        self.deleteJourney = function () {
          JourneyService.deleteJourney(self.journey.id);
        };
      }]);
