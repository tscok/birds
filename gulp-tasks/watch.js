var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('less/**/*.less', ['less']);
    gulp.watch('./index.html', ['html']);
});

gulp.task('default', ['server','js','less','watch']);
