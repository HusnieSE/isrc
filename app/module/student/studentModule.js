var studentModule = angular.module('studentModule', ['ui.router']);

studentModule.config(['$stateProvider', '$urlRouterProvider', function  ($stateProvider, $urlRouterProvider)  {
	// body...

	$stateProvider

	.state('dashboard.profile', {

		url:'/profile/:id',
		templateUrl:'app/module/student/partial/profile.html',
		controller: 'studentController',
		resolve: {
			student_id: ['$stateParams', function ($stateParams) {
				// body...
				return $stateParams.id;
			}]
		}
	})
}])