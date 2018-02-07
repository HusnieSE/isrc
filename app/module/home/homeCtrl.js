var loginMod = angular.module('loginModule');

loginMod.controller('loginController', function($scope, $location, loginService) {

	loginService.check_connection('check_connection').then(function(results){
		if (results.status=='error') {
			$('#loading-modal').modal('show');
			loginService.check_connection('create_database').then(function (create_result) {
				if (create_result.status=='success') {
					loginService.check_connection('create_tables').then(function (table_result) {
						$('#loading-modal').modal('hide');
					})
				};
			})
		}
	})

	$scope.disable = false;
	$scope.login = function(account){
		$scope.disable = true;
		loginService.do_login('check_account', {account:account}).then(function(results){

			if(results.status === 'success'){
				$location.path('dashboard/home');
				// $('#login-modal').modal('hide');
			}
			else{
				alert('Invalid Username or Password')
				$scope.disable = false;
				// $('#login-modal').modal('hide');
			}
		})
	}

	$scope.signup = function () {
		
		loginService.add_user('add_user', $scope.user).then(function (results) {
			
			if(results.status == 'success'){
				$scope.acc.user_id = results.last_inserted_id;
				loginService.add_user('add_account', $scope.acc).then(function (result) {
					
					if (result.status == 'success') {
						$('#signup-modal').modal('hide');
					}
					else{

					}
				})
			}
		})
	}
})