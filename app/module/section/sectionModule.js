var sectionModule = angular.module('sectionModule', ['ui.router']);

sectionModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	// body...

	$stateProvider
	.state('dashboard.section', {
		url:'/list/:param',
		templateUrl:'app/module/section/partial/section.html',
		controller:'sectionController',
		resolve : {
			params: ['$stateParams', function ($stateParams) {
				return $stateParams.param;
			}]
		}
	})

}])