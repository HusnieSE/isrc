var studentMod = angular.module('studentModule');

studentMod.factory('studentService', ['$http', '$q', function ($http, $q) {
	// body...

	var servicebase = 'app/api/v1/';
	var obj = {};

	obj.get_student = function (q) {
		// body...
		return $http.get(servicebase + q). then( function (result) {
			// body...
			return result.data;
		})
	}

	obj.update_student = function (q, object) {
		// body...
		return $http.put(servicebase + q, object).then(function (result) {
			// body...
			return result.data;
		})
	}

	return obj
}])