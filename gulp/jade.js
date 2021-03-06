var gulp = require('gulp'),
	jade = require('gulp-jade'),
	newer = require('gulp-newer'),
	log = require('./errorHandler'),
	duration = require('gulp-duration'),
	colors = require('colors'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	configs = require('./configs'),
	isProduction = configs.isProduction,
	paths = configs.paths,
	notify = require('gulp-notify'),
	htmlvalidator = require('gulp-w3cjs'),
	plumber = require('gulp-plumber'),
	gutil = require('gulp-util'),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	gulpif = require('gulp-if'),
	include = require('gulp-file-include');

gulp.task('template', function() {
	return gulp.src(paths.srcPaths.jade)
		.pipe(plumber({errorHandler: log}))
		.pipe(include())
		.pipe(gulp.dest(paths.destPaths.html))
		.pipe(reload({stream: true}));
});


gulp.task('buildUseref', function() {

	var assets = useref.assets();

	return gulp.src(paths.srcPaths.html)
		.pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', cssmin()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest(paths.destPaths.html));

});