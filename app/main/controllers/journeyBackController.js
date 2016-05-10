
'use strict';

angular
  .module('main')
  .controller('JourneyBackController', ['$scope', 'JourneyFactory', 'JourneyService', 'WaypointService', 'MapService', '$stateParams',
    function ($scope, JourneyFactory, JourneyService, WaypointService, MapService, $stateParams) {
    $scope.distanceFromWaypoint = 'Not Started';
    $scope.map  = MapService.loadMap();
    MapService.watchLocation();

    $scope.startJourneyBack = function () {
      var journeyId = parseInt($stateParams.journeyId);
      JourneyService.getJourney(journeyId).then(function (journey) {
        $scope.journey = journey;
        console.log(journey);
        MapService.watchLocation();
        $scope.map = MapService.loadMap();
        watchLocation();
      });
    };

    //watch the value of currentLocation in the serice and update the view based on that
    //This watch requires the scope variable to be able to perfom its actions
    var watchLocation = function () {
      $scope.$watch(function () {
        return MapService.getCurrentLocation();
      },function (oldLocation, currentLocation) {
        //
        // console.log($scope.journey.waypoints[0]);
        console.log($scope.journey);
        var currentWaypoint = $scope.journey.waypoints[0];
        // console.log($scope.distanceBetween($scope.journey.waypoints[0], currentLocation));
        $scope.distanceFromWaypoint = distanceBetween(currentLocation, currentWaypoint);
      });
    }

    $scope.startJourneyBack();
    console.log($scope.journey);
    $scope.deleteWaypoint = function (waypoint) {
      WaypointService.deleteWaypoint(waypoint.id).then(function (waypoint) {
        waypoint.markAsReached();
      });
    };

    $scope.deleteJourney = function () {
      JourneyService.deleteJourney($scope.journey.id);
    };

    var distanceBetween = function (start, end) {
      if (typeof $scope.map === 'undefined' || $scope.map === null){
        console.log('inside');
        console.log($scope.map);
        $scope.map = MapService.loadMap();
      }
      MapService.loadMap();
      console.log(start);
      console.log(1 + start)
      if (start && end) {
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((end.latitude - start.latitude) * p)/2 +
              c(start.latitude * p) * c(end.latitude * p) *
              (1 - c((end.longitude - start.longitude) * p))/2;
      return 12742 * Math.asin(Math.sqrt(a)) * 1000;
      }
      return "Location not ready";
    }
