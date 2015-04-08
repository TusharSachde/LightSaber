var ref = 0;
angular.module('starter.controllers', ['myservices'])

.controller('LoginCtrl', function($scope, $ionicModal, $timeout, $interval, $location, MyServices) {

    //  LOGIN WITH TWITER

    var getuserdetailssuccess = function(data, status) {
        $.jStorage.set("user", data);
        $location.url("/app/login");
    };

    var authenticatesuccess = function(data, status) {
        if (data != "false") {
            $location.url("/app/home");
        } else {
            console.log("stay here");
        };
    };

    MyServices.authenticate().success(authenticatesuccess);

    var checktwitter = function(data, status) {
        if (data != "false") {
            ref.close();
            $interval.cancel(stopinterval);
            $location.url("app/home");
        } else {
            console.log("Do nothing");
        }
    }

    var callAtIntervaltwitter = function() {
        MyServices.authenticate().success(checktwitter);
    };


    $scope.twitterlogin = function() {
        console.log(window.location);
        var abc = window.location.origin + window.location.pathname;
        ref = window.open('http://www.wohlig.co.in/LightSaberBackend/index.php/hauth/login/Twitter?returnurl=http://www.wohlig.com', '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
        ref.addEventListener('exit', function(event) {
            MyServices.authenticate().success(authenticatesuccess);
            $interval.cancel(stopinterval);
        });
    };

})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    //Share
    //    if (window.cordova.platformId == 'android') {
    //        var applink = 'https://play.google.com/store/apps/details?id=com.wohlig.predicto';
    //    }
    //    if (window.cordova.platformId == 'ios') {
    //        var applink = 'https://itunes.apple.com/in/app/whatsapp-messenger/id310633997';
    //    }

    var applink = 'https://play.google.com/store/apps/details?id=com.wohlig.predicto';

    $scope.share = function() {
        window.plugins.socialsharing.share("Checkout 'Predicto' - " + applink);
    };

})

.controller('HomeCtrl', function($scope, $ionicModal, $timeout, MyServices, $location, $ionicLoading) {

    //  IONIC LOADING

    $ionicLoading.show({
        template: 'Please wait...'
    });

    //  AUTHENTICATE USER


    var authenticatesuccess = function(data, status) {
        console.log(data);
        if (data != "false") {
            console.log("Stay at home");
        } else {
            $location.url("/login");
        };
    };
    MyServices.authenticate().success(authenticatesuccess);

    //  GET LIST OF PREDICTIONS FOR IPL

    var getpredictionssuccess = function(data, status) {
        $scope.predictions = data;
        console.log(data);
        $ionicLoading.hide();

    };
    MyServices.getpredictions().success(getpredictionssuccess);


})
    .controller('HistoryCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, MyServices, $location) {

        //  IONIC LOADING

        $ionicLoading.show({
            template: 'Please wait...'
        });

        //  HIDE LOADING
        $ionicLoading.hide();

        //  AUTHENTICATE
        var authenticatesuccess = function(data, status) {
            if (data != "false") {

            } else {
                $location.url("/login");
            };
        };
        MyServices.authenticate().success(authenticatesuccess);

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


.controller('PredictCtrl', function($scope, $ionicModal, $timeout, $stateParams, MyServices, $ionicLoading, $location) {

    $scope.clickr1 = false;
    $scope.clickr2 = false;

    //  IONIC LOADING

    $ionicLoading.show({
        template: 'Please wait...'
    });

    //  AUTHENTICATE USER

    var getuserdetailssuccess = function(data, status) {
        $.jStorage.set("user", data);
    };
    var authenticatesuccess = function(data, status) {
        if (data != "false") {

        } else {
            $ionicLoading.hide();
            $location.url("/login");
        };
    };
    MyServices.authenticate().success(authenticatesuccess);
    var predictiondata = {};
    predictiondata.prediction = $stateParams.id;



    //HASH DESIGN
    var hashdesign = function(data, string, index) {
        for (var k = 0; k < data.length; k++) {
            var string = string.replace("#" + data[k], "<span class='positive'>#" + data[k] + "</span>");
        };
        $scope.predictdata.tweets.statuses[index].text = string;
    };

    var tweeter = function() {
        console.log($scope.tweets);
        if ($scope.tweets) {
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
        }
    };

    var getpredictionforusersuccess = function(data, status) {
        console.log(data);
        $scope.predictdata = data;
        if ($scope.predictdata.predicted == $scope.predictdata.team1id) {
            $scope.clickr1 = true;
        } 
        if ($scope.predictdata.predicted == $scope.predictdata.team2id) {
            $scope.clickr2 = true;
        }
        if ($scope.predictdata.tweets) {
            $scope.tweets = $scope.predictdata.tweets.statuses;
        }
        tweeter();
        $ionicLoading.hide();

    };
    //GET ALL DETAILS INITIALLY
    MyServices.getpredictionforuser(predictiondata).success(getpredictionforusersuccess);


    $scope.testdesign = "uihauhdhas #hjh";


    //USER PREDICTS
    var userpredictssuccess = function(data, count) {
        if (count == $scope.countforpredict) {
            console.log(data);
            getpredictionforusersuccess(data);
        }
    };
    $scope.countforpredict = 0;
    $scope.userpredict = function(id, tick) {
        //CLOSE LAST CALL
        if(tick==1)
        {
            $scope.clickr1=true;
            $scope.clickr2=false;
        } else if(tick==2)
        {
            $scope.clickr1=false;
            $scope.clickr2=true;
        };
        
        
        var userpredictsdata = {};
        userpredictsdata.prediction = predictiondata.prediction;
        userpredictsdata.team = id;
        MyServices.userpredicts(userpredictsdata, ++$scope.countforpredict, userpredictssuccess);
    };

})
    .controller('SidemenuCtrl', function($scope, $ionicModal, $timeout, MyServices, $location) {

        var getuserdetailssuccess = function(data, status) {
            $scope.userdetails = data;
        };
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            console.log("State Change is called");
            MyServices.getuserdetails().success(getuserdetailssuccess);
        });


        //SIGN OUT
        var logoutsuccess = function(data, status) {
            if (data == "true") {
                $location.path("/login");
            };
        };
        $scope.logout = function() {
            MyServices.logout().success(logoutsuccess);
        };

        $scope.clickr = '';
    });