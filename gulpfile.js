var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');

var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

var server = require('gulp-webserver');

var watchify = require('watchify');
var browserify = require('browserify');
var riotify = require('riotify');


gulp.task('html', function() {
    return gulp.src('./index.html')
        .pipe(minifyHTML({
            comments: true,
            spare: true
        }))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('less', function() {
    console.log('changes made in less folder');
    return gulp.src('less/main.less')
        .pipe(less({
            generateSourceMap: true
        }))
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});


gulp.task('js', function() {
    console.log('changes made in js folder');
    // return gulp.src('js/app.js')
    //     .pipe()
});


gulp.task('server', ['html'], function() {
    var opts = {
        port: 9090,
        open: false,
        livereload: {
            enable: true
        }
    };
    gulp.src('dist').pipe(server(opts));
});


gulp.task('watch', function() {
    // livereload.listen();
    gulp.watch('less/**/*.less', ['less']);
    gulp.watch(['js/**/*.js','js/**/*.tag'], ['js']);
    gulp.watch('./index.html', ['html']);

});


gulp.task('dev', ['server', 'js', 'less', 'watch']);
