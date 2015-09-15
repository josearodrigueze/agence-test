'use strict';
/**
 * Created by jose on 11/09/15.
 */
app.controller('RelatorioController', ['$injector', '$scope', 'rVentas', function ($injector, $scope, rVentas) {
    $scope.relatorios = dataToView(rVentas);

    /**
     * Caucla el Total del Liquido listado
     */
    $scope.getTotalLiquido = function (rows) {
        var acumulador = 0;
        for (var i = rows.length - 1; 0 <= i; i--) {
            acumulador += parseFloat(rows[i].liquida);
        }
        return acumulador;
    };

    /**
     * Calcula el toal del costo listado
     */
    $scope.getTotalCosto = function (rows) {
        var acumulador = 0;
        for (var i = rows.length - 1; 0 <= i; i--) {
            acumulador += parseFloat(rows[i].costo);
        }
        return acumulador;
    };

    /**
     * Calcula el total de al comsiion
     */
    $scope.getTotalComision = function (rows) {
        var acumulador = 0;
        for (var i = rows.length - 1; 0 <= i; i--) {
            acumulador += parseFloat(rows[i].comision);
        }
        return acumulador;
    };

    /**
     * Caclcula el total del lucro.
     */
    $scope.getTotalLucro = function (rows) {
        var acumulador = 0;
        for (var i = rows.length - 1; 0 <= i; i--) {
            acumulador += parseFloat(rows[i].liquida) - parseFloat(rows[i].comision) - parseFloat(rows[i].costo);
        }
        return acumulador;
    };

    function dataToView(data) {
        var rows = [],
            pivote = '';

        var row = {vendedor: {}, data: []};
        for (var i = 0, len = data.length; i < len; i++) {
            if (pivote != data[i].no_usuario) {
                // Primer Valor no lo ingresamos
                if (i != 0) {
                    rows.push(row);
                }
                pivote = data[i].no_usuario;
                row = {vendedor: {no_usuario: data[i].no_usuario}, data: []};
            }
            row.data.push(data[i]);
        }
        rows.push(row);
        return rows;
    }
}]);

/**
 * Filtro para calculo de Lucro por periodo
 */
app.directive('calcular-lucro', [function () {
    return {
        restrict: 'E',//<dir-template></dir-template> hace referencia a un elemento/etiqueta html
        template: '<span class="{{class}}">{{signo}}R$ {{result}}</span>',
        link: function (scope, element, attrs) {
            scope.result = attrs.params.liquida - attrs.params.costo - attrs.params.comision;
            scope.class = 'positivo';
            scope.signo = '';

            if (scope.result < 0) {
                scope.class = 'negativo';
                scope.signo = '-';
            }
        }
    };
}]);