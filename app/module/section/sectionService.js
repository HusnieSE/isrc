var sectionMod = angular.module('sectionModule');

sectionMod.factory('sectionService', ['$http', '$q', function  ($http, $q) {
	// body...
	var servicebase = 'app/api/v1/';
	var obj = {};

	obj.get_students = function (q) {
		// body...
		return $http.get( servicebase + q ).then (function (result) {
			// body...
			return result.data;
		})
	}

	return obj;
}])