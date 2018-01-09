const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile SASS and Inject into browser
gulp.task('sass', function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Move JS files to src/JS
gulp.task('js', function(){
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js', 
        'node_modules/jquery/dist/jquery.min.js', 
        'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

// Watch SASS and serve
gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server: "./src"
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*html").on('change', browserSync.reload);
});

// Move Fonts folder to src
gulp.task('fonts', function(){
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest("src/fonts"));
});

// Move Font Awesome CSS to src/css
gulp.task('fa', function(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest("src/css"));
});

// Gulp default task
gulp.task('default', ['js', 'serve', 'fonts', 'fa']);