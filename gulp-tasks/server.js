var gulp = require('gulp');
var server = require('gulp-webserver');

gulp.task('server', ['html'], function() {
    return gulp.src('dist')
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true
        }));
});
