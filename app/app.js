
var app = angular.module('app', ['ui.router', 'loginModule', 'dashModule', 'sectionModule', 'gradeModule', 'studentModule']); 

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('app', {

		url: '/',
		templateUrl: 'app/module/home/partial/home.html',
		controller: 'loginController'
	})

	.state('logout', {
		
		url: '/logout', 
    templateUrl: 'app/module/home/partial/home.html',
    controller: 'loginController',
    resolve:{

			signout: ['loginService', function(loginService){
				return loginService.do_logout('logout').then (function(results){
				return results;
			})
		}]
		}
	})
}])

app.run(function ($rootScope, $location, loginService) {

	  $rootScope.$on("$stateChangeStart", function (event, next, current) {
	    $rootScope.authenticated  = false;
	    loginService.check_session('check_session').then(function (results) {
        if (results.status == 'success') {
        		
            $rootScope.authenticated = true;
            $rootScope.user_id = results.user_id;
            console.log(results.user_id)
            // $rootScope.aType = results.aType;
        } 
        else { $location.path("/"); }

	    });

	  });

	});