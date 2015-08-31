var gulp = require('gulp');

var csvtojson = require('gulp-csvtojson');
var convert = require('gulp-convert');

var minifyJSON = require('gulp-jsonminify');

// Output directory.
var __dirname = './dist/';

gulp.task('json', function() {
    return gulp.src('docs/ArtlistaFagel3.csv')
        .pipe(csvtojson())
        .pipe(gulp.dest(__dirname));
});
