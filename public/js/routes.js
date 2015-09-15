'use strict';
app.config(['$injector', function ($injector) {
    var $stateProvider = $injector.get('$stateProvider', 'app.config');
    var $urlRouterProvider = $injector.get('$urlRouterProvider', 'app.config');
    var REPORTE = $injector.get('REPORTE', 'app.config');

    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/admin");

    var routes = REPORTE;
    for (var i = 0, len = routes.length; i < len; i++) {
        $stateProvider.state(routes[i].state, routes[i].config);
    }

}]).run(["$rootScope", function ($rootScope) {
    //$rootScope.$on('$stateChangeStart', function (event, toState) { });
    $rootScope.$on("$stateChangeError", console.log.bind(console));
}]);