var express = require('express');
var router = express.Router();

var Agence = require('../models/agence.js');

/* GET /todos listing. */
router.get('/vendedores', function (req, res) {
    Agence.getVendedores(function (error, data) {
        res.status(200).json(data);
        //res.json(200, data);
    });
});

/* POST /todos */
router.post('/relatorio', function (req, res) {
    Agence.getRelatorio(req.body, function (error, data) {
        res.status(200).json(data);
    });
});

/* POST /todos */
router.post('/grafico', function (req, res) {
    Agence.getGrafico(req.body, function (error, data) {
        res.status(200).json(data);
    });
});

/* POST /todos */
router.post('/pizza', function (req, res) {
    Agence.getPizza(req.body, function (error, data) {
        res.status(200).json(data);
    });
});

module.exports = router;
