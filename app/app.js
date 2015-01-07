'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.home',
  'myApp.version',
  'ngMaterial'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])

.controller('MainCtrl', function($scope, $timeout, $mdSidenav) {
  $scope.toggleRight = function() {
    $mdSidenav('left').toggle();
  };

  $scope.menu = {};
  $scope.menu.pages = [
    {"url": "/home", "discription":"Главная"},
    {"url": "/view1", "discription":"Список дел"}
     
  ];

  $scope.menu.isPageSelected = function(page) {
    return ($scope.menu.currentPage === page);
  };

  $scope.menu.toggleSelectPage = function(page) {
    $scope.menu.currentPage = page;
  };
})

.controller('LeftCtrl', function($scope, $timeout, $mdSidenav) {
  $scope.close = function() {
    $mdSidenav('left').close();
  };
});