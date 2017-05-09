var gulp = require('gulp');
var gls = require('gulp-live-server');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var webserver = require('gulp-webserver');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var pathmodify = require('pathmodify');
var watchify = require('watchify');
var plumber = require('gulp-plumber');

var BUILD_DIR = 'dist/'

gulp.task('serve', function() {
  var server = gls.new('server.js');
  server.start();
});

function compile(watch) {
  var bundler = browserify('app/index.js', {
    debug: true,
    extensions: ['.js', '.jsx', '.json']
  });

  function bundle() {
    return bundler
      .plugin(pathmodify, {
        mods: [function(rec) {
          if(rec.id[0] === '/' && !rec.id.startsWith(__dirname)) {
            return { id: path.join(__dirname, rec.id.substr(1)) }
          }

          return {};
        }]
      })
      .transform('babelify', { presets: ['es2015', 'react'] })
      .bundle()
      .pipe(plumber())
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      // .pipe(uglify().on('error', function(e) {
      //   console.log(e.toString());
      // }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(BUILD_DIR));
  }

  if(watch) {
    bundler = watchify(bundler)
      .on('update', bundle);
  }

  return bundle();
}

gulp.task('build:js', function() {
  return compile();
})

gulp.task('build:html', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest(BUILD_DIR));
})

gulp.task('build', ['build:html', 'build:js']);

gulp.task('webserver', ['build'], function() {
  return gulp.src(BUILD_DIR)
    .pipe(webserver({
      livereload: true
    }));
});

gulp.task('watch:js', function() {
  return compile(true);
});

gulp.task('watch:html', function() {
  return gulp.watch(['app/**/*.html'], ['build:html']);
})

gulp.task('watch', ['webserver', 'watch:html', 'watch:js']);

gulp.task('run', ['build', 'webserver']);
