var ref = 0;
angular.module('starter.controllers', ['myservices'])

.controller('LoginCtrl', function($scope, $ionicModal, $timeout, $interval, $location, MyServices, $ionicLoading) {

    //  LOGIN WITH TWITER
    MyServices.logout();
    $.jStorage.flush();
    user = undefined;
    $ionicLoading.hide();
    var authenticatesuccess = function(data, status) {
        console.log(data);
        if (data != "false") {
            $.jStorage.set("user", data);
            user = data;
            $location.url("/app/home");
        } else {
            console.log("stay here");
        };
    };


    var checktwitter = function(data, status) {
        if (data != "false") {
            console.log("Facebook Login");
            $interval.cancel(stopinterval);
            ref.close();
            MyServices.authenticate().success(authenticatesuccess);
        } else {
            console.log("Do nothing");
        }
    };

    var callAtIntervaltwitter = function() {
        MyServices.authenticate().success(checktwitter);
    };


    $scope.twitterlogin = function() {
        //        console.log(window.location);
        //        var abc = window.location.origin + window.location.pathname;
        ref = window.open('http://www.wohlig.co.in/LightSaberBackend/index.php/hauth/login/Twitter?returnurl=http://www.wohlig.com', '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
        ref.addEventListener('exit', function(event) {
            MyServices.authenticate().success(authenticatesuccess);
            $interval.cancel(stopinterval);
        });
    };
    $scope.facebooklogin = function() {
        //        console.log(window.location);
        //        var abc = window.location.origin + window.location.pathname;
        ref = window.open('http://www.wohlig.co.in/LightSaberBackend/index.php/hauth/login/Facebook?returnurl=http://www.wohlig.com', '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
        ref.addEventListener('exit', function(event) {
            MyServices.authenticate().success(authenticatesuccess);
            $interval.cancel(stopinterval);
        });
    };

})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    /*//Share
    var applink = 'https://play.google.com/store/apps/details?id=com.predicto';

    $scope.share = function () {
        window.plugins.socialsharing.share("Check out 'Predicto' - " + applink);
    };*/

})

.controller('OfflineCtrl', function($scope, $ionicModal, $timeout, $location, $ionicLoading) {

    function ononline() {
        $location.url("/app/home");
    };
    document.addEventListener("online", ononline, false);
    $scope.tryagain = function() {

        ononline();
    };
    $ionicLoading.hide();

})

.controller('GraphCtrl', function($scope, $ionicModal, $timeout, $location, $ionicLoading) {
    createchart();
})


