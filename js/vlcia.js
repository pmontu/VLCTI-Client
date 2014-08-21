var app = angular.module("vlcimApp",['ui.bootstrap','ngRoute']);

//app.controller = DatepickerDemoCtrl;

app.config(function($routeProvider,$httpProvider){
  $routeProvider.when('/',
  {
    controller: "receiptController",
    templateUrl: "views/receipts.html"
  })
  .when('/receipt',{
    templateUrl:"views/receipts.html",
    controller:"receiptController"
  });
  $httpProvider.defaults.transformRequest = function(data){
    if (data === undefined) {
      return data;
    }
    return $.param(data);
  }
});

app.controller("receiptController",function($scope,instituteFactory){

  $scope.searchStudentForm = {};

  //  STAGE 0 - STUDENTS
  var reloadStudents = function(){

    $scope.searchStudentForm.name = ""
    $scope.searchStudentForm.id = 0;

    refreshStudents();
  };

  //  STAGE 1 - STUDENTS
  var refreshStudents = function(){

    //  RESET
    $scope.filterStudent = null;


    //  FETCH STUDENTS
    var requestData = {
      "name":$scope.searchStudentForm.name,
      "id":$scope.searchStudentForm.id
    }
    instituteFactory.getStudents(requestData).success(function(data){
      if(data.length>0)
        $scope.students = data;
    });

  };

  //  STAGE 2 - RECEIPTS
  var refreshReceipts = function(student){
    $scope.filterStudent = student;
  };

  $scope.refreshStudents = refreshStudents;
  $scope.refreshReceipts = refreshReceipts;
  $scope.reloadStudents = reloadStudents;

  //  INITIALISE
  reloadStudents();

});


app.factory('instituteFactory', function($http){

  var factory = {};
  var domain = "http://127.0.0.1:12346/institute/";

  //$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


  factory.getStudents = function(search){
    return $http.post(domain+"student/",search);
  }

  return factory;
});