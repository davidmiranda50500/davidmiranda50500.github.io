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

paths.js = {
    buildPath: './',
    srcFiles: [
        './bower_components/ResponsiveSlides.js/responsiveslides.min.js',
        './bower_components/jquery-modal/jquery-modal.min.js'
    ],
    destFile: "dependency-scripts.js",
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

gulp.task('styles', ['sass-compile-and-merge'], function(){
    return del(['build/css', 'build/sass-compiled']);
});

gulp.task('watch', function(){
    gulp.watch('sass/**/*.scss', ['styles']);
});

gulp.task('clear', function(){
   gulp.start('clear-sass');
});

gulp.task('scripts', function(){
    return gulp.src(paths.js.srcFiles)
            .pipe(concat(paths.js.destFile))
            .pipe(gulp.dest(paths.js.buildPath))
            .pipe(notify({message: 'dependency scripts compiled o/'}));;
});

gulp.task('default', function() {
    gulp.start('styles');
    gulp.start('scripts');
});