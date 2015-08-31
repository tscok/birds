var gulp = require('gulp');
var rename = require('gulp-rename');
var csvtojson = require('gulp-csvtojson');

// Output directory.
var __dirname = './dist/';

gulp.task('json', function() {
    return gulp.src('docs/ArtlistaFagel3.csv')
        .pipe(csvtojson())
        .pipe(rename({
            basename: 'artlista',
            suffix: '.min'
        }))
        .pipe(gulp.dest(__dirname));
});
