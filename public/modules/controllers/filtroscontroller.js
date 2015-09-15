/**
 * Created by jrodriguez on 10/09/15.
 */
'use strict';
app.controller('filtrosController', ['$injector', '$scope', 'rSalesMen', function ($injector, $scope, rSalesMen) {

    $scope.model = {desde: null, hasta: null, vendedores: []};

    var filtros = $injector.get('$stateParams', 'filtrosController').filtros;
    if (!angular.isUndefined(filtros)) {
        filtros = angular.fromJson(filtros);
        $scope.model.vendedores = filtros.vendedores;
        $scope.model.desde = filtros.desde;
        $scope.model.hasta = filtros.hasta;
    }

    $scope.dualbox = {
        salesmen: rSalesMen,
        settings: {
            bootstrap2: false,
            filterClear: 'Ver Todos!',
            filterPlaceHolder: 'Filtro!',
            moveSelectedLabel: 'Mover solo seleccionado',
            moveAllLabel: 'Mover Todos!',
            removeSelectedLabel: 'Remove selected only',
            removeAllLabel: 'Eliminar Todos!',
            moveOnSelect: true,
            preserveSelection: 'Movido',
            selectedListLabel: 'Seleccionados',
            nonSelectedListLabel: 'No Seleccionados',
            postfix: '_helperz',
            selectMinHeight: 130,
            filter: true,
            filterNonSelected: '',
            filterSelected: '',
            infoAll: 'Ver Todos {0}!',
            infoFiltered: '<span class="label label-warning">Filtrados</span> {0} de {1}!',
            infoEmpty: 'Lista Vacia!',
            filterValues: true
        }
    };

    $scope.calendar = {
        opened: {start: false, end: false},
        format: 'MMMM/yyyy', minDate: '01-01-1950', maxDate: '01-01-2100',
        dateOptions: {startingDay: 1, showWeeks: false, datepickerMode: 'month', minMode: 'month'},

        /**
         * Abre el Datepicker en el input adecuado, según quien (which) lo llama.
         * @param $event
         * @param which
         */
        open: function ($event, which) {
            $event.preventDefault();
            $event.stopPropagation();

            angular.forEach($scope.calendar.opened, function (value, key) {
                $scope.calendar.opened[key] = false;
            });

            $scope.calendar.opened[which] = true;
        },

        /**
         * Evalúa las fechas que no podrán ser tomadas en cuanta.
         * @param date
         * @param mode
         * @returns {boolean}
         */
        disabled: function (date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        }
    };

    $scope.buttons = {
        relatorio: function () {
            if (esValido()) {
                var $state = $injector.get('$state', 'button.relatior');
                $state.go('admin.relatorio', prepare(), {reload: true});
            }
        },
        grafico: function () {
            if (esValido()) {
                var $state = $injector.get('$state', 'button.grafico');
                $state.go('admin.grafico', prepare(), {reload: true});
            }
        },
        pizza: function () {
            if (esValido()) {
                var $state = $injector.get('$state', 'button.pizza');
                $state.go('admin.pizza', prepare(), {reload: true});
            }
        }
    };

    function esValido() {
        var flag = true;
        if (!$scope.model.vendedores.length) {
            flag = false;
            $injector.get('flashMessages', 'esVAlido').show_error('Debe indicar un Vendedor!!');
        }
        return flag;
    }

    function prepare() {
        return {filtros: angular.toJson($scope.model)};
    }
}
])
;