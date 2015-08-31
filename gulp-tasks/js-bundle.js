var gulp = require('gulp');

var assign = require('lodash.assign');
var watchify = require('watchify');
var browserify = require('browserify');
var riotify = require('riotify');

var size = require('gulp-size');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');

var livereload = require('gulp-livereload');

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
        .pipe(rename({ suffix: '.min' }))
        .pipe(size())
        .pipe(gulp.dest(__dirname))
        .pipe(livereload());
}
