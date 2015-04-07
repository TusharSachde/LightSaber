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
    returnval.getpredictions = function() {
        return $http.post(adminurl + "getpredictions");
    };
    returnval.getpredictionforuser = function(data) {
        return $http.post(adminurl + "getpredictionforuser",data );
    };
    returnval.userpredicts = function(data){
        console.log(data);
        return $http.post(adminurl + "userpredicts",data );
    };
    
    return returnval;
});