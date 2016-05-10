'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'uiGmapgoogle-maps',
  // TODO: load other modules selected during generation
]).config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyBCbmCVzXuxZa8CvmJbctfWOdCn9wjhtiE',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    })
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/home');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/tabs.html'
    })
    .state('main.home', {
        url: '/home',
        views: {
          'tab-list': {
            templateUrl: 'main/templates/home.html',
            controller: 'HomeController as ctrl'
          }
        }
      })
      .state('main.journey', {
        url: '/journey',
        views: {
          'tab-list': {
            templateUrl: 'main/templates/journey.html',
            controller: 'JourneyController as ctrl'
          }
        }
      })
      .state('main.journeys', {
        url: '/journeys',
        views: {
          'tab-journeys': {
            templateUrl: 'main/templates/journeys.html',
            controller: 'AllJourneysController as ctrl'
          }
        }
      })
      .state('main.journeyback', {
        url: '/journeyback/{journeyId}',
        controller: function ($stateParams) {
          $stateParams.journeyId
        },
        views: {
          'tab-list': {
            templateUrl: 'main/templates/journeyback.html',
            controller: 'JourneyBackController as ctrl'
          }
        }
      });
});
