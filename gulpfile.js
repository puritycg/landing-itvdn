const gulp = require('gulp');
const browserSync = require('browser-sync');
const pug = require('gulp-pug');

/*---------Pug compile---------*/

gulp.task('templates:compile', function buildHTML() {
   return gulp.src('source/template/*.pug')
       .pipe(pug({
           pretty: true
       }))
       .pipe(gulp.dest('build'));
});

/*---------Sass compile---------*/



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



