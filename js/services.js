var adminurl = "http://www.wohlig.co.in/Lightsaberbackend/index.php/json/";
var myservices = angular.module('myservices', []);

myservices.factory('MyServices', function ($http) {
  
    var returnval={};
    
    returnval.authenticate=function() {
        return $http.post(adminurl + "authenticate");
    };
    returnval.getuserdetails = function() {
        return $http.post(adminurl + "getuserdetails");
    };
    returnval.logout = function()
    {
        return $http.post(adminurl + "logout");
    };
    
    return returnval;
});