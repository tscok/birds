var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

var server = require('gulp-webserver');

// var watchify = require('watchify');
var browserify = require('browserify');
var riotify = require('riotify');
var source = require('vinyl-source-stream');


gulp.task('html', function() {
    return gulp.src('./index.html')
        .pipe(minifyHTML({
            comments: true,
            spare: true
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload());
});


gulp.task('less', function() {
    return gulp.src('less/main.less')
        .pipe(plumber())
        .pipe(less({ generateSourceMap: true }))
        .pipe(minifyCSS())
        .pipe(plumber.stop())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload());
});


gulp.task('js', function() {
    return browserify({ entries: ['./js/app.js'] })
        .transform(riotify)
        .bundle()
        .pipe(source('app.js'))
        // .pipe(streamify(uglify()))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload());
});


gulp.task('server', ['html'], function() {
    return gulp.src('dist')
        .pipe(server({
            port: 9090,
            open: true
        }));
});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('less/**/*.less', ['less']);
    gulp.watch(['js/**/*.js','js/**/*.tag'], ['js']);
    gulp.watch('./index.html', ['html']);
});


gulp.task('dev', ['server', 'js', 'less', 'watch']);
