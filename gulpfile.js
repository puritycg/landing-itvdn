const gulp = require('gulp');
const browserSync = require('browser-sync');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');


/*---------Pug compile---------*/

gulp.task('templates:compile', function buildHTML() {
    return gulp.src('source/template/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'));
});

/*---------Sass compile---------*/

gulp.task('sass', function () {
    return gulp.src('source/styles/main.scss')
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



