var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var webpack = require('webpack-stream');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var named = require('vinyl-named');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var del = require('del');

var isProd = process.env.NODE_ENV === 'production';
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log(isProd);

var ROOT_PATH = __dirname;
var SRC_PATH = path.join(ROOT_PATH, 'src');
var BUILT_PATH = path.join(ROOT_PATH, 'built');

var webpackConfig = isProd
  ? require('./webpack.prod.config.js')
  : require('./webpack.dev.config.js');

console.log(webpackConfig);

gulp.task('clean', function() {
  del([BUILT_PATH]).then(function(paths) {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('script', function() {
  var entrys = getEntry();
  console.log(entrys);
  return gulp.src(entrys)
    .pipe(plumber())
    .pipe(named())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(BUILT_PATH))
    .pipe(connect.reload());
});

gulp.task('server', function(){
  connect.server({
    livereload: true,
    port: 9999
  });
});

gulp.task('default', ['script']);

gulp.task('watch', ['default', 'server'], function() {
  gulp.watch([path.join(SRC_PATH, '**/*')], ['script']);
});

function getEntry() {
    var tsPath = SRC_PATH;
    var dirs = fs.readdirSync(tsPath);
    var files = [];
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.tsx?$/);
        if (matchs) {
            files.push(path.resolve(tsPath, item));
        }
    });
    return files;
}
