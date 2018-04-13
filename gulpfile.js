const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const gulp = require('gulp');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const zip = require('gulp-zip');

gulp.task('copy', () => {
  gulp.src(['./src/*.html', './src/i18n/*.*', './src/config.xml'])
  .pipe(gulp.dest('./build'))
});

gulp.task('scripts', () => {
  gulp.src('./src/scripts/*.js')
    .pipe(gulp.dest('./build/scripts'))
});

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

gulp.task('create-wgt', () => {
  gulp.src('build/*')
    .pipe(zip('staffButtonWidget.wgt'))
    .pipe(gulp.dest('widget'))
});

gulp.task('build', (cb) => {
  runSequence(
    ['copy', 'scripts','styles'],
    'create-wgt',
    cb
  )
});

gulp.task('watch-dev', () => {
  gulp.watch('./src/**', ['styles', 'copy', 'scripts']);
})