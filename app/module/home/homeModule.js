var loginModule = angular.module('loginModule', ['ui.router']);

loginModule.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider

	.state('dashboard', {

		url:'/dashboard',
		templateUrl: 'app/module/dashboard/partial/dashboard.html',
		controller: 'dashboardController'
	})
	
	// .state('dashboard.home', {

	// 	url:'/home',
	// 	templateUrl:'app/module/dashboard/partial/dash.html',
	// })
}])