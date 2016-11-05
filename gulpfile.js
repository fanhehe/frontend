var del = require('del');
var gulp = require('gulp');

gulp.task('default', function () {
    console.log('------->','gulp assets', 'copy assets into paths');
    console.log('------->','gulp clean', 'clean ./build folder');
});

gulp.task('assets', ['components', 'favicon'], function () {
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

});
