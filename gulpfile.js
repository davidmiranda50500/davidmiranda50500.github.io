'use strict';
var gulp = require('gulp'),
    notify = require('gulp-notify'),
    cssnano = require('gulp-cssnano'),
    merge = require('merge-stream'),
    gutil = require('gulp-util'),
    del = require('del'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');
const ENV_PRODUCTION = 'production';

var paths = {
    buildPath: './sass/'
};
paths.styles = {
    buildPath: paths.buildPath,
    srcFiles: './sass/**/*.scss',
    destFile: "style.css",
    // vendorCss: "./node_modules/normalize.css/normalize.css",
    destTempDir: paths.buildPath+"sass-compiled-temp"
};

function isProduction(){ return gutil.env.type === ENV_PRODUCTION; }

gulp.task('sass-compile-and-merge', function(){
    var streamCompileSass = gulp.src(paths.styles.srcFiles)
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest(paths.styles.destTempDir));
    var streamConcatCss = gulp.src(paths.styles.destTempDir);
    return merge(streamCompileSass, streamConcatCss)
        .pipe(concat(paths.styles.destFile))
        .pipe(cssnano())
        .pipe(gulp.dest(paths.styles.buildPath))
        .pipe(notify({message: 'sass compiled o/'}));
});

gulp.task('styles', ['clear-css', 'sass-compile-and-merge'], function(){
    return del([paths.styles.destTempDir]);
});

gulp.task('watch', function(){
    gulp.watch('sass/**/*.scss', ['styles']);
});

gulp.task('clear-css', function() {
    return del(['build/css', 'build/sass-compiled']);
});

gulp.task('clear', function(){
   gulp.start('clear-sass');
});

gulp.task('default', function() {
    gulp.start('styles');
});