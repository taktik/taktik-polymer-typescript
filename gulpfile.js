/**
 * Created by hubert on 6/06/17.
 */
const gulp = require ('gulp');
const replace = require('gulp-replace');
const clean = require('gulp-clean');

/**
 * build task
 * Generate a bower ready package. in dist directory
 **/
gulp.task('build', function() {
    return gulp.src(['./src/**/*'] )
        .pipe(replace(/bower_components/g, '..'))
        .pipe(gulp.dest('./dist'));
});

/**
 * Clean build directory
 */
gulp.task('clean', function() {
    return gulp.src(['./dist'] )
        .pipe(clean());
});
