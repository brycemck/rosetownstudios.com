const gulp      = require('gulp');
const sass      = require('gulp-sass');
const sassGlob  = require('gulp-sass-glob');

gulp.task('build:sass', function() {
  return gulp.src('./_src/_assets/sass/style.scss')
    .pipe(sassGlob())
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(gulp.dest('./_src/_assets/css'))
});

gulp.task('watch:sass', function() {
  gulp.watch('./_src/_assets/sass/**/*.scss', gulp.parallel('build:sass'));
});

gulp.task('watch', gulp.parallel(
  'watch:sass'
));

gulp.task('build', gulp.parallel(
  'build:sass'
));

gulp.task('go', gulp.series(
  'build',
  'watch'
));