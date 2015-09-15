'use strict';
/**
 * Created by jose on 11/09/15.
 */
app.controller('PizzaController', ['$scope', 'rVentas', function ($scope, rVentas) {
    $scope.grafico = {
        labels: [],
        data: []
    };

    for (var i = 0, len = rVentas.length; i < len; i++) {
        $scope.grafico.labels.push(rVentas[i].no_usuario);
        $scope.grafico.data.push(rVentas[i].liquida);
    }
}]);
