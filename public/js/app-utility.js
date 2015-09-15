'use strict';
/**
 * Directiva para el manejo de los mensajes en el sistema
 *
 * @author Jose Rodriguez <josearodrigueze@gmail.com>
 * @version V-1.2.0
 */
app.directive("templateMessages", ['$rootScope', '$compile', function ($rootScope, $compile) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: "modules/views/messages.html",
        link: function (scope, el, attrs, ngModel) {
            $rootScope.$watch('type', function (data) {

                if (data) {
                    var element;
                    $(el).find('.content-messages-alert').remove();
                    if (data == 'info')
                        element = angular.element('<div class="content-messages-alert" ><span class="glyphicon glyphicon-info-sign"></span>&nbsp;&nbsp;' + $rootScope.flash_info + '</div>');
                    if (data == 'error')
                        element = angular.element('<div class="content-messages-alert" ><span class="glyphicon glyphicon-warning-sign"></span>&nbsp;&nbsp;' + $rootScope.flash_error + '</div>');
                    if (data == 'success')
                        element = angular.element('<div class="content-messages-alert" ><span class="glyphicon glyphicon-ok-sign"></span>&nbsp;&nbsp;' + $rootScope.flash_success + '</div>');

                    // compilamos el elemnto parseado dentro del $scope
                    var html = $compile(element)(scope);
                    // agregamos el html
                    angular.element('#content-alert').css('z-index', '1000');
                    angular.element('#template-' + data).append(html);
                }
            });
        }
    };
}]);

/**
 * Método para la control y gestión de los mensaje en el sistema.
 *
 * @packages Soluciones A.S.T
 * @author Jose Rodriguez <josearodrigueze@gmail.com>
 * @version V-1.2.1
 *
 */
app.factory("flashMessages", ["$rootScope", "$timeout", function ($rootScope, $timeout) {

    var tiempoMostrar = 3500;
    var timeApplyZindex = 50;

    var close_alert = function () {
        $rootScope.flash_success = "";
        $rootScope.flash_error = "";
        $rootScope.flash_info = "";
        $rootScope.type = '';
        angular.element('#content-alert').css('z-index', '-2')
    };
    var set_zindex = function () {
        angular.element('#content-alert').css('z-index', '100000')
    };

    $rootScope.closeAlert = function () {
        $rootScope.flash_success = "";
        $rootScope.flash_error = "";
        $rootScope.flash_info = "";
        $rootScope.type = '';
    };

    return {
        show_success: function (message) {
            $rootScope.flash_success = message;
            $rootScope.type = 'success';
            $timeout(function () {
                close_alert();
            }, tiempoMostrar);
            $timeout(function () {
                set_zindex();
            }, timeApplyZindex);
        },
        show_error: function (message) {
            $rootScope.flash_error = message;
            $rootScope.type = 'error';
            $timeout(function () {
                close_alert();
            }, tiempoMostrar);
            $timeout(function () {
                set_zindex();
            }, timeApplyZindex);
        },
        show_info: function (message) {
            $rootScope.flash_info = message;
            $rootScope.type = 'info';
            $timeout(function () {
                close_alert();
            }, tiempoMostrar);
            $timeout(function () {
                set_zindex();
            }, timeApplyZindex);
        },
        clear: function () {
            close_alert();
        }
    };
}]);