var adminurl = "http://localhost/Lightsaberbackend/index.php/json";
var myservices = angular.module('myservices', []);

myservices.factory('MyServices', function ($http) {
  
    var returnval={};
    
    returnval.abc=function() {
        console.log("ABC");
    };
    
    return returnval;
});