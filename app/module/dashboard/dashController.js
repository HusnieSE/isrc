var dashMod = angular.module('dashModule');

dashMod.controller('dashboardController', function ($scope, $location, $filter, $rootScope, dashboardService){
	$scope.today=new Date();
	$scope.disable = false;

	dashboardService.get_item('get_section').then( function (section_result) {
		dashboardService.get_item('get_level').then( function (level_result) {
			dashboardService.get_item('count_enrolled').then( function (enrolled_result) {
				dashboardService.get_item('count_dependent').then( function (dependent_result) {
					dashboardService.get_item('count_pending').then( function (pending_result) {
						
						$scope.sections = section_result.data;
						$scope.level = level_result.data;
						$scope.enrolled = enrolled_result.data;
						$scope.dependent = dependent_result.data;
						$scope.pending = pending_result.data;
						console.log($rootScope.user_id);
					})
				})
			})
		})
	})

	dashboardService.get_item('get_level_section').then( function (results) {

		// $scope.levelList = {};
		var grade_level = {};
		angular.forEach(results.data, function(i, e){

			dashboardService.get_item('count_student/'+i.section_id).then( function(results) {
				var count = results.data;
				i.no_student = count[0].no_student;
				grade_level[e] = i
			})
		}, $scope.levelList = grade_level);
	})

	$scope.add_student = function (student_detail) {
		var or_num = new Date();
    $scope.disable = true;
		if(angular.isObject(student_detail)){
			student_detail.or_number = or_num.getFullYear()+''+or_num.getMonth()+''+or_num.getDate()+''+or_num.getHours()+''+or_num.getMinutes()+''+or_num.getSeconds();
			student_detail.user_id = $rootScope.user_id;
			dashboardService.enroll_student('enroll_student', student_detail).then (function (results) {

				if(results.status = 'success'){
					$('#addstudent-modal').modal('hide');
          $location.path('dashboard/profile/'+results.lastInsertedId);
          $scope.disable = false;
          $scope.student = {};
					// dashboardService.get_item('get_student/'+results.lastInsertedId).then(function (result) {
					// // body...
					// 	if (result.status == 'success') {
     //          $scope.student = {};
     //          $scope.disable = false;
     //          $scope.print(result.data);
					// 	}
     //        else{ $scope.disable = false; }
					// })  
				}
        else{ $scope.disable = false; }
			})
		}
		else {
			$scope.disable = false;
		}
	}

	$scope.add_section = function (section_details) {

		dashboardService.add_item('add_section', section_details).then(function  (result) {
			// body...
			if (result.status == 'success') {
				$('#addsection-modal').modal('hide');
				$('#addlevel-modal').modal('hide');
			}
		})
	}

	$scope.add_level = function (level_detail, section_detail) {

		dashboardService.add_item('add_gradelevel', level_detail).then( function (level_id) {
			// body...
			section_detail.grade_id = level_id.last_inserted_id;
			$scope.add_section(section_detail);
		})
	}

	// $scope.print = function (student) {
 //    var originalContents = document.body.innerHTML;      

 //    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
 //      var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=center,status=no,titlebar=no');
 //      popupWin.window.focus();
 //      popupWin.document.write('<!DOCTYPE html><html lang="en"><head>' +
 //          '<style type="text/css"> body{font-family: Times New Roman; margin:0; padding: 1em} h3{margin-bottom:0} h4{margin-top:0}'+ 
 //          'p{margin-bottom:10px; margin-top:0; -webkit-margin-before: 0; -webkit-margin-after: 0; -webkit-margin-start: 0px; -webkit-margin-end: 0px;}'+
 //          '.panel .panel-body p{margin-top:10px; margin-bottom:10px;}</style>' +
 //          '</head><body onload="window.print()">'+ 
 //          '<div class="print-container">'+
 //          '<div class="panel>'+
 //            '<div class="panel-heading" style="text-align: center; margin-bottom:1.5em; padding-bottom:10px; border-bottom: black 1px solid">'+ 
 //              '<h3 style="margin-top 0"> INSAN SUMMER REMEDIAL CLASS </h3>'+
 //              '<h4> MSU-DISTRICT </h4>'+
 //              '<p style="text-align: left; width: 60%; display: inline-block;"> Grade Level: <b style="text-transform: uppercase">'+ student[0].grade_no +'</b></p>'+
 //              '<p style="text-align: left; width: 40%; display: inline-block;"> Section: <b style="text-transform: uppercase">'+ student[0].section_name +'</b></p>'+
 //              '<p style="text-align: left; width: 60%; display: inline-block;"> OR#: <b style="text-transform: uppercase">'+ student[0].or_number +'</b></p>'+
 //              '<p style="text-align: left; width: 40%; display: inline-block;"> Date Enrolled: <b style="text-transform: uppercase">'+ student[0].date_enrolled +'</b></p>'+
 //              '<p style="text-align: left; width: 100%; display: block;"> Status: <b style="text-transform: uppercase">'+ student[0].student_status +'</b></p>'+
 //            '</div>'+
 //            '<div class="panel-body" style="text-align: left">'+
 //            '<p style="text-align: left; width: 60%; display: inline-block; margin-bottom: 5px; font-size:18px"> Name: <b style="text-transform: uppercase">'+ student[0].student_firstname+' '+ student[0].student_middlename+' '+student[0].student_lastname +'</b></p>'+
 //            '<p style="text-align: left; width: 40%; display: inline-block;  margin-bottom: 5px; font-size:18px"> Gender: <b style="text-transform: uppercase">'+ student[0].gender +'</b></p>'+
 //            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Contact Number: <b style="text-transform: uppercase">'+ student[0].student_contact +'</b></p>'+
 //            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Address: <b style="text-transform: uppercase">'+ student[0].student_pa +'</b></p>'+
 //            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Hometown: <b style="text-transform: uppercase">'+ student[0].student_ha +'</b></p>'+
 //            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> School: <b style="text-transform: uppercase">'+ student[0].student_school +'</b></p>'+
 //            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> School Address: <b style="text-transform: uppercase">'+ student[0].school_add +'</b></p>'+
 //            '<p style="text-align: left; width: 60%; display: inline-block;  margin-bottom: 5px; font-size:18px"> Guardian: <b style="text-transform: uppercase">'+ student[0].student_guardian +'</b></p>'+
 //            '<p style="text-align: left; width: 40%; display: inline-block;  margin-bottom: 5px; font-size:18px"> Relation: <b style="text-transform: uppercase">'+ student[0].guardian_relation +'</b></p>'+
 //            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Contact Number: <b style="text-transform: uppercase">'+ student[0].guardian_number +'</b></p>'+
 //            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Address: <b style="text-transform: uppercase">'+ student[0].guardian_add +'</b></p>'+
 //            '<div style="width: 50%; display:inline-block; text-align: center; padding-top: 50px">'+
 //            '<p style="display:block; text-decoration: underline"> '+ student[0].user_firstname +' '+ student[0].user_middlename +' '+ student[0].user_lastname +' </p>'+
 //            '<p style="display:block">Enrolling Officer</p>'+
 //            '</div>'+
 //            '<div style="width: 50%; display:inline-block; text-align: center; padding-top: 50px">'+
 //            '<p style="display:block; text-decoration: underline">Abubacar L. Samsoden</p>'+
 //            '<p style="display:block">Treasurer</p>'+
 //            '</div>'+
 //            '</div>'+
 //          '</div> </div> </body> </html>');
 //      // console.log(printContents);
 //      popupWin.onbeforeunload = function (event) {
 //          popupWin.close();
 //          return '.\n';
 //      };
 //      popupWin.onabort = function (event) {
 //          //popupWin.document.close();
 //          //popupWin.close();
 //      }

 //    } else {
 //      var popupWin = window.open('', '_blank', 'width=800,height=600');
 //      popupWin.document.open();
 //      popupWin.document.write('<!DOCTYPE html><html lang="en"><head>' +
 //          '<style type="text/css"> body{font-family: Times New Roman; margin:0; padding: 1em} h3{margin-bottom:0} h4{margin-top:0}'+ 
 //          'p{margin-bottom:10px; margin-top:0; -webkit-margin-before: 0; -webkit-margin-after: 0; -webkit-margin-start: 0px; -webkit-margin-end: 0px;}'+
 //          '.panel .panel-body p{margin-top:10px; margin-bottom:10px;}</style>' +
 //          '</head><body onload="window.print()">'+ 
 //          '<div class="print-container">'+
 //          '<div class="panel>'+
 //            '<div class="panel-heading" style="text-align: center; margin-bottom:1.5em; padding-bottom:10px; border-bottom: black 1px solid">'+ 
 //              '<h3 style="margin-top 0"> INSAN SUMMER REMEDIAL CLASS </h3>'+
 //              '<h4> MSU-DISTRICT </h4>'+
 //              '<p style="text-align: left; width: 60%; display: inline-block;"> Grade Level: <b style="text-transform: uppercase">'+ student[0].grade_no +'</b></p>'+
 //              '<p style="text-align: left; width: 40%; display: inline-block;"> Section: <b style="text-transform: uppercase">'+ student[0].section_name +'</b></p>'+
 //              '<p style="text-align: left; width: 60%; display: inline-block;"> OR#: <b style="text-transform: uppercase">'+ student[0].or_number +'</b></p>'+
 //              '<p style="text-align: left; width: 40%; display: inline-block;"> Date Enrolled: <b style="text-transform: uppercase">'+ student[0].date_enrolled +'</b></p>'+
 //              '<p style="text-align: left; width: 100%; display: block;"> Status: <b style="text-transform: uppercase">'+ student[0].student_status +'</b></p>'+
 //            '</div>'+
 //            '<div class="panel-body" style="text-align: left">'+
 //            '<p style="text-align: left; width: 60%; display: inline-block; margin-bottom: 5px; font-size:18px"> Name: <b style="text-transform: uppercase">'+ student[0].student_firstname+' '+ student[0].student_middlename+' '+student[0].student_lastname +'</b></p>'+
 //            '<p style="text-align: left; width: 40%; display: inline-block;  margin-bottom: 5px; font-size:18px"> Gender: <b style="text-transform: uppercase">'+ student[0].gender +'</b></p>'+
 //            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Contact Number: <b style="text-transform: uppercase">'+ student[0].student_contact +'</b></p>'+
 //            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Address: <b style="text-transform: uppercase">'+ student[0].student_pa +'</b></p>'+
 //            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Hometown: <b style="text-transform: uppercase">'+ student[0].student_ha +'</b></p>'+
 //            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> School: <b style="text-transform: uppercase">'+ student[0].student_school +'</b></p>'+
 //            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> School Address: <b style="text-transform: uppercase">'+ student[0].school_add +'</b></p>'+
 //            '<p style="text-align: left; width: 60%; display: inline-block;  margin-bottom: 5px; font-size:18px"> Guardian: <b style="text-transform: uppercase">'+ student[0].student_guardian +'</b></p>'+
 //            '<p style="text-align: left; width: 40%; display: inline-block;  margin-bottom: 5px; font-size:18px"> Relation: <b style="text-transform: uppercase">'+ student[0].guardian_relation +'</b></p>'+
 //            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Contact Number: <b style="text-transform: uppercase">'+ student[0].guardian_number +'</b></p>'+
 //            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Address: <b style="text-transform: uppercase">'+ student[0].guardian_add +'</b></p>'+
 //            '<div style="width: 50%; display:inline-block; text-align: center; padding-top: 50px">'+
 //            '<p style="display:block; text-decoration: underline"> '+ student[0].user_firstname +' '+ student[0].user_middlename +' '+ student[0].user_lastname +' </p>'+
 //            '<p style="display:block">Enrolling Officer</p>'+
 //            '</div>'+
 //            '<div style="width: 50%; display:inline-block; text-align: center; padding-top: 50px">'+
 //            '<p style="display:block; text-decoration: underline">Abubacar L. Samsoden</p>'+
 //            '<p style="display:block">Treasurer</p>'+
 //            '</div>'+
 //            '</div>'+
 //          '</div> </div> </body> </html>');
 //      popupWin.document.close();
 //    }
 //    popupWin.document.close();

 //    return true;
	// }


	$scope.logout = function () {

		if(confirm("Are you sure you want to sign out?")){
			$location.path("/logout");
		}
	}
})

var myVar=setInterval(function(){myTimer()},1000);

function myTimer()
{

	var d = new Date();
	var time=d.toLocaleTimeString();
	if (document.getElementById("timer")) {

		document.getElementById("timer").innerHTML=time;
	}
}