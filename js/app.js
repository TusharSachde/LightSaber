var googleanalyticsid = 'UA-62296776-1';

function addanalytics(screen) {
    if (window.analytics) {
        window.analytics.startTrackerWithId(googleanalyticsid);
        if (screen) {
            window.analytics.trackView(screen);
        }
        if (user) {
            window.analytics.setUserId(user.id);
            window.analytics.trackEvent("Page Load", screen, screen, 1);
        }

    }
}

function addevent(category, action, label, value) {
    if (!value) {
        value = 1;
    }
    if (!label) {
        label = action;
    }
    if (window.analytics) {
        window.analytics.startTrackerWithId(googleanalyticsid);
        window.analytics.trackEvent(category, action, label, value);
    }

}
var predictoapp = angular.module('starter', ['ionic', 'starter.controllers', 'myservices']);

predictoapp.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Dont hide accesories
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.overlaysWebView(true);
            StatusBar.styleLightContent();
        }
        app.initialize();
    });
});

predictoapp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $ionicConfigProvider.views.maxCache(0);
    $httpProvider.defaults.withCredentials = true;
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $stateProvider

    .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
    })

    .state('offline', {
        url: "/offline",
        templateUrl: "templates/offline.html",
        controller: 'OfflineCtrl'
    })

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    .state('app.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "templates/home.html",
                controller: 'HomeCtrl'
            }
        }
    })

    .state('app.predict', {
        url: "/predict/:id",
        views: {
            'menuContent': {
                templateUrl: "templates/predict.html",
                controller: 'PredictCtrl'
            }
        }
    })

    .state('app.history', {
        url: "/history",
        views: {
            'menuContent': {
                templateUrl: "templates/history.html",
                controller: 'HistoryCtrl'
            }
        }
    })

    .state('app.leaderboard', {
        url: "/leaderboard",
        views: {
            'menuContent': {
                templateUrl: "templates/leaderboard.html",
                controller: 'LeaderboardCtrl'
            }
        }
    })

    .state('app.get', {
        url: "/get",
        views: {
            'menuContent': {
                templateUrl: "templates/get.html",
                controller: 'HistoryCtrl'
            }
        }
    })
        .state('app.graph', {
            url: "/graph",
            views: {
                'menuContent': {
                    templateUrl: "templates/graph.html",
                    controller: 'GraphCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');


});

predictoapp.filter('imagefromname', function() {
    return function(id) {
        switch (id) {
            case "1":
                return "king.png";
                break;
            case "2":
                return "kkr.png";
                break;
            case "3":
                return "rc.png";
                break;
            case "4":
                return "mumbai.png";
                break;
            case "5":
                return "punjab.png";
                break;
            case "6":
                return "delhi.png";
                break;
            case "7":
                return "royal.png";
                break;
            case "8":
                return "sunrise.png";
                break;
            default:
                return "nologo.png";
        };
    };
});

predictoapp.filter('shortform', function() {
    return function(id) {
        switch (id) {
            case "1":
                return "CSK";
                break;
            case "2":
                return "KKR";
                break;
            case "3":
                return "RCB";
                break;
            case "4":
                return "MI";
                break;
            case "5":
                return "KXIP";
                break;
            case "6":
                return "DD";
                break;
            case "7":
                return "RR";
                break;
            case "8":
                return "SH";
                break;
            default:
                return "NA";
        };
    };
});

predictoapp.filter('normal2original', function() {
    return function(url) {
        if (url) {
            url = url.replace("_normal.", ".");
        }
        return url;
    };
});
predictoapp.filter('normal2bigger', function() {
    return function(url) {
        if (url) {
            url = url.replace("_normal.", "_bigger.");
        }
        return url;
    };
});


function getshortform(id) {
    switch (id) {
        case "1":
            return "CSK";
            break;
        case "2":
            return "KKR";
            break;
        case "3":
            return "RCB";
            break;
        case "4":
            return "MI";
            break;
        case "5":
            return "KXIP";
            break;
        case "6":
            return "DD";
            break;
        case "7":
            return "RR";
            break;
        case "8":
            return "SH";
            break;
        default:
            return "NA";
    };
}