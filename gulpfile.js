const autoprefixer = require('gulp-autoprefixer');
const cache = require('gulp-cache');
const clean = require('gulp-clean');
const cssnano = require('gulp-cssnano');
const gulp = require('gulp');
const gutil = require('gulp-util');
const imagemin = require('gulp-imagemin');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const zip = require('gulp-zip');

/* Clean BUILD folder */
gulp.task('clean', () => {
  return gulp.src('./build', {
      read: false
    })
    .pipe(clean());
});

/* Copy static (HTML, i18n, config.xml) files to BUILD folder */
gulp.task('copy', () => {
  gulp.src(['./src/*.html', './src/i18n/*.*', './src/config.xml'])
  .pipe(gulp.dest('./build'))
});

/* Process images */
gulp.task('images', function () {
  return gulp.src('./src/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('build/images'))
});

/* Process scripts - JavaScript files */
gulp.task('scripts', () => {
  gulp.src('./src/scripts/*.js')
    .pipe(gulp.dest('./build/scripts'))
});

/* Process styles - SASS(CSS) files */
gulp.task('styles', () => {
  gulp.src('./src/sass/*.scss')
    .pipe(sass({
      style: 'expanded'
    }))
      .on('error', gutil.log)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    /*.pipe(cssnano())*/
    .pipe(gulp.dest('./build/css'));
});

/* TODO: Create WGT archive for deploy in Orchestra */
gulp.task('create-wgt', () => {
  gulp.src('build/*')
    .pipe(zip('staffButtonWidget.wgt'))
    .pipe(gulp.dest('widget'))
});

/* Build widget code */
gulp.task('build', (cb) => {
  runSequence(
    'clean', ['copy', 'scripts', 'styles', 'images'],
    'create-wgt',
    cb
  )
});

/* Watch for changes during development */
gulp.task('watch-dev', () => {
  gulp.watch('./src/**', ['styles', 'copy', 'scripts']);
})