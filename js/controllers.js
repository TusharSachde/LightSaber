angular.module('starter.controllers', ['myservices'])

.controller('LoginCtrl', function ($scope, $ionicModal, $timeout) {})

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})

.controller('HomeCtrl', function ($scope, $ionicModal, $timeout, MyServices, $location) {


        var getuserdetailssuccess = function (data, status) {
            $.jStorage.set("user", data);
        };
        var authenticatesuccess = function (data, status) {
            if (data != false) {
                MyServices.getuserdetails().success(getuserdetailssuccess);
            } else {
                $location.path("/login");
            };
        };
        MyServices.authenticate().success(authenticatesuccess);

        //GET LIST OF PREDICTIONS FOR IPL
        var getpredictionssuccess = function (data, status) {
            $scope.predictions = data;
            console.log(data);
        };
        MyServices.getpredictions().success(getpredictionssuccess);


    })
    .controller('HistoryCtrl', function ($scope, $ionicModal, $timeout) {

        $scope.predictions = [{
            "team1": 60,
            "venue": "Wankhade",
            "date": "Wed, April 8",
            "time": "20:00(IST)",
            "logoteam1": "mumbai.png",
            "logoteam2": "kkr.png",
            "status": "Won"
        }, {
            "team1": 70,
            "venue": "Banglore",
            "date": "Wed, April 9",
            "time": "20:00(IST)",
            "logoteam1": "royal.png",
            "logoteam2": "sunrise.png",
            "status": "Won"
        }, {
            "team1": 80,
            "venue": "Delhi",
            "date": "Wed, April 10",
            "time": "20:00(IST)",
            "logoteam1": "delhi.png",
            "logoteam2": "king.png",
            "status": "Lost"
        }, {
            "team1": 40,
            "venue": "Pune",
            "date": "Wed, April 11",
            "time": "20:00(IST)",
            "logoteam1": "punjab.png",
            "logoteam2": "rc.png",
            "status": "Won"
        }];

        //        $scope.badgecolor = function() {
        //            if ($scope.predictions.status == "Won")
        //                return "badge-balanced"
        //            else if ($scope.predictions.status == "Lost")
        //                return "badge-assertive";
        //
        //        };

    })


.controller('PredictCtrl', function ($scope, $ionicModal, $timeout, $stateParams, MyServices) {

        $scope.clickr = true;

        var data = {};
        data.prediction = $stateParams.id;
        console.log(data);

        var getpredictionforusersuccess = function (data, status) {
            console.log(data);
            $scope.predictdata = data;
        };
        MyServices.getpredictionforuser(data).success(getpredictionforusersuccess);


        //USER PREDICTS
        var userpredictssuccess = function (data, status) {
            console.log(data);
        };
        $scope.userpredict = function (id, tick) {
            $scope.clickr = tick;
            var userpredictsdata = {};
            userpredictsdata.prediction = data.prediction;
            userpredictsdata.team = id;
            MyServices.userpredicts(userpredictsdata).success(userpredictssuccess);
        };

    })
    .controller('SidemenuCtrl', function ($scope, $ionicModal, $timeout, MyServices, $location) {

        $scope.userdetails = $.jStorage.get("user");
        $scope.$apply();
        //SIGN OUT
        var logoutsuccess = function (data, status) {
            if (data == "true") {
                $location.path("/login");
            };
        };
        $scope.logout = function () {
            MyServices.logout().success(logoutsuccess);
        };

        $scope.prediction = {
            "team1": 60,
            "venue": "Wankhade",
            "date": "Wed, April 8",
            "time": "20:00(IST)",
            "logoteam1": "mumbai.png",
            "logoteam2": "kkr.png"
        };

        $scope.clickr = '';
    });