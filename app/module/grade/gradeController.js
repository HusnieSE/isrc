var gradeMod = angular.module('gradeModule');

gradeMod.controller('levelController', function  ($scope, $location, gradeService) {
	// body...

	gradeService.get_item('get_students').then( function(result){
		$scope.students = result.data;
	})
})