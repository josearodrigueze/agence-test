'use strict';
/**
 * Created by jose on 11/09/15.
 */
app.controller('GraficoController', ['$injector', '$scope', 'rVentas', function ($injector, $scope, rVentas) {
    // Este proceso enredado es para generar el grafico. pufff
    $scope.grafico = {
        series: [],
        labels: [],
        data: []
    };


    var data = null, rows = {}, graf = $scope.grafico, series = $scope.model.vendedores, i,len;
    var dataService = dataToView(rVentas);

    for (i = 0, len = dataService.length; i < len; i++) {
        data = dataService[i].data;

        graf.labels.push(dataService[i].date);
        for (var s = 0, lenS = series.length; s < lenS; s++) {
            if(angular.isUndefined(rows[series[s].co_usuario])){
                rows[series[s].co_usuario] = [];
            }

            for (var d = 0, lenD = data.length; d < lenD; d++) {
                if(series[s].co_usuario == data[d].co_usuario){
                    rows[series[s].co_usuario].push(data[d].liquida);
                }
            }
        }
    }

    for (i = 0, len = series.length; i < len; i++) {
        var serie = series[i];
        graf.data.push(rows[serie.co_usuario]);
        graf.series.push(serie.no_usuario);
    }

    function dataToView(data) {
        var rows = [],
            pivote = '';

        var row = {vendedor: {}, data: []};
        for (var i = 0, len = data.length; i < len; i++) {
            if (pivote != data[i].fecha) {
                // Primer Valor no lo ingresamos
                if (i != 0) {
                    rows.push(row);
                }
                pivote = data[i].fecha;
                row = {date: data[i].fecha, data: []};
            }
            row.data.push(data[i]);
        }
        rows.push(row);
        return rows;
    }
}]);