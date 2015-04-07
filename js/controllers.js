angular.module('starter.controllers', ['myservices'])

.controller('LoginCtrl', function($scope, $ionicModal, $timeout) {})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

.controller('HomeCtrl', function($scope, $ionicModal, $timeout, MyServices) {

    $scope.predictions = [{
        "team1": 60,
        "venue": "Wankhade",
        "date": "Wed, April 8",
        "time": "20:00(IST)",
        "logoteam1": "mumbai.png",
        "logoteam2": "kkr.png"
    }, {
        "team1": 70,
        "venue": "Banglore",
        "date": "Wed, April 9",
        "time": "20:00(IST)",
        "logoteam1": "royal.png",
        "logoteam2": "sunrise.png"
    }, {
        "team1": 80,
        "venue": "Delhi",
        "date": "Wed, April 10",
        "time": "20:00(IST)",
        "logoteam1": "delhi.png",
        "logoteam2": "king.png"
    }, {
        "team1": 40,
        "venue": "Pune",
        "date": "Wed, April 11",
        "time": "20:00(IST)",
        "logoteam1": "punjab.png",
        "logoteam2": "rc.png"
    }];
    
    MyServices.test();


})


.controller('PredictCtrl', function($scope, $ionicModal, $timeout) {

});