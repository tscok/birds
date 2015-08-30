var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');

var minifyify = require('minifyify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

var server = require('gulp-webserver');

var watchify = require('watchify');
var browserify = require('browserify');
var riotify = require('riotify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var gutil = require('gulp-util');
var size = require('gulp-size');
var assign = require('lodash.assign');

// Output directory.
var __dirname = './dist/';


// Fast browserify builds with watchify.
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md

// Browserify options.
var customOpts = {
    entries: ['./js/app.js'],
    debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// Transformations.
b.transform(riotify);
b.plugin('minifyify', { map: 'app.js.map', output: __dirname + 'app.js.map' });

// Tasks.
gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

// Bundler.
function bundle() {
    return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(size())
        .pipe(gulp.dest(__dirname))
        .pipe(livereload());
}


gulp.task('html', function() {
    return gulp.src('./index.html')
        .pipe(minifyHTML({
            comments: true,
            spare: true
        }))
        .pipe(gulp.dest(__dirname))
        .pipe(livereload());
});


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
    gulp.watch('./index.html', ['html']);
});


gulp.task('json', function() {
    // ...
});


gulp.task('default', ['server','js','less','watch']);
gulp.task('json', ['json']);
