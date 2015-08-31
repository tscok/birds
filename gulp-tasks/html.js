var gulp = require('gulp');
var minifyHTML = require('gulp-minify-html');
var livereload = require('gulp-livereload');

// Output directory.
var __dirname = './dist/';

gulp.task('html', function() {
    return gulp.src('./index.html')
        .pipe(minifyHTML({
            comments: true,
            spare: true
        }))
        .pipe(gulp.dest(__dirname))
        .pipe(livereload());
});
