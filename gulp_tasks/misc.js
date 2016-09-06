const path = require('path');

const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');

const conf = require('../conf/gulp.conf');

gulp.task('clean', clean);
gulp.task('other', other);
gulp.task('copy-fonts:dev', copyFontsDev);
gulp.task('copy-fonts:dist', copyFontsDist);

function clean() {
  return del([conf.paths.dist, conf.paths.tmp]);
}

function other() {
  const fileFilter = filter(file => file.stat.isFile());

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{html,css,js,scss}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.dist));
}

function copyFontsDev() {
  return copyFonts('src');
}

function copyFontsDist() {
  return copyFonts('dist');
}

function copyFonts(destination) {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest(`${conf.paths[destination]}/fonts`));
}