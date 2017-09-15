const gulp = require('gulp');
const browserSync = require('browser-sync');
const pug = require('gulp-pug');

/*---------BrowserSync---------*/

gulp.task('server', function () {
    browserSync.init({
       server: {
           port: 9000,
           baseDir: "build"
       }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload);
});

/*---------Pug compile---------*/

gulp.task('templates:compile', function () {
   return gulp.src('views/*.pug')
       .pipe(pug({

       }))
});








