var app = angular.module("vlcimApp",['ui.bootstrap','ngRoute','ngCookies']);

//app.controller = DatepickerDemoCtrl;

app.config(function($routeProvider,$httpProvider){
  $routeProvider.when('/',
  {
    controller: "searchController",
    templateUrl: "views/searchandreports.html"
  })
  .when('/searchandreports',
  {
    controller: "searchController",
    templateUrl: "views/searchandreports.html"
  })
  .when('/addnewstudent',
  {
    templateUrl: "views/addnewstudent.html"
  })
  .when('/addnewfaculty',
  {
    templateUrl: "views/addnewfaculty.html"
  })
  .when('/searchfaculty',
  {
    controller:'searchFacultyController',
    templateUrl:'views/searchfaculty.html'
  });
  $httpProvider.defaults.transformRequest = function(data){
    if (data === undefined) {
      return data;
    }
    return $.param(data);
  }
});

var DatepickerDemoCtrl = function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
};

app.controller("searchController", function($scope){
  $scope.search = {
    faculty:{
      area:""
    },
    student:{}
  };
  $scope.result = [
    {type:"Student",roll:2014177,name:"manoj",area:"vadapalani",overdue:1000},
    {type:"Student",roll:2014178,name:"ajay",area:"vadapalani",overdue:10000},
    {type:"Student",roll:2014179,name:"radhika",area:"kodambakkam",overdue:5000},
    {type:"Student",roll:2014180,name:"abhi",area:"kodambakkam",overdue:0},
    {type:"Faculty",roll:1,name:"akshay",area:"vadapalani",overdue:1000},
    {type:"Faculty",roll:2,name:"arjun",area:"kodambakkam",overdue:20000},
    {type:"Faculty",roll:3,name:"ram",area:"vadapalani",overdue:0},
    {type:"Faculty",roll:4,name:"sita",area:"kodambakkam",overdue:0},
  ];

});

app.controller("searchFacultyController",function($scope, instituteFactory){
  $scope.circle="VAD";
  instituteFactory.getFaculty("Area=VAD").success(function(data){
    $scope.result = data;
  });
});

app.factory('instituteFactory', function($http, $cookies){
  var factory = {};
  factory.getFaculty = function (search){
    return $http.post('http://127.0.0.1:12346/institute/');
    console.log(search)
  };
  return factory;
});