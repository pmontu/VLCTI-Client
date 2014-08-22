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
  };
});

app.controller("receiptController",function($scope,instituteFactory){

  
});

app.controller('studentController',function($scope,instituteFactory){
  
  $scope.searchStudentForm = {};

  //  STAGE 0 - STUDENTS
  var reloadStudents = function(){

    $scope.searchStudentForm.name = "";
    $scope.searchStudentForm.id = 0;
    $scope.searchStudentForm.orderBy = "id";
    $scope.sortDirection = true;

    refreshStudents();
  };

  //  STAGE 1 - STUDENTS
  var refreshStudents = function(){

    //  RESET
    $scope.filterStudent = null;


    //  FETCH STUDENTS
    var requestData = {
      "name":$scope.searchStudentForm.name,
      "id":$scope.searchStudentForm.id,
      "orderby":$scope.searchStudentForm.orderBy,
      "items":4,
      "page":1,
      "direction":$scope.sortDirection
    }
    instituteFactory.getStudents(requestData).success(function(data){
      if(data.students.length>0){
        $scope.students = data.students;
        
        $scope.$broadcast('student',requestData);
      }

    });

  };

  var orderByStudents = function(column){
    //  COLUMN & SORT DIRECTION
    if($scope.searchStudentForm.orderBy == column){
      if($scope.sortDirection == true)
        $scope.sortDirection = false;
      else
        $scope.sortDirection = true;
    }
    else
      $scope.sortDirection = true;
    $scope.searchStudentForm.orderBy = column;
    $scope.refreshStudents();
  };


  //  STAGE 2 - RECEIPTS
  var refreshContracts = function(student){
    $scope.filterStudent = student;

  };



  $scope.refreshStudents = refreshStudents;
  $scope.refreshContracts = refreshContracts;
  $scope.reloadStudents = reloadStudents;
  $scope.orderByStudents = orderByStudents;

  //  INITIALISE
  reloadStudents();
});


app.controller('paginationController', function ($scope) {
  $scope.totalItems = 9;
  $scope.currentPage = 1;
  $scope.itemsPerPage = 3;
  $scope.maxSize = 5;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.$on('student',function(event,data){
    console.log("on student");
  });

});


app.factory('instituteFactory', function($http){

  var factory = {};
  var domain = "http://127.0.0.1:12346/institute/";

  //$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


  factory.getStudents = function(search){
    return $http.post(domain+"student/list.json",search);
  };

  return factory;
});