.controller('HomeCtrl', function($scope, $ionicModal, $timeout, MyServices, $location, $ionicLoading, $anchorScroll, $ionicScrollDelegate) {

    $ionicLoading.show({
        template: 'please wait...'
    });





    //  AUTHENTICATE USER



    if (user) {
        console.log("Stay at home");
    } else {
        $location.url("/login");
    }



    //  GET LIST OF PREDICTIONS FOR IPL

    var getpredictionssuccess = function(data, status) {
        $scope.predictions = data;
        console.log(data);
        $ionicLoading.hide();
        var i = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].status == 1) {
                break;
            }
        }

        $ionicScrollDelegate.scrollTo(0, 134 * i, true);
    };
    var getpredictionserror = function() {
        $ionicLoading.hide();
        $location.url("/offline");
    };
    MyServices.getpredictions().success(getpredictionssuccess).error(getpredictionserror);

    var giveidvar = 0;
    $scope.giveid = function(status) {
        console.log(giveidvar);
        if (giveidvar == 0) {
            if (status == 1) {
                console.log("mila");
                return true;
            };
            giveidvar = 1;
        };
        return false;
    };


})
    .controller('HistoryCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, MyServices, $location) {

        //  IONIC LOADING



        $ionicLoading.show({
            template: 'Please wait...'
        });

        //  HIDE LOADING
        $ionicLoading.hide();

        //  AUTHENTICATE
        if (user) {
            console.log("Stay at home");
        } else {
            $location.url("/login");
        }

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


.controller('PredictCtrl', function($scope, $ionicModal, $timeout, $stateParams, MyServices, $ionicLoading, $location, $ionicPopup) {

    $scope.clickr1 = false;
    $scope.clickr2 = false;

    //  IONIC LOADING

    $ionicLoading.show({
        template: 'Please wait...'
    });


    //  AUTHENTICATE USER
    if (user) {
        console.log("Stay at home");
    } else {
        $location.url("/login");
    }


    var predictiondata = {};
    predictiondata.prediction = $stateParams.id;
    predictiondata.user = user.id;



    //HASH DESIGN
    var hashdesign = function(data, string, index) {
        for (var k = 0; k < data.length; k++) {
            var string = string.replace("#" + data[k], "<span class='positive'>#" + data[k] + "</span>");
        };
        if ($scope.predictdata.tweets) {
            $scope.predictdata.tweets.statuses[index].text = string;
        }
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
    var getpredictionforusererror = function() {
        $ionicLoading.hide();
        $location.url("/offline");
    }
    //GET ALL DETAILS INITIALLY
    MyServices.getpredictionforuser(predictiondata).success(getpredictionforusersuccess).error(getpredictionforusererror);


    //USER PREDICTS
    var userpredictssuccess = function(data, count) {
        if (count == $scope.countforpredict) {
            console.log(data);
            getpredictionforusersuccess(data);
        }
    };
    $scope.countforpredict = 0;
    $scope.userpredict = function(status, id, tick) {
        if (status == 1) {
            //CLOSE LAST CALL
            if (tick == 1) {
                $scope.clickr1 = true;
                $scope.clickr2 = false;
            } else if (tick == 2) {
                $scope.clickr1 = false;
                $scope.clickr2 = true;
            };

            var userpredictsdata = {};
            userpredictsdata.prediction = predictiondata.prediction;
            userpredictsdata.team = id;
            userpredictsdata.user = user.id;
            MyServices.userpredicts(userpredictsdata, ++$scope.countforpredict, userpredictssuccess);
            $scope.showPopup();
        };
    };

    $scope.showPopup = function() {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<p class="text-center"><i class="icon ln-thumbs-up bigr positive"></i><br>Your prediction has been recorded, points will be updated after the match is over !</p>',
            title: 'Thank You!',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);
    };

})

.controller('LeaderboardCtrl', function($scope, $ionicModal, $timeout, MyServices, $location, $ionicLoading) {
    $scope.clicked = true;
    $scope.tpl = {};
    $scope.tpl.link = 'templates/tab-everyone.html';

    $ionicLoading.show({
        template: 'Please wait...'
    });

    var getleaderboardsuccess = function(data, status) {
        $scope.global = data.global;
        console.log(data);
        $ionicLoading.hide();
    };
    var getleaderboarderror = function() {
        $ionicLoading.hide();
        $location.url("/offline");
    };
    MyServices.getleaderboard().success(getleaderboardsuccess).error(getleaderboarderror);
})

.controller('SidemenuCtrl', function($scope, $ionicModal, $timeout, MyServices, $location, $ionicLoading) {

    var getuserdetailssuccess = function(data, status) {
        $scope.userdetails = data;
    };


    function onOffline() {
        $location.url("/offline");
    };
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        document.addEventListener("offline", onOffline, false);
        MyServices.getuserdetails().success(getuserdetailssuccess);

    });


    //SIGN OUT

    $scope.logout = function() {
        $location.path("/login");
    };

    $scope.clickr = '';

    //Share
    var applink = 'http://predictoapp.appspot.com';

    $scope.share = function() {
        window.plugins.socialsharing.share("Hey, I have scored " + $scope.userdetails.points + " points with " + $scope.userdetails.prediction + " predictions. Check out 'Predicto' - " + applink);
    };
});

function createchart() {

    $.getJSON(adminurl + "getpredictionteamwise", function(data) {
        console.log(data);
        var allnames = [];
        var alltotals = [];
        var totalpredictions=0;
        $.each(data, function(index, value) {
            allnames.push(value.name);
            var predictionnumber=parseFloat(value.total);
            alltotals.push(predictionnumber);
            totalpredictions+=predictionnumber;
        });
        console.log(allnames);

        $(".totalpredictions").text(totalpredictions);
        console.log(totalpredictions);
        
        $(function() {
            $('#container').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Total Predictions / Team'
                },
                xAxis: {
                    categories: allnames
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Predictions'
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        color: "#1c7ccc",
                    }
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'IPL 2015',
                    data: alltotals

                }]
            });
        });
    });

};