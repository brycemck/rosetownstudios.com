const gulp        = require('gulp');
const sass        = require('gulp-sass');
const sassGlob    = require('gulp-sass-glob');
const sourcemaps  = require('gulp-sourcemaps');
const concat      = require('gulp-concat');
const ts          = require('gulp-typescript');
const exec        = require('gulp-exec');
const browserSync = require('browser-sync').create();

const tsProj = ts.createProject('config/tsconfig.json', {
  outFile: 'app.js'
});

gulp.task('build:templates', function() {
  return gulp.src('./_src')
    .pipe(exec('eleventy'));
});

gulp.task('watch:templates', function() {
  gulp.watch(['./_src/**/*.md', './_src/**/*.liquid'], gulp.parallel('build:templates'));
});

gulp.task('build:sass', function() {
  return gulp.src('./_src/_assets/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./_build/_assets/css'));
});

gulp.task('watch:sass', function() {
  gulp.watch('./_src/_assets/sass/**/*.scss', gulp.parallel('build:sass'));
});

gulp.task('lint:ts', function() {
  return gulp.src('./_src/_assets/ts/**/*.ts')
    .pipe(tslint({
        formatter: 'verbose'
    }))
    .pipe(tslint.report())
});

gulp.task('build:ts', function() {
  return gulp.src('./_src/_assets/ts/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsProj())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./_build/_assets/js'));
});

gulp.task('watch:ts', function() {
  gulp.watch('./_src/_assets/ts/**/*.ts', gulp.parallel('build:ts'));
});

gulp.task('concat:js', function() {
  return gulp.src([
    'node_modules/systemjs/dist/system.js',
    'node_modules/systemjs/dist/extras/named-register.js',
    'node_modules/es6-shim/es6-shim.js'
  ])
  .pipe(concat('lib.js'))
  .pipe(gulp.dest('_build/_assets/js'));
});

gulp.task('watch', gulp.parallel(
  'watch:sass',
  'watch:ts',
  'watch:templates'
));

gulp.task('build', gulp.parallel(
  'build:sass',
  'build:ts',
  'concat:js',
  'build:templates'
));

gulp.task('go', gulp.parallel(
  'build',
  'watch'
));