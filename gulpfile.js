var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require("gulp-ruby-sass");
var sourcemaps = require('gulp-sourcemaps');
var postcss    = require('gulp-postcss');

gulp.task('serve', ['compile-sass'], function() {

    browserSync.init({
        port: 8081,
        ui: {
            port: 8082
        }
    });

    gulp.watch("sass/**/*.scss", ['compile-sass']);
    //gulp.watch("wp-content/themes/turini/**/*.php").on('change', browserSync.reload);
});

gulp.task('sass', ['compile-sass'], function() {

    gulp.watch("sass/**/*.scss", ['compile-sass']);

});

/**
 * Compile with gulp-ruby-sass + source maps
 */
gulp.task('compile-sass', function () {

    return sass('sass/style.scss', {sourcemap: true})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        // for inline sourcemaps
        .pipe(sourcemaps.write())
        // for file sourcemaps
        .pipe(sourcemaps.write('./', {
            includeContent: false,
            sourceRoot: 'sass'
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream({match: '**/*.css'}));

});


gulp.task('default', ['serve']);
