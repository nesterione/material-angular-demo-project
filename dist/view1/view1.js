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
      	color: {
    		red: 125,
    		green: 5,
    		blue: 50
      	},
        what: 'Brunch this weekend?',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands",
        check: false,
        show: false,
        visible: true // для анимации удаления
      },
      {
        what: 'Brunch this weekend?',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands",
        check: false,
        show: false,
        visible: true
      },
      {
        what: 'Brunch this weekend?',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands",
        check: false,
        show: false,
        visible: true
      },
      {
        what: 'Brunch this weekend?',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands",
        check: false,
        show: false,
        visible: true
      },
      {
        what: 'Brunch this weekend?',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands",
        check: false,
        show: false,
        visible: true
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
	       
	    } else {
	    	 item.visible = false;
	    }
	});


	setTimeout( function() {
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

	
	$scope.countSelected = 0; 

	} ,1000);

	$scope.oneSelected = false;

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
  
$mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog.tmpl.html', 
      targetEvent: ev,
    })
    .then(function(answer) {
    	 
       
var item = {

	color: answer.color,
	what: answer.what,
        when: answer.when,
        notes: answer.notes,
        check: false,
        show: false,
        visible: true  
};

	$scope.todos.unshift(item);


	$mdToast.show(
      $mdToast.simple()
        .content('Задание добавлено')
        .position($scope.getToastPosition())
        .hideDelay(3000)
    );

    }, function() {
       /*  'You cancelled the dialog.';*/
    });


   /* $mdDialog.show(
      $mdDialog.alert()
        .title('This is an alert title')
        .content('You can specify some description text in here.')
        .ariaLabel('Password notification')
        .ok('Got it!')
        .targetEvent(ev)
    );*/
  };

});

function DialogController($scope, $mdDialog) {

$scope.todo = {};

 $scope.todo.color = {
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255)
  };

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

