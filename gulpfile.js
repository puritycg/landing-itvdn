const gulp = require('gulp');
const browserSync = require('browser-sync');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');


/*---------Pug compile---------*/

gulp.task('pug', function buildHTML() {
    return gulp.src('source/template/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'));
});

/*---------Sass compile---------*/

gulp.task('sass', function () {
    return gulp.src('source/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'))
});


/*---------Sprite Compile---------*/

gulp.task('sprite', function (cb) {
    const spriteData = gulp.src('source/images/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../images/sprite.png',
        cssName: 'sprite.scss'
    }));
    spriteData.img.pipe(gulp.dest('build/images/'));
    spriteData.css.pipe(gulp.dest('source/styles/global/'));
    cb();
});


/*---------Clear Build Directory---------*/

gulp.task('clear', function del(cb) {
    return rimraf('build', cb);
});


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

/*---------Copy Fonts---------*/
gulp.task('copy:fonts', function () {
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

/*---------Copy Images---------*/
gulp.task('copy:images', function () {
    return gulp.src('./source/images/**/*.*')
        .pipe(gulp.dest('build/images'));
});

/*---------Copy ALL---------*/
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));


/*---------Watchers---------*/

gulp.task('watch', function () {
    gulp.watch('source/template/**/*.pug', gulp.series('pug'));
    gulp.watch('source/styles/**/*.scss', gulp.series('sass'));
});

/*---------Default---------*/

gulp.task('default', gulp.series(
    'clear',
    gulp.parallel('pug', 'sass', 'sprite', 'copy'),
    gulp.parallel('watch', 'server')
));

