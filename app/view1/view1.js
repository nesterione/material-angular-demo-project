'use strict';

angular.module('myApp.view1', ['ngRoute','ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $mdDialog, $mdToast, $animate) {
  	
   $scope.todos = [
      {
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands",
        check: false,
        show: false
      },
      {
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands",
        check: false,
        show: false
      },
      {
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands",
        check: false,
        show: false
      },
      {
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands",
        check: false,
        show: false
      },
      {
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands",
        check: false,
        show: false
      },
    ]



  $scope.alert = '';
    $scope.doSomething = function(item ) {
    	item.show = true;
    	//$scope.isShow= true;
    };

	$scope.doSomethingElse = function(item ) {
		item.show = false;
		//$scope.isShow= false;
    };

$scope.countSelected = 0;
$scope.oneSelected= false;

$scope.deselectAll = function(item) {
	
	$scope.todos.forEach( function(element) {

		decheck(element);
	});

	if($scope.countSelected>0) {
		$scope.oneSelected = true;
	} else {
		$scope.oneSelected = false;
	}
}

 $scope.toastPosition = {
    bottom: true,
    top: false,
    left: true,
    right: false
  };

  $scope.getToastPosition = function() {
    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

$scope.archiveAll = function () {
	
	//Здесь должен выполняться запросс на удаление
	var newTodos = [];
	$scope.todos.forEach(function(item){
	    if(item.check ===false){
	        newTodos.push(item);
	    }
	});

	$scope.todos = newTodos;
	

$mdToast.show(
      $mdToast.simple()
        .content('Отправленно в архив записей: ' + $scope.countSelected)
        .position($scope.getToastPosition())
        .hideDelay(3000)
    );
 
    $scope.oneSelected = false;
	$scope.countSelected = 0;
}

function decheck(item) {
	if(item.check===true) {
		$scope.countSelected--;
	} 

	item.check=false;
}

$scope.oneCheck = function(item) {
	 
	if(item.check===true) {
		$scope.countSelected++;
	} else {
		$scope.countSelected--;
	}

	if($scope.countSelected>0) {
		$scope.oneSelected = true;
	} else {
		$scope.oneSelected = false;
	}
};



  $scope.showAlert = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('This is an alert title')
        .content('You can specify some description text in here.')
        .ariaLabel('Password notification')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };

})

