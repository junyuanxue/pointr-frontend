'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
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
            // controller: 'SomeCtrl as ctrl'
          }
        }
      })
      .state('main.journey', {
        url: '/journey',
        views: {
          'tab-list': {
            templateUrl: 'main/templates/journey.html',
            // controller: 'SomeCtrl as ctrl'
          }
        }
      })
      .state('main.transition', {
        url: '/transition',
        views: {
          'tab-list': {
            templateUrl: 'main/templates/transition.html',
            // controller: 'SomeCtrl as ctrl'
          }
        }
      });
});
