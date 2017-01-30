var gulp = require('gulp')
var minifyCss = require('gulp-cssmin')
var postcss = require('gulp-postcss')
var concat = require('gulp-concat')

const POSTCSS_PROCESSORS = [ require('postcss-cssnext')() ]

gulp.task('styles', function() {
    return gulp.src('styles/*.css')
        .pipe(concat('style.css'))
        .pipe(postcss(POSTCSS_PROCESSORS))
        .pipe(minifyCss())
        .pipe(gulp.dest('.'))
})

gulp.task('watch', function() {
    gulp.watch('styles/*.css', [ 'styles' ])
})

gulp.task('default', ['styles', 'watch'])
