var del = require('del');
var gulp = require('gulp');
var path = require('path');

gulp.task('default', function () {
    console.log('------->','gulp assets', 'copy assets into paths');
    console.log('------->','gulp clean', 'clean ./build folder');
});

gulp.task('assets', ['routes', 'components'], function () {
    console.log('------->', 'assets coping successfully');
});

gulp.task('favicon', function () {
    gulp.src('./favicon.ico').pipe(gulp.dest('./build'));
});

gulp.task('clean', function () {
    console.log('begin cleaning ', __dirname + '/build');
    return del(['build/**', '!build']);
});

gulp.task('components', function () {
    gulp.src(path.join(__dirname, './Static/src/components/**/*'))
            .pipe(gulp.dest(path.join(__dirname, './src/components')));
});

gulp.task('routes', function () {
    gulp.src(path.join(__dirname, './Static/src/routes/**/*'))
            .pipe(gulp.dest(path.join(__dirname, './src/routes')));
});

