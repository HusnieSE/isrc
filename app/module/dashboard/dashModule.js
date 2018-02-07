var dashModule = angular.module('dashModule', ['ui.router']);

dashModule.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider
	.state('dashboard.home', {

		url:'/home',
		templateUrl:'app/module/dashboard/partial/dash.html',
		controller:'dashboardController'
	})
	
}])