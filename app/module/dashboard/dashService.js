var dashMod = angular.module('dashModule');

dashMod.factory('dashboardService', ['$http', '$q', function ($http, $q) {
	// body...
	var servicebase = 'app/api/v1/';
	var obj = {}

	obj.get_item = function (q) {
		return $http.get(servicebase + q).then( function(results){
			return results.data;
		})
	};

	obj.get_sections = function (q, object) {
		return $http.get(servicebase + q, object).then( function(results){
			return results.data;
		})
	}

	obj.enroll_student = function (q, object) {
		return $http.post(servicebase + q, object).then( function (results) {
			// body...
			return results.data;
		})
	}

	obj.add_item = function (q, object) {
		return $http.post(servicebase + q, object).then( function (results) {
			// body...
			return results.data;
		})
	}

	return obj;
}])