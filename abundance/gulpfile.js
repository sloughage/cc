const gulp = require('gulp')

const htmlmin = require('gulp-htmlmin')
gulp.task('html', () => {
  return gulp.src('src/index.html')
    .pipe(htmlmin({
      collapseBooleanAttributes: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true
    }))
    .pipe(gulp.dest('temp'))
})

const cssmin = require('gulp-clean-css')
gulp.task('css', () => {
  return gulp.src('src/style.css')
    .pipe(cssmin())
    .pipe(gulp.dest('temp'))
})

const browserify = require('browserify')
const transform = require('vinyl-transform')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const uglify = require('gulp-uglify')
gulp.task('js', () => {
  browserify('src/app.js')
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('temp'))
})

const fs = require('fs')
const inject = require('gulp-inject-string')
gulp.task('build', () => {
fs.readFile('temp/style.css', 'utf-8', (err, style) => {
    fs.readFile('temp/app.js', 'utf-8', (err, script) => {
      return gulp.src('temp/index.html')
        .pipe(inject.after('<style>', style))
        .pipe(inject.after('<script>', script))
        .pipe(gulp.dest('build'))
    })
  })
})

gulp.task('default', ['html', 'css', 'js', 'build'])
