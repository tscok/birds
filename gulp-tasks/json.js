var gulp = require('gulp');

var csvtojson = require('gulp-csvtojson');
var rename = require('gulp-rename');
// var minifyJSON = require('gulp-jsonminify');

// Output directory.
var __dirname = './dist/';

gulp.task('json', function() {
    return gulp.src('docs/ArtlistaFagel3.csv')
        .pipe(csvtojson())
        // .pipe(minifyJSON())
        .pipe(rename({
            basename: 'artlista',
            suffix: '.min'
        }))
        .pipe(gulp.dest(__dirname));
});
