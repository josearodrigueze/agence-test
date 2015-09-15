'use strict';
app.factory("appConfig", [function () {
    /**
     * Parámetro para colocar la url con segura, por defecto es no segura
     * @type {boolean}
     */
    var secure = false;

    /**
     * Dominio al cual se realizaran las peticiones a las apis
     * @type {string}
     */
    var domain = 'localhost:3000';
    //var domain = 'josearodrigueze.com.ve/agence';

    /**
     * Url donde se encuentran los servicios que va a consumir la aplicación
     * @type {string}
     */

    var pathApi = domain + '/backend';

    return {
        /**
         * Función para configurar la rutas del sitio y las api.
         * @returns {string}
         */
        getPathApi: function () {
            var http = 'http://';
            if (secure) {
                http = 'https://';
            }
            if (pathApi.substring(pathApi.length - 1, pathApi.length) != '/') {
                pathApi += '/';
            }
            return http + pathApi;
        }

    };
}]);
