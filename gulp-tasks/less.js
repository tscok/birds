var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var minifyCSS = require('gulp-minify-css');
var livereload = require('gulp-livereload');

// Output directory.
var __dirname = './dist/';

gulp.task('less', function() {
    return gulp.src('less/main.less')
        .pipe(plumber())
        .pipe(less({ generateSourceMap: true }))
        .pipe(minifyCSS())
        .pipe(plumber.stop())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(__dirname))
        .pipe(livereload());
});
