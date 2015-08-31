var gulp = require('gulp');
var size = require('gulp-size');
var rename = require('gulp-rename');
var minifyJSON = require('gulp-jsonminify');

// Output directory.
var __dirname = './dist/';

gulp.task('json', function() {
    return gulp.src('docs/convertcsv.json')
        .pipe(minifyJSON())
        .pipe(rename({
            basename: 'artlista',
            suffix: '.min'
        }))
        .pipe(size())
        .pipe(gulp.dest(__dirname));
});
