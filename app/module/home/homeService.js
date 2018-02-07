var loginMod = angular.module('loginModule');

loginMod.factory('loginService', ['$http', '$q', function ($http, $q) {
	// body...
	var servicebase = 'app/api/v1/';
	var obj = {};

	obj.do_login = function (q, object) {
		return $http.post(servicebase + q, object).then( function(results){
			return results.data
		});
	};

	obj.check_session = function (q) {
		return $http.get(servicebase + q).then( function(results){
			return results.data
		});
	};

	obj.check_connection = function (q) {
		return $http.get(servicebase + q).then( function(results){
			return results.data
		});
	};

	obj.add_user = function (q, object) {
		return $http.post(servicebase + q, object).then( function(results){
			return results.data
		});
	};

	obj.do_logout = function (q) {
		return $http.get(servicebase + q).then( function(results){
			return results.data
		});
	};

	return obj;

}])