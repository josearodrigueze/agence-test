/**
 * Created by jrodriguez on 15/09/15.
 */
var moment = require('moment');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'agence',
    port: '/var/run/mysqld/mysqld.sock'
});
connection.connect();

var Agence = {};

//obtenemos todos los Vendedores
Agence.getVendedores = function (callback) {
    if (connection) {
        var query = 'SELECT `cao_usuario`.`co_usuario`, `cao_usuario`.`no_usuario` ' +
            'FROM `cao_usuario` ' +
            'INNER JOIN `permissao_sistema` as `perm` on `cao_usuario`.`co_usuario` = `perm`.`co_usuario` ' +
            'WHERE `co_sistema` = 1 and `in_ativo` = \'S\' and `co_tipo_usuario` in (0, 1, 2);';
        connection.query(query, function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
};

Agence.getRelatorio = function (filters, callback) {
    if (connection) {

        var format = 'YYYY-MM-DD',
            desde = moment('2000-01-01').format(format),
            hasta = moment().format(format),
            vendedores = [];

        if (filters.desde.length > 0) {
            desde = moment.utc(filters.desde).format(format);
        }
        if (filters.hasta.length > 0) {
            hasta = moment.utc(filters.hasta).add(1,'Month').subtract(1, 'day').format(format);
        }

        for (var i = filters.vendedores.length - 1; 0 <= i; i--) {
            vendedores.push(filters.vendedores[i].co_usuario);
        }
        vendedores = vendedores.join('\',\'');

        var query = 'SELECT DISTINCT ' +
            'MONTHNAME(str_to_date(MONTH(`fac`.`data_emissao`), \'%m\'))                                AS mes,' +
            'MONTH(`fac`.`data_emissao`)                                                                AS mes_numero,'+
            'YEAR(`fac`.`data_emissao`)                                                                 AS anio,' +
            'ROUND(SUM(`fac`.`valor` * (`fac`.`total_imp_inc` / 100)), 2)                               AS liquida,' +
            'ROUND(SUM(`fac`.`valor` * (`fac`.`total_imp_inc` / 100) * (`fac`.`comissao_cn` / 100)), 2) AS comision,' +
            '`sal`.`brut_salario`                                                                       AS `costo`,' +
            '`usu`.`no_usuario`' +
            'FROM `cao_fatura` AS `fac` INNER JOIN `cao_cliente` AS `cli` ON `fac`.`co_cliente` = `cli`.`co_cliente`' +
            'INNER JOIN `cao_sistema` AS `sis` ON `fac`.`co_sistema` = `sis`.`co_sistema`' +
            'INNER JOIN `cao_os` AS `os` ON `fac`.`co_os` = `os`.`co_os`' +
            'INNER JOIN `cao_usuario` AS `usu` ON `usu`.`co_usuario` = `os`.`co_usuario`' +
            'INNER JOIN `cao_salario` AS `sal` ON `sal`.`co_usuario` = `usu`.`co_usuario`' +
            'WHERE `fac`.`data_emissao` BETWEEN \'' + desde + '\' AND \'' + hasta +
            '\' AND `usu`.`co_usuario` IN (\'' + vendedores + '\')' +
            'GROUP BY `anio`, `mes`, `mes_numero`, `sal`.`brut_salario`, `usu`.`no_usuario`' +
            'ORDER BY `usu`.`co_usuario`, `anio` ASC, `mes_numero` ASC';
        connection.query(query, function (error, rows) {
            if (error) {
                throw error;
            }
            callback(null, rows);
        });
    }
};

Agence.getGrafico = function (filters, callback) {
    if (connection) {

        var format = 'YYYY-MM-DD',
            desde = moment('2000-01-01').format(format),
            hasta = moment().format(format),
            vendedores = [];

        if (filters.desde.length > 0) {
            desde = moment.utc(filters.desde).format(format);
        }
        if (filters.hasta.length > 0) {
            hasta = moment.utc(filters.hasta).add(1,'Month').subtract(1, 'day').format(format);
        }

        for (var i = filters.vendedores.length - 1; 0 <= i; i--) {
            vendedores.push(filters.vendedores[i].co_usuario);
        }
        vendedores = vendedores.join('\',\'');

        var query = 'SELECT DISTINCT ' +
            'CONCAT_WS(\'-\', MONTH(`fac`.`data_emissao`), YEAR(`fac`.`data_emissao`)) AS fecha,' +
            'ROUND(SUM(`fac`.`valor` * (`fac`.`total_imp_inc` / 100)), 2) AS liquida,' +
            '`sal`.`brut_salario`                                         AS `costo`,' +
            '`usu`.`no_usuario`, `usu`.`co_usuario`' +
            'FROM `cao_fatura` AS `fac` INNER JOIN `cao_cliente` AS `cli` ON `fac`.`co_cliente` = `cli`.`co_cliente`' +
            'INNER JOIN `cao_sistema` AS `sis` ON `fac`.`co_sistema` = `sis`.`co_sistema`' +
            'INNER JOIN `cao_os` AS `os` ON `fac`.`co_os` = `os`.`co_os`' +
            'INNER JOIN `cao_usuario` AS `usu` ON `usu`.`co_usuario` = `os`.`co_usuario`' +
            'INNER JOIN `cao_salario` AS `sal` ON `sal`.`co_usuario` = `usu`.`co_usuario`' +
            'WHERE `fac`.`data_emissao` BETWEEN \'' + desde + '\' AND \'' + hasta +
            '\' AND `usu`.`co_usuario` IN (\'' + vendedores + '\')' +
            'GROUP BY `fecha`, `sal`.`brut_salario`, `usu`.`no_usuario`' +
            'ORDER BY `fecha` ASC, `usu`.`co_usuario`';
        connection.query(query, function (error, rows) {
            if (error) {
                throw error;
            }
            callback(null, rows);
        });
    }
};

Agence.getPizza = function (filters, callback) {
    if (connection) {

        var format = 'YYYY-MM-DD',
            desde = moment('2000-01-01').format(format),
            hasta = moment().format(format),
            vendedores = [];

        if (filters.desde.length > 0) {
            desde = moment.utc(filters.desde).format(format);
        }
        if (filters.hasta.length > 0) {
            hasta = moment.utc(filters.hasta).add(1,'Month').subtract(1, 'day').format(format);
        }

        for (var i = filters.vendedores.length - 1; 0 <= i; i--) {
            vendedores.push(filters.vendedores[i].co_usuario);
        }
        vendedores = vendedores.join('\',\'');

        var query = 'SELECT DISTINCT ROUND(SUM(`fac`.`valor` * (`fac`.`total_imp_inc` / 100)), 2) AS liquida, ' +
            '`usu`.`no_usuario` ' +
            'FROM `cao_fatura` AS `fac` ' +
                'INNER JOIN `cao_cliente` AS `cli` ON `fac`.`co_cliente` = `cli`.`co_cliente` ' +
                'INNER JOIN `cao_sistema` AS `sis` ON `fac`.`co_sistema` = `sis`.`co_sistema` ' +
                'INNER JOIN `cao_os` AS `os` ON `fac`.`co_os` = `os`.`co_os` ' +
                'INNER JOIN `cao_usuario` AS `usu` ON `usu`.`co_usuario` = `os`.`co_usuario` ' +
                'INNER JOIN `cao_salario` AS `sal` ON `sal`.`co_usuario` = `usu`.`co_usuario` ' +
            'WHERE `fac`.`data_emissao` BETWEEN \'' + desde + '\' AND \'' + hasta +
            '\' AND `usu`.`co_usuario` IN (\'' + vendedores + '\')' +
            'GROUP BY `usu`.`no_usuario` ' +
            'ORDER BY `usu`.`no_usuario` ASC';
        connection.query(query, function (error, rows) {
            if (error) {
                throw error;
            }
            callback(null, rows);
        });
    }
};

module.exports = Agence;


/*
Array
(
    [0] => Carbon\Carbon Object
(
    [date] => 2007-01-01 23:00:57.000000
    [timezone_type] => 3
    [timezone] => UTC
)

[1] => Carbon\Carbon Object
(
    [date] => 2007-06-30 23:00:57.000000
    [timezone_type] => 3
    [timezone] => UTC
)

[2] => anapaula.chiodaro
    [3] => carlos.arruda
)
    */