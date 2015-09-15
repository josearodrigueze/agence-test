/**
 * Dependencias
 * Created by jrodriguez on 18/08/15.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

/*
 * Configuración de la tarea 'demo'
 */
gulp.task('min-js', function () {
    gulp.src([
        "public/js/index.js",
        "public/js/config.js",
        "public/js/app-utility.js",
        "public/js/routes.js",
        "public/modules/**/*.js"
    ]).pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/'));
});

gulp.task('vendors', function () {
    gulp.src([
        "public/vendors/jquery/dist/jquery.min.js",
        "public/vendors/bootstrap/dist/js/bootstrap.min.js",
        "public/vendors/angular/angular.min.js",
        "public/vendors/angular-ui-router/release/angular-ui-router.min.js",
        "public/vendors/angular-bootstrap/ui-bootstrap-tpls.min.js",
        "public/vendors/angular-resource/angular-resource.min.js",
        "public/vendors/numeral/min/numeral.min.js",
        "public/vendors/numeral/min/languages/es.min.js",
        "public/vendors/angular-numeraljs/dist/angular-numeraljs.min.js",
        "public/vendors/Chart.js/Chart.min.js",
        "public/vendors/angular-chart.js/dist/angular-chart.min.js",
        "public/vendors/bootstrap-duallistbox/dist/jquery.bootstrap-duallistbox.min.js",
        "public/vendors/angular-bootstrap-duallistbox/dist/angular-bootstrap-duallistbox.min.js"
    ]).pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/'));
});

