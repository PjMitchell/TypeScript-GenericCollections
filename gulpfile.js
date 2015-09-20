/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    tsc = require("gulp-typescript"),
    del = require("del"),
    jas = require("gulp-jasmine"),
    watch = require('gulp-watch'),
    flatten = require('gulp-flatten');
var paths = {
    lib: "./lib/",
    typeScript: './src/**/*.ts',
    tests: './tests/*.ts'
};
gulp.task('typeScript', function () {
    gulp.src([paths.typeScript])
    .pipe(tsc().js)
    .pipe(gulp.dest(paths.lib));
});

gulp.task('test', function () {
    gulp.src([paths.tests])
    .pipe(tsc({out: "test.js"}).js)
    .pipe(flatten())
    .pipe(gulp.dest('./tests/output/script/'))
    .pipe(jas());
});

gulp.task('clean', function () {
    del([paths.css, paths.lib])
});
gulp.task('watch', function () {
    gulp.watch(paths.typeScript, ['typeScript', 'test'])
    gulp.watch(paths.tests, ['test'])
    gulp.watch(paths.allSass, ['sass'])
});