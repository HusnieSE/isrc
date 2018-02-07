var gradeMod = angular.module('gradeModule');

gradeMod.factory('gradeService', ['$http', function  ($http, $q) {
	// body...
	var servicebase = 'app/api/v1/';
	var obj = {};

	obj.get_item = function(q) {
		return $http.get(servicebase + q).then( function(result){
			return result.data;
		})
	}

	return obj
}])