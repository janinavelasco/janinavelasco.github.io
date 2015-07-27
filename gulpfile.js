'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var minimist = require('minimist'); // used for the default args (knownOptions)
var plugins = require('gulp-load-plugins')();
  plugins.fileinclude = require('gulp-file-include');


// defaults for args you can pass to tasks
var knownOptions = {
  //for telling us whether or not to make sourcemaps for css or uglify for js
  string: 'compress',
  default: {compress: 'on'}
}

var options = minimist(process.argv.slice(2), knownOptions);

// Build the site content and output it into ./index.html and public/
gulp.task('default', ['markup', 'sass', 'javascript'], function(){
});

// Run default, then startup a browserSync server and watch for changes.
gulp.task('serve', ['default'], function(){
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  //watch the markup
  gulp.watch(['src/index.html', 'src/markup/**/*.html'], ['markup']);
  //watch the sass
  gulp.watch(['src/sass/**/*.scss'], ['sass']);
  //watch the js
  gulp.watch(['src/js/**/*.js'], ['javascript']);

});

// Parse src/index.html and include html / images, output to ./index.html
gulp.task('markup', function(){
  gulp.src(['src/index.html'])
    .pipe(plugins.fileinclude({
      prefix: '@@'
    })) 
    .pipe(gulp.dest('.'))
    .pipe(browserSync.stream());
});

// Parse src/sass/main.scss, run sass and output to public/main.css
gulp.task('sass', function(){
  gulp.src(['src/sass/main.scss'])
    .pipe(plugins.if(options.compress === 'off', plugins.sourcemaps.init()))
    .pipe(plugins.sass({
      outputStyle: 'compressed'
    }).on('error', plugins.sass.logError))
    .pipe(plugins.if(options.compress === 'off', plugins.sourcemaps.write()))
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.stream());      
});

// Parse src/javascript/*, uglify and concat, then output to public/main.js
gulp.task('javascript', function(){
  gulp.src(['src/js/**/*.js'])
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.if(options.compress === 'on', plugins.uglify()))
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.stream());
});
