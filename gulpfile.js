var gulp = require('gulp'),
	path = require('path'),
	//appPath = path.resolve(__dirname, 'client/app'),
	srcPath = path.resolve(__dirname, 'client/src'),
	//libPath = path.resolve(__dirname, 'client/lib'),
	assetsPath = path.resolve(__dirname, 'public/assets'),
	serverPath = path.resolve(__dirname, 'server'),
	config = require('./gulp.conf'),
	webpack = require('webpack-stream'),
	uglify = require('gulp-uglify'),
	uglifycss = require('gulp-uglifycss'),
	server = require('gulp-develop-server'),
	sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['css', 'webpack', 'uglify', 'watch', 'server', 'watch-server'], function () {
	console.log('[React Router Pagination]');
});

gulp.task('server', function () {
	server.listen({ path: 'app' });
});

gulp.task('css', function() {
	return gulp.src(path.resolve(srcPath, 'css/**/*.css'))
		.pipe(sourcemaps.init())
		.pipe(uglifycss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.resolve(assetsPath, 'css')));
});


gulp.task('webpack', function () {
	return gulp.src([])
		.pipe(webpack(config.webpack.run))
		.pipe(gulp.dest(path.resolve(assetsPath, 'js/app/')));
});

gulp.task('uglify', function () {
	return gulp.src(path.resolve(srcPath, '**/*.js!src/app.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.resolve(assetsPath, 'js/lib/')));
});

gulp.task('watch', function () {
	gulp
		.watch(config.jshint.all, ['webpack']);
	gulp
		.watch(path.resolve(serverPath, 'views/**/*.*'), server.restart)
});


gulp.task('watch-server', function () {
	gulp
		.watch(['app.js'], server.restart);
});
