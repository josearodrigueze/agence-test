'use strict';
/**
 * Created by jose on 11/09/15.
 */
app.factory('servicesModel', ['$resource', 'appConfig', function ($resource, appConfig) {
    var _url = appConfig.getPathApi() + 'importaciones/peticiones/:id';
    return $resource(
        _url,
        {id: '@_id'},
        {
            vendedores: {
                method: 'GET',
                url: appConfig.getPathApi() + 'vendedores',
                isArray: true
            },
            relatorio: {
                method: 'POST',
                url: appConfig.getPathApi() + 'relatorio',
                isArray: true
            },
            grafico: {
                method: 'POST',
                url: appConfig.getPathApi() + 'grafico',
                isArray: true
            },
            pizza: {
                method: 'POST',
                url: appConfig.getPathApi() + 'pizza',
                isArray: true
            }
        }
    );
}]);