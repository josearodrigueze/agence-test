/**
 * Created by jrodriguez on 10/09/15.
 */
'use strict';
app.constant('REPORTE', [
    {
        state: 'admin',
        config: {
            url: "/admin",
            templateUrl: "modules/views/filtros.html",
            controller: 'filtrosController',
            resolve: {
                rSalesMen: ['servicesModel', function (servicesModel) {
                    return servicesModel.vendedores().$promise;
                }]
            }
        }
    },
    {
        state: 'admin.relatorio',
        config: {
            url: "/relatorio/:filtros",
            templateUrl: "modules/views/relatorio.html",
            controller: 'RelatorioController',
            resolve: {
                rVentas: ['$stateParams', 'servicesModel', function ($stateParams, servicesModel) {
                    var filtros = angular.fromJson($stateParams.filtros);
                    return servicesModel.relatorio(filtros).$promise;
                }]
            }
        }
    },
    {
        state: 'admin.grafico',
        config: {
            url: "/grafico/:filtros",
            templateUrl: "modules/views/graficos.html?v=1.1",
            controller: 'GraficoController',
            resolve: {
                rVentas: ['$stateParams', 'servicesModel', function ($stateParams, servicesModel) {
                    var filtros = angular.fromJson($stateParams.filtros);
                    return servicesModel.grafico(filtros).$promise;
                }]
            }
        }
    },
    {
        state: 'admin.pizza',
        config: {
            url: "/pizza/:filtros",
            templateUrl: "modules/views/pizza.html?v=1.1",
            controller: 'PizzaController',
            resolve: {
                rVentas: ['$stateParams', 'servicesModel', function ($stateParams, servicesModel) {
                    var filtros = angular.fromJson($stateParams.filtros);
                    return servicesModel.pizza(filtros).$promise;
                }]
            }
        }
    }
]);