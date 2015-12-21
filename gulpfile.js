/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    tsc = require("gulp-typescript"),
    del = require("del"),
    jas = require("gulp-jasmine"),
    watch = require('gulp-watch'),
    flatten = require('gulp-flatten'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    tsd = require('gulp-tsd');

var paths = {
    output: "./dist/",
    typeScript: './src/**/*.ts',
    tests: './tests/*.ts'
};
gulp.task('typeScript', function () {
    var out = gulp.src([paths.typeScript])
    .pipe(tsc({ declaration : true}));
    out.dts.pipe(gulp.dest(paths.output));
    out.js.pipe(gulp.dest(paths.output))
        .pipe(rename({ extname: ".min.js" }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.output));
});

gulp.task('declaration', function (callback) {
    tsd({
        command: 'reinstall',
        config: './tsd.json'
    }, callback);
})

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