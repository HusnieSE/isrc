var gradeModule = angular.module('gradeModule', ['ui.router']);

gradeModule.config(['$stateProvider', '$urlRouterProvider', function  ($stateProvider, $urlRouterProvider) {
	// body...

	$stateProvider

	.state('dashboard.grade', {
		url:'/listOfgrade',
		templateUrl:'app/module/grade/partial/listOfSection.html',
		controller: 'levelController'
	})
}])