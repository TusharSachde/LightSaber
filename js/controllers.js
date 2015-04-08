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

        var predictiondata = {};
        predictiondata.prediction = $stateParams.id;
    
    $scope.replace = "";

        var hashdesign = function(data, string, index)
        {
            for(var k=0; k<data.length; k++)
            {
                  var string = string.replace("#"+data[k], "<span class='positive'>#"+data[k]+"</span>");
            };
            $scope.predictdata.tweets.statuses[index].text = string;
        };
        
        var tweeter = function () {
            console.log($scope.tweets);
            for (var i = 0; i < $scope.tweets.length; i++) {
                //GET STRING
                var string = $scope.tweets[i].text;
                
                var hastagarray = $scope.tweets[i].entities.hashtags;
                //CLEAN INDICES ARAY
                var textarray = [];
                //ITERATE HASTAG
                for (var j = 0; j < hastagarray.length; j++) {
                    //var indices = hastagarray[j].indices;
                    //indicesaray.push(indices);
                    var text = hastagarray[j].text;
                    textarray.push(text);
                };
                hashdesign(textarray, string, i);
            };
        };

        var getpredictionforusersuccess = function (data, status) {
            console.log(data);
            $scope.predictdata = data;
            if ($scope.predictdata.predicted == $scope.predictdata.team1id) {
                $scope.clickr = true;
            } else {
                $scope.clickr = false;
            };
            $scope.tweets = $scope.predictdata.tweets.statuses;
            tweeter();
        };
        //GET ALL DETAILS INITIALLY
        MyServices.getpredictionforuser(predictiondata).success(getpredictionforusersuccess);


        $scope.testdesign = "uihauhdhas #hjh";


        //USER PREDICTS
        var userpredictssuccess = function (data, count) {
            if (count == $scope.countforpredict) {
                console.log(data);
                getpredictionforusersuccess(data);
            }
        };
        $scope.countforpredict = 0;
        $scope.userpredict = function (id, tick) {
            //CLOSE LAST CALL


            $scope.clickr = tick;
            var userpredictsdata = {};
            userpredictsdata.prediction = predictiondata.prediction;
            userpredictsdata.team = id;
            MyServices.userpredicts(userpredictsdata, ++$scope.countforpredict, userpredictssuccess);
        };

    })
    .controller('SidemenuCtrl', function ($scope, $ionicModal, $timeout, MyServices, $location) {

        $scope.userdetails = $.jStorage.get("user");

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