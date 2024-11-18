const gulp = require('gulp'); 
const sass = require('gulp-sass')(require('sass'));
const sourceMaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imageMin = require('gulp-imagemin');

function comprimeImages(){
    return gulp.src('./src/images/*')
        .pipe(imageMin())
        .pipe(gulp.dest('./build/image'));
}

function comprimeJavaScript(){
    return gulp.src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts'));
};

function compilaSass(){
    return gulp.src('./src/styles/main.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourceMaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
};

function compilaHtml(){
    return gulp.src('./src/html/*.html')
        .pipe(gulp.dest('./build/html'));
};

exports.default = function() {
    gulp.watch('./src/html/*.html', { ignoreInitial: false }, gulp.series(compilaHtml));
    gulp.watch('./src/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./src/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJavaScript));
    gulp.watch('./src/images/*', { ignoreInitial: false }, gulp.series(comprimeImages));
}