var studentMod = angular.module('studentModule');

studentMod.controller('studentController', function  ($scope, $location, studentService, student_id) {
	// body...

	studentService.get_student('get_student/' + student_id).then( function (result) {
		// body...
		$scope.student_detail = result.data;
	})

	$scope.edit = function (student) {
		// body...
		$scope.student_id = student.student_id;
		$scope.grade_id = student.grade_id;
		$scope.section_id = student.section_id;
		$scope.student = {
			student_firstname:student.student_firstname,
			student_middlename:student.student_middlename,
			student_lastname:student.student_lastname,
			gender:student.gender,
			section_id:student.section_id,
			student_status:student.student_status,
			student_db:student.student_db,
			student_pb:student.student_pb,
			student_contact:student.student_contact,
			student_pa:student.student_pa,
			student_ha:student.student_ha,
			student_school:student.student_school,
			school_add:student.school_add,
			student_guardian:student.student_guardian,
			guardian_relation:student.guardian_relation,
			guardian_number:student.guardian_number,
			guardian_add:student.guardian_add
		}
		$scope.student.student_db = new Date(student.student_db);
		$scope.grade_level = student.grade_id;
	}

	$scope.save = function (id, info) {
		// body...
		studentService.update_student('edit_student/'+id, info).then(function (result) {
			// body...
			if(result.status == 'success'){
				$('#editstudent-modal').modal('hide');
				$location.path('dashboard/profile/'+id);
			}
		})
	}

	$scope.print = function () {
		var student_pro = $scope.student_detail;
    var originalContents = document.body.innerHTML;      
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=center,status=no,titlebar=no');
      popupWin.window.focus();
      popupWin.document.write('<!DOCTYPE html><html lang="en"><head>' +
          '<style type="text/css"> body{font-family: Times New Roman; margin:0; padding: 1em} h3{margin-bottom:0} h4{margin-top:0}'+ 
          'p{margin-bottom:10px; margin-top:0; -webkit-margin-before: 0; -webkit-margin-after: 0; -webkit-margin-start: 0px; -webkit-margin-end: 0px;}'+
          '.panel .panel-body p{margin-top:10px; margin-bottom:10px;}</style>' +
          '</head><body onload="window.print()">'+ 
          '<div class="print-container">'+
          '<div class="panel>'+
            '<div class="panel-heading" style="text-align: center; margin-bottom:1.5em; padding-bottom:10px; border-bottom: black 1px solid">'+ 
              '<h3 style="margin-top 0"> INSAN SUMMER REMEDIAL CLASS </h3>'+
              '<h4> MSU-DISTRICT </h4>'+
              '<p style="text-align: left; width: 60%; display: inline-block;"> Grade Level: <b style="text-transform: uppercase">'+ student_pro[0].grade_no +'</b></p>'+
              '<p style="text-align: left; width: 40%; display: inline-block;"> Section: <b style="text-transform: uppercase">'+ student_pro[0].section_name +'</b></p>'+
              '<p style="text-align: left; width: 60%; display: inline-block;"> OR#: <b style="text-transform: uppercase">'+ student_pro[0].or_number +'</b></p>'+
              '<p style="text-align: left; width: 40%; display: inline-block;"> Date Enrolled: <b style="text-transform: uppercase">'+ student_pro[0].date_enrolled +'</b></p>'+
              '<p style="text-align: left; width: 100%; display: block;"> Status: <b style="text-transform: uppercase">'+ student_pro[0].student_status +'</b></p>'+
            '</div>'+
            '<div class="panel-body" style="text-align: left">'+
            '<p style="text-align: left; width: 60%; display: inline-block; margin-bottom: 5px; font-size:18px"> Name: <b style="text-transform: uppercase">'+ student_pro[0].student_firstname+' '+ student_pro[0].student_middlename+' '+student_pro[0].student_lastname +'</b></p>'+
            '<p style="text-align: left; width: 40%; display: inline-block;  margin-bottom: 5px; font-size:18px"> Gender: <b style="text-transform: uppercase">'+ student_pro[0].gender +'</b></p>'+
            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Contact Number: <b style="text-transform: uppercase">'+ student_pro[0].student_contact +'</b></p>'+
            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Address: <b style="text-transform: uppercase">'+ student_pro[0].student_pa +'</b></p>'+
            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Hometown: <b style="text-transform: uppercase">'+ student_pro[0].student_ha +'</b></p>'+
            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> School: <b style="text-transform: uppercase">'+ student_pro[0].student_school +'</b></p>'+
            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> School Address: <b style="text-transform: uppercase">'+ student_pro[0].school_add +'</b></p>'+
            '<p style="text-align: left; width: 60%; display: inline-block;  margin-bottom: 5px; font-size:18px"> Guardian: <b style="text-transform: uppercase">'+ student_pro[0].student_guardian +'</b></p>'+
            '<p style="text-align: left; width: 40%; display: inline-block;  margin-bottom: 5px; font-size:18px"> Relation: <b style="text-transform: uppercase">'+ student_pro[0].guardian_relation +'</b></p>'+
            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Contact Number: <b style="text-transform: uppercase">'+ student_pro[0].guardian_number +'</b></p>'+
            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Address: <b style="text-transform: uppercase">'+ student_pro[0].guardian_add +'</b></p>'+
            '<div style="width: 50%; display:inline-block; text-align: center; padding-top: 50px">'+
            '<p style="display:block; text-decoration: underline"> '+ student_pro[0].user_firstname +' '+ student_pro[0].user_middlename +' '+ student_pro[0].user_lastname +' </p>'+
            '<p style="display:block">Enrolling Officer</p>'+
            '</div>'+
            '<div style="width: 50%; display:inline-block; text-align: center; padding-top: 50px">'+
            '<p style="display:block; text-decoration: underline">Abubacar L. Samsoden</p>'+
            '<p style="display:block">Treasurer</p>'+
            '</div>'+
            '</div>'+
          '</div> </div> </body> </html>');
      // console.log(printContents);
      popupWin.onbeforeunload = function (event) {
          popupWin.close();
          return '.\n';
      };
      popupWin.onabort = function (event) {
          //popupWin.document.close();
          //popupWin.close();
      }

    } else {
      var popupWin = window.open('', '_blank', 'width=800,height=600');
      popupWin.document.open();
      popupWin.document.write('<!DOCTYPE html><html lang="en"><head>' +
          '<style type="text/css"> body{font-family: Times New Roman; margin:0; padding: 1em} h3{margin-bottom:0} h4{margin-top:0}'+ 
          'p{margin-bottom:10px; margin-top:0; -webkit-margin-before: 0; -webkit-margin-after: 0; -webkit-margin-start: 0px; -webkit-margin-end: 0px;}'+
          '.panel .panel-body p{margin-top:10px; margin-bottom:10px;}</style>' +
          '</head><body onload="window.print()">'+ 
          '<div class="print-container">'+
          '<div class="panel>'+
            '<div class="panel-heading" style="text-align: center; margin-bottom:1.5em; padding-bottom:10px; border-bottom: black 1px solid">'+ 
              '<h3 style="margin-top 0"> INSAN SUMMER REMEDIAL CLASS </h3>'+
              '<h4> MSU-DISTRICT </h4>'+
              '<p style="text-align: left; width: 60%; display: inline-block;"> Grade Level: <b style="text-transform: uppercase">'+ student_pro[0].grade_no +'</b></p>'+
              '<p style="text-align: left; width: 40%; display: inline-block;"> Section: <b style="text-transform: uppercase">'+ student_pro[0].section_name +'</b></p>'+
              '<p style="text-align: left; width: 60%; display: inline-block;"> OR#: <b style="text-transform: uppercase">'+ student_pro[0].or_number +'</b></p>'+
              '<p style="text-align: left; width: 40%; display: inline-block;"> Date Enrolled: <b style="text-transform: uppercase">'+ student_pro[0].date_enrolled +'</b></p>'+
              '<p style="text-align: left; width: 100%; display: block;"> Status: <b style="text-transform: uppercase">'+ student_pro[0].student_status +'</b></p>'+
            '</div>'+
            '<div class="panel-body" style="text-align: left">'+
            '<p style="text-align: left; width: 60%; display: inline-block; margin-bottom: 5px; font-size:18px"> Name: <b style="text-transform: uppercase">'+ student_pro[0].student_firstname+' '+ student_pro[0].student_middlename+' '+student_pro[0].student_lastname +'</b></p>'+
            '<p style="text-align: left; width: 40%; display: inline-block;  margin-bottom: 5px; font-size:18px"> Gender: <b style="text-transform: uppercase">'+ student_pro[0].gender +'</b></p>'+
            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Contact Number: <b style="text-transform: uppercase">'+ student_pro[0].student_contact +'</b></p>'+
            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Address: <b style="text-transform: uppercase">'+ student_pro[0].student_pa +'</b></p>'+
            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Hometown: <b style="text-transform: uppercase">'+ student_pro[0].student_ha +'</b></p>'+
            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> School: <b style="text-transform: uppercase">'+ student_pro[0].student_school +'</b></p>'+
            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> School Address: <b style="text-transform: uppercase">'+ student_pro[0].school_add +'</b></p>'+
            '<p style="text-align: left; width: 60%; display: inline-block;  margin-bottom: 5px; font-size:18px"> Guardian: <b style="text-transform: uppercase">'+ student_pro[0].student_guardian +'</b></p>'+
            '<p style="text-align: left; width: 40%; display: inline-block;  margin-bottom: 5px; font-size:18px"> Relation: <b style="text-transform: uppercase">'+ student_pro[0].guardian_relation +'</b></p>'+
            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Contact Number: <b style="text-transform: uppercase">'+ student_pro[0].guardian_number +'</b></p>'+
            '<p style="text-align: left; width: 100%; display: block;  margin-bottom: 5px; font-size:18px"> Address: <b style="text-transform: uppercase">'+ student_pro[0].guardian_add +'</b></p>'+
            '<div style="width: 50%; display:inline-block; text-align: center; padding-top: 50px">'+
            '<p style="display:block; text-decoration: underline"> '+ student_pro[0].user_firstname +' '+ student_pro[0].user_middlename +' '+ student_pro[0].user_lastname +' </p>'+
            '<p style="display:block">Enrolling Officer</p>'+
            '</div>'+
            '<div style="width: 50%; display:inline-block; text-align: center; padding-top: 50px">'+
            '<p style="display:block; text-decoration: underline">Abubacar L. Samsoden</p>'+
            '<p style="display:block">Treasurer</p>'+
            '</div>'+
            '</div>'+
          '</div> </div> </body> </html>');
      popupWin.document.close();
    }
    popupWin.document.close();

    return true;
	}
})