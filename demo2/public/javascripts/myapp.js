var app = angular.module("mainApp", ["ngRoute", "ngResource"]);

app.config(function($routeProvider){
	$routeProvider.when("/", {
		templateUrl: "pages/home.html",
		controller: "homeCtrl"
	})
	.when('/add', {
		templateUrl: 'pages/person-form.html',
		controller: 'addCtrl'
	})
	.when('/update/:id', {
		templateUrl: 'pages/person-form.html',
		controller: "updateCtrl"
	})
	.when('/delete/:id', {
		templateUrl: 'pages/person-delete.html',
		controller: "deleteCtrl"
	})
	.otherwise({
		redirectTo: "/"
	});
});

app.controller("homeCtrl", ["$scope", "$resource", function($scope, $resource){
	var collection = $resource("/api/person");
	collection.query(function(data){
		$scope.persons = data;
	});
}]);

app.controller("addCtrl", function($scope, $resource, $location){
	var collection = $resource("/api/person");
	$scope.save = function(){
		collection.save($scope.person, function(){
			$location.path("/");
		});
	};
});

app.controller("updateCtrl", ["$scope", "$resource", "$location", "$routeParams", 
	function($scope, $resource, $location, $routeParams){
	var collection = $resource("/api/person/:id", {id: "@_id"},
		{update: {method: "PUT"}});
	
	collection.get({id: $routeParams.id}, function(data){
		$scope.person = data;
	});
	$scope.save = function(){
		collection.update($scope.person, function(){
			$location.path("/");
		});
	};
}]);

app.controller("deleteCtrl", ["$scope", "$resource", "$location", "$routeParams", 
	function($scope, $resource, $location, $routeParams){
	var collection = $resource("/api/person/:id");
	collection.get({id: $routeParams.id}, function(data){
		$scope.person = data;
	});
	$scope.delete = function(){
		collection.delete({id: $routeParams.id}, function(){
			$location.path("/");
		})
	}
}]);