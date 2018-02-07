var sectionMod = angular.module('sectionModule');

sectionMod.controller('sectionController', function ($scope, $location, params, sectionService) {

	// $scope.section = params;
	sectionService.get_students('get_students/'+ params).then (function (result) {
		// body...
		$scope.students = result.data;
	})

	$scope.print = function (divName) {

    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;      

    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=center,status=no,titlebar=no');
      popupWin.window.focus();
      popupWin.document.write('<!DOCTYPE html><html><head>' +
          '<link rel="stylesheet" type="text/css" href="assets/style/main.css">' +
          '</head><body onload="window.print()">'+ 
          '<div class="print-container">'+
          '<div class="panel panel-primary>'+
            '<div class="panel-heading" style="text-align: center; border-bottom: 1px solid black; color: #428bca">'+ 
              '<h3> Insan Summer Remedial Class </h3>'+
              '<h4> MSU-District </h4>'+
            '</div>'+
            '<div class="panel-body" style="text-align: center">' + printContents + '</div>'+
          '</div> </div> </body> </html>');
      popupWin.onbeforeunload = function (event) {
          popupWin.close();
          return '.\n';
      };
      popupWin.onabort = function (event) {
          popupWin.document.close();
          popupWin.close();
      }
    } else {
      var popupWin = window.open('', '_blank', 'width=800,height=600');
      popupWin.document.open();
      popupWin.document.write('<html><head><<link rel="stylesheet" type="text/css" href="assets/style/main.css"></head><body onload="window.print()">' + printContents + '</html>');
      popupWin.document.close();
    }
    popupWin.document.close();

    return true;
	}
})
