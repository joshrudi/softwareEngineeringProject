/* register the modules the application depends upon here*/
angular.module('regions', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('tweetsApp', ['regions']);
console.log("app.js running